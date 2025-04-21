import { IControl } from "maplibre-gl";
import { useEffect, createRef, useRef, RefObject, useState } from "react";
import { useControl, useMap } from "react-map-gl/maplibre";
import { useAppDispatch, useAppSelector, useUnmount } from "../../app/hooks";
import ShipTooltip from "./tooltips/ShipTooltip";
import AircraftTooltip from "./tooltips/AircraftTooltip";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Actor } from "../../interfaces/actor";
import CloseIcon from "@mui/icons-material/Close";
import { toggleTrack } from "../../features/gossip/gossipSlice";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import {
  clearTrackedTooltipCoordinates,
  setTrackedTooltipCoordinates,
} from "../../features/map/tooltipSlice";
import { useMeasure } from "@uidotdev/usehooks";

class TrackedTooltip implements IControl {
  private _container: HTMLElement | undefined;

  attach(content: HTMLElement) {
    if (this._container) {
      this._container.appendChild(content);
    }
  }

  onAdd() {
    this._container = document.createElement("div");
    return this._container;
  }

  onRemove() {
    this._container?.parentNode?.removeChild(this._container);
  }
}

function DraggableTooltip(props: { actor: Actor }) {
  const offsetX = 20;
  const offsetY = -50;
  const actor = props.actor;

  const map = useMap();
  const dispatch = useAppDispatch();
  const dragRef = useRef<HTMLDivElement>(null);
  const [measureRef, { width, height }] = useMeasure();

  const [zindex, setZindex] = useState(0);

  const [visible, setVisible] = useState(true);
  const { screenshotMode } = useAppSelector((state) => state.flags);
  const { actors } = useAppSelector((state) => state.gossip);
  const { viewState } = useAppSelector((state) => state.map);

  const rootPosition = map.default!.project([actor.pos.lon, actor.pos.lat]);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startDragOffset, setStartDragOffset] = useState({ x: 0, y: 0 });

  const plugins = Object.keys(actors);

  let plugin: string;
  for (let i = 0; i < plugins.length; i++) {
    plugin = plugins[i];
    if (actors[plugins[i]].find((a) => a.id == actor.id)) break;
  }

  function onStartHandler(_e: DraggableEvent, data: DraggableData) {
    const today = dayjs().startOf("day").unix();
    setZindex(dayjs().unix() - today);
    setStartDragOffset(data);
    clearTooltipLine();
  }

  function onStopHandler(_e: DraggableEvent, data: DraggableData) {
    if (visible)
      setOffset({
        x: data.x - startDragOffset.x + offset.x,
        y: data.y - startDragOffset.y + offset.y,
      });
  }

  function updateTooltipLine() {
    if (!visible) return;
    const { lat, lng } = map.default!.unproject([
      rootPosition.x + offset.x + offsetX + (width ?? 100) / 2,
      rootPosition.y + offset.y + offsetY + (height ?? 100) / 2,
    ]);
    dispatch(
      setTrackedTooltipCoordinates({
        id: actor.id,
        actorCoordinates: {
          lon: actor.pos.lon,
          lat: actor.pos.lat,
          alt: actor.pos.alt ?? 0,
        },
        tooltipCoordinates: {
          lat: lat,
          lon: lng,
        },
      })
    );
  }

  function clearTooltipLine() {
    dispatch(clearTrackedTooltipCoordinates(actor.id));
  }

  useEffect(() => {
    updateTooltipLine();
  }, [offset, width, height, viewState, actor.pos]);

  useUnmount(() => {
    clearTooltipLine();
  });

  return (
    <div className="absolute top-0 left-0" style={{ zIndex: zindex }}>
      <Draggable
        nodeRef={dragRef as RefObject<HTMLElement>}
        handle=".handle"
        position={{
          x: visible ? rootPosition.x + offset.x : 20,
          y: visible ? rootPosition.y + offset.y : 55,
        }}
        positionOffset={{ x: offsetX, y: offsetY }}
        onStop={onStopHandler}
        onStart={onStartHandler}
      >
        <div className="bg-gray-200 m-2 mt-6 w-40 shadow-xl" ref={dragRef}>
          <div
            className="handle bg-gray-500 cursor-grab select-none h-4 absolute w-full -top-4 pointer-events-auto"
            style={{ display: screenshotMode ? "none" : "block" }}
          >
            <Stack direction="row" justifyContent="right">
              <div
                className="left flex-auto pl-1 relative -top-0.5"
                style={{
                  color: "white",
                  fontSize: "10px",
                  display: visible ? "none" : "block",
                }}
              >
                {actor.name}
              </div>
              <button
                className="cursor-pointer flex"
                onClick={() => {
                  if (visible) clearTooltipLine();
                  setVisible(!visible);
                }}
              >
                <VisibilityOffIcon
                  sx={{
                    width: "14px",
                    height: "14px",
                    position: "relative",
                    top: "1px",
                    fill: "white",
                  }}
                />
              </button>

              <button
                className="cursor-pointer flex"
                onClick={() =>
                  dispatch(
                    toggleTrack({
                      plugin: plugin,
                      actor: actor,
                    })
                  )
                }
              >
                <CloseIcon
                  sx={{
                    width: "14px",
                    height: "14px",
                    position: "relative",
                    top: "1px",
                    fill: "white",
                  }}
                />
              </button>
            </Stack>
          </div>

          <div
            className="p-2 cursor-default"
            style={{ display: visible ? "block" : "none" }}
            ref={measureRef}
          >
            {actor.type == "ship" && <ShipTooltip ship={actor} />}
            {actor.type == "aircraft" && <AircraftTooltip aircraft={actor} />}
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default function TrackedTooltipControl() {
  const control = useControl(() => new TrackedTooltip(), {
    position: "top-left",
  });
  const ref = createRef<HTMLDivElement>();

  const { tracked, actors } = useAppSelector((state) => state.gossip);

  useEffect(() => {
    if (ref.current) control.attach(ref.current);
  }, [ref, control]);

  const allActors = Object.values(actors).flat();
  const allTracked = Object.values(tracked).flat();

  const renderTooltip = (id: string) => {
    const actor = allActors.find((a) => a.id === id);
    if (!actor) return false;
    return <DraggableTooltip actor={actor} key={id} />;
  };

  return (
    <div ref={ref} className="absolute top-0 left-0">
      {allTracked.map(renderTooltip)}
    </div>
  );
}
