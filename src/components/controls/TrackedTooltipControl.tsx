import { IControl } from "maplibre-gl";
import { useEffect, createRef, useRef, RefObject, useState } from "react";
import { useControl } from "react-map-gl/maplibre";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ShipTooltip from "./tooltips/ShipTooltip";
import AircraftTooltip from "./tooltips/AircraftTooltip";
import Draggable from "react-draggable";
import { Actor } from "../../interfaces/actor";
import CloseIcon from "@mui/icons-material/Close";
import { toggleTrack } from "../../features/gossip/gossipSlice";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Stack } from "@mui/material";

class TrackedTooltip implements IControl {
  private _container: HTMLElement | undefined;

  attach(content: HTMLElement) {
    if (this._container) {
      this._container.appendChild(content);
    }
  }

  onAdd() {
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl p-1";
    return this._container;
  }

  onRemove() {
    this._container?.parentNode?.removeChild(this._container);
  }
}

function DraggableTooltip(props: { actor: Actor }) {
  const [visible, setVisible] = useState(true);
  const { screenshotMode } = useAppSelector((state) => state.flags);
  const { actors } = useAppSelector((state) => state.gossip);
  const plugins = Object.keys(actors);
  const actor = props.actor;

  let plugin: string;
  for (let i = 0; i < plugins.length; i++) {
    plugin = plugins[i];
    if (actors[plugins[i]].find((a) => a.id == actor.id)) break;
  }

  const dispatch = useAppDispatch();
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={dragRef as RefObject<HTMLElement>} handle=".handle">
      <div className="bg-gray-200 m-2 mt-6 w-50" ref={dragRef}>
        <div
          className="handle bg-gray-500 cursor-grab select-none h-4 absolute w-full -top-4"
          style={{ display: screenshotMode ? "none" : "block" }}
        >
          <Stack
            direction="row"
            justifyContent="right"
          >
            <button
              className="cursor-pointer flex"
              onClick={() => setVisible(!visible)}
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

        <div className="p-2 cursor-default" style={{display: visible ? "block" : "none"}}>
          {actor.type == "ship" && <ShipTooltip ship={actor} />}
          {actor.type == "aircraft" && <AircraftTooltip aircraft={actor} />}
        </div>
      </div>
    </Draggable>
  );
}

export default function TrackedTooltipControl() {
  const control = useControl(() => new TrackedTooltip());
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

  return <div ref={ref}>{allTracked.map(renderTooltip)}</div>;
}
