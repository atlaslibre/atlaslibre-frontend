import { length as turfDistance } from "@turf/turf";
import { Feature, FeatureCollection, LineString, Point } from "geojson";
import { IControl, Map, MapMouseEvent, Subscription } from "maplibre-gl";
import { useEffect, useState } from "react";
import { Source, useControl } from "react-map-gl/maplibre";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UnitSystem } from "../../features/map/mapSlice";
import { clearTooltip, setTooltip } from "../../features/map/tooltipSlice";
import convert, { BestKind } from "convert";

class MeasureControlImpl implements IControl {
  private _map?: Map;
  private _container?: HTMLDivElement;
  private _button;
  private _active: boolean;
  private _fc: FeatureCollection;
  private _setter;
  private _onClickSubscription?: Subscription;
  private _unitSystem: string;
  private _setActive: (active: boolean) => void;

  constructor(
    unitSystem: UnitSystem,
    setGeoJson: (
      featureCollection: FeatureCollection,
      distanceLabel: string | undefined
    ) => void,
    setActive: (active: boolean) => void
  ) {
    this._fc = { type: "FeatureCollection", features: [] };
    this._active = false;
    this._setActive = setActive;
    this._setter = setGeoJson;
    this._button = document.createElement("button");
    this._button.className = "maplibregl-ctrl-icon";
    this._button.title = "Measure";
    this._button.innerHTML = `
        <svg style="padding: 4px" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2z" />
        </svg>`;
    this._button.addEventListener("click", () => this._onToggle());
    this._unitSystem = unitSystem;
  }

  setUnitSystem(unitSystem: UnitSystem) {
    this._unitSystem = unitSystem;
    this._onMapClick();
  }

  onAdd(map: Map): HTMLElement {
    this._map = map;
    this._onClickSubscription = this._map.on("click", this._onMapClick);
    this._map.on("contextmenu", this._onClearMap);
    this._container = document.createElement("div");
    this._container.className =
      "maplibregl-ctrl maplibregl-ctrl-group maplibregl-measure";
    this._container.appendChild(this._button);
    return this._container;
  }

  onRemove(): void {
    if (this._container?.parentNode)
      this._container.parentNode.removeChild(this._container);
    if (this._onClickSubscription) this._onClickSubscription.unsubscribe();
    this._map = undefined;
  }

  showControls(): void {
    if (this._container !== undefined) this._container.style.display = "block";
  }

  hideControls(): void {
    if (this._container !== undefined) {
      this._container.style.display = "none";
      this.disable();
    }
  }

  disable(): void {
    if (this._active) this._onToggle(false);
  }

  enable(): void {
    if (!this._active) this._onToggle(false);
  }

  private _onToggle = (user: boolean = true) => {
    this._active = !this._active;

    if (user) this._setActive(this._active);

    if (this._active) this._button.classList.add("active");
    else this._button.classList.remove("active");
  };

  private _convertedLabel = (meters: number) => {
    const converter = convert(meters, "meters");

    if (this._unitSystem === "nautical") {
      const quantity = converter.to("nautical miles");
      return `${quantity.toFixed(1)} nm`;
    }

    const c = converter.to("best", this._unitSystem as BestKind);
    return `${c.quantity.toFixed(1)} ${c.unit}`;
  };

  private _onClearMap = () => {
    if (!this._active) return;

    const existingPoints = this._fc.features
      .filter((point) => point.geometry.type == "Point")
      .map((point) => point as Feature<Point>);

    if (existingPoints.length > 0) existingPoints.pop();

    this._fc = { type: "FeatureCollection", features: existingPoints };
    this._onMapClick();
  };

  private _onMapClick = (evt?: MapMouseEvent) => {
    if (!this._active) return;

    const existingPoints = this._fc.features
      .filter((point) => point.geometry.type == "Point")
      .map((point) => point as Feature<Point>);

    this._fc = { type: "FeatureCollection", features: existingPoints };

    if (evt) {
      const point: Feature<Point> = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [evt.lngLat.lng, evt.lngLat.lat],
        },
        properties: {},
      };

      this._fc.features.push(point);
    }

    let totalDistance = 0;
    let totalDistanceLabel: string | undefined;

    if (this._fc.features.length > 1) {
      const linestrings = [];

      for (let i = 1; i < this._fc.features.length; i++) {
        const a = existingPoints[i - 1].geometry.coordinates;
        const b = existingPoints[i].geometry.coordinates;

        const properties = {
          distance: 0,
          distance_label: "",
        };

        const linestring: Feature<LineString> = {
          type: "Feature",
          properties: properties,
          geometry: {
            type: "LineString",
            coordinates: [a, b],
          },
        };

        const distance = turfDistance(linestring, { units: "meters" });

        totalDistance += distance;
        properties.distance = distance;
        properties.distance_label = this._convertedLabel(distance);
        linestrings.push(linestring);
      }

      this._fc.features = [...this._fc.features, ...linestrings];
      totalDistanceLabel = this._convertedLabel(totalDistance);
    }

    this._setter(this._fc, totalDistanceLabel);
  };

  getDefaultPosition?: () => "top-left";
}

interface MeasureControlProps {
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function MeasureControl(props: MeasureControlProps) {
  const dispatch = useAppDispatch();
  const { unitSystem } = useAppSelector((state) => state.map);
  const { screenshotMode } = useAppSelector((state) => state.flags);

  const [geoJson, setGeoJson] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const setActive = (active: boolean) => {
    if (active) props.onActivate();
    else props.onDeactivate();
  };

  const impl = useControl(
    () =>
      new MeasureControlImpl(
        unitSystem,
        (fc, label) => {
          setGeoJson(fc);
          if (label)
            dispatch(setTooltip({ type: "distance", distance: label }));
          else dispatch(clearTooltip("distance"));
        },
        setActive
      ),
    {
      position: "top-left",
    }
  );

  useEffect(() => {
    impl.setUnitSystem(unitSystem);
  }, [unitSystem]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (screenshotMode) impl.hideControls();
    else impl.showControls();
  }, [screenshotMode]);

  useEffect(() => {
    if (!props.active) {
      impl.disable();
    } else {
      impl.enable();
    }
  }, [props.active]);

  return (
    <>
      <Source type="geojson" data={geoJson} id="measure-control-source" />
    </>
  );
}
