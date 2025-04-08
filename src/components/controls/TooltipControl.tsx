import { IControl, ControlPosition } from "maplibre-gl";
import { useEffect, createRef } from "react";
import { useControl } from "react-map-gl/maplibre";
import { useAppSelector } from "../../app/hooks";

import ReactCountryFlag from "react-country-flag";

class Tooltip implements IControl {
  private _container: HTMLElement | undefined;

  attach(content: HTMLElement) {
    if (this._container) {
      this._container.appendChild(content);
    }
  }

  onAdd() {
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl p-2";
    return this._container;
  }

  onRemove() {
    this._container?.parentNode?.removeChild(this._container);
  }
}

export default function TooltipControl(props: { position: ControlPosition }) {
  const control = useControl(() => new Tooltip(), props);
  const ref = createRef<HTMLDivElement>();
  const { actor, distance, lat, lon } = useAppSelector(
    (state) => state.tooltip
  );

  useEffect(() => {
    if (ref.current) control.attach(ref.current);
  }, [ref, control]);

  return (
      <div ref={ref} className="bg-gray-200 p-2 cursor-default">
          {actor && (
              <>
                  <p>
                      {actor.cc && <ReactCountryFlag countryCode={actor.cc} svg />}{" "}
                      {actor.type} {actor.class}
                  </p>
                  <p className="font-medium">{actor.name}</p>
              </>
          )}

          {distance && (
              <p>
                  Measured distance: <span className="font-medium">{distance}</span>
              </p>
          )}

          <p>
              {lat.toFixed(6)} {lon.toFixed(6)}
          </p>
      </div>
  );
}
