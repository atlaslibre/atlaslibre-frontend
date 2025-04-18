import { IControl, ControlPosition } from "maplibre-gl";
import { useEffect, createRef, useRef } from "react";
import { useControl } from "react-map-gl/maplibre";
import { useAppSelector } from "../../app/hooks";
import { uniqueFilter } from "../../util/array";
import { capitalize } from "@mui/material";
import { rainbow } from "../layers/actors/actorTrackLayer";

class TrackColorScale implements IControl {
  private _container: HTMLElement | undefined;

  attach(content: HTMLElement) {
    if (this._container) {
      this._container.appendChild(content);
    }
  }

  onAdd() {
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl";
    return this._container;
  }

  onRemove() {
    this._container?.parentNode?.removeChild(this._container);
  }
}

function TrackColorScaleByActor(props: { type: string }) {
  const { trackColorRange } = useAppSelector((state) => state.pluginSettings);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) return;

    for (let i = 0; i < 99; i++) {
      const width = context.canvas.width / 100;
      const color = rainbow[i];
      context.fillStyle = `rgb(${color[0]} ${color[1]} ${color[2]})`;
      context.fillRect(i * width, 0, (i + 1) * width, context.canvas.height);
    }
  }, []);

  return (
    <div className="mt-1 bg-gray-100 ">
      <div className="flex justify-between" style={{fontSize: "10px", padding: "0 3px 0 3px"}}>
        <div> {trackColorRange[props.type].min}</div>
        <div>
          {capitalize(props.type)} ({trackColorRange[props.type].type})
        </div>
        <div>{trackColorRange[props.type].max}</div>
      </div>
      <canvas ref={canvasRef} style={{ width: "150px", height: "5px" }} />
    </div>
  );
}

export default function TrackColorScaleControl(props: {
  position: ControlPosition;
}) {
  const control = useControl(() => new TrackColorScale(), props);
  const ref = createRef<HTMLDivElement>();

  const { tracked, actors } = useAppSelector((state) => state.gossip);

  const trackedIds = Object.values(tracked).flat();

  const trackedActors = Object.values(actors)
    .flat()
    .filter((a) => trackedIds.find((t) => t == a.id));

  const trackedActorTypes = trackedActors
    .map((a) => a.type)
    .filter(uniqueFilter);

  useEffect(() => {
    if (ref.current) control.attach(ref.current);
  }, [ref, control]);

  return (
    <div ref={ref} className="cursor-default">
      {trackedActorTypes.map((t) => (
        <TrackColorScaleByActor key={t} type={t} />
      ))}
    </div>
  );
}
