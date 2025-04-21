import { IControl, ControlPosition } from "maplibre-gl";
import { useEffect, createRef, useState } from "react";
import { useControl } from "react-map-gl/maplibre";
import { useAppSelector, useColorMode } from "../../app/hooks";
import dayjs, { Dayjs } from "dayjs";

class Time implements IControl {
  private _container: HTMLElement | undefined;

  attach(content: HTMLElement) {
    if (this._container) {
      this._container.appendChild(content);
    }
  }

  onAdd() {
    this._container = document.createElement("div");
    this._container.className = "pr-3";
    return this._container;
  }

  onRemove() {
    this._container?.parentNode?.removeChild(this._container);
  }
}

export default function TimeControl(props: { position: ControlPosition }) {
  const control = useControl(() => new Time(), props);
  const ref = createRef<HTMLDivElement>();
  const c = useColorMode();
  const { screenshotMode } = useAppSelector((state) => state.flags);

  const { fixedTime, timezoneType, mapTimezone } = useAppSelector(
    (state) => state.map
  );

  const [time, setTime] = useState<Dayjs>(dayjs.utc());

  setTimeout(() => {
    let time = fixedTime ? dayjs.utc(fixedTime) : dayjs.utc();
    if (timezoneType === "map") time = time.tz(mapTimezone);
    else if (timezoneType == "system") time = time.local();
    setTime(time);
  }, 100);
  
  useEffect(() => {
    if (ref.current) control.attach(ref.current);
  }, [ref, control]);

  return (
    <div
      ref={ref}
      className="opacity-35 text-right"
      style={{ color: c("black", "white") }}
    >
      {screenshotMode && (
        <>
          <div className="relative top-2" style={{ fontSize: "9px" }}>
            {time.format("Z")}
          </div>
          <div className="text-2xl">{time.format("HH:mm")}</div>
          <div className="relative -top-2" style={{ fontSize: "11px" }}>
            {time.format("YYYY-MM-DD")}
          </div>
        </>
      )}
    </div>
  );
}
