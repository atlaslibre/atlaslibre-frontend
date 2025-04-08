import { Geoman } from "@geoman-io/maplibre-geoman-free";
import { length as turfDistance, Units as TurfUnits } from "@turf/turf";
import { Feature, FeatureCollection, LineString, Point } from "geojson";
import { IControl, Map, MapMouseEvent, Subscription } from "maplibre-gl";
import { useEffect, useState } from "react";
import { Source, useControl } from "react-map-gl/maplibre";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UnitSystem } from "../../features/map/mapSlice";
import { clearTooltip, setTooltip } from "../../features/map/tooltipSlice";
import convert, { Unit as ConvertUnit, BestKind } from "convert";

class MeasureControlImpl implements IControl {
  private _map?: Map;
  private _container?: HTMLDivElement;
  private _button;
  private _active: boolean;
  private _fc: FeatureCollection;
  private _setter;
  private _onClickSubscription?: Subscription;
  private _convertUnit: ConvertUnit | "best" = "best";
  private _convertKind?: BestKind;
    private _unitSystem: string;

  constructor(
    unitSystem: UnitSystem,
    setGeoJson: (
      featureCollection: FeatureCollection,
      distanceLabel: string | undefined
    ) => void
  ) {
    this._fc = { type: "FeatureCollection", features: [] };
    this._active = false;
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
    this._container = document.createElement("div");
    this._container.className =
      "maplibregl-ctrl maplibregl-ctrl-group maplibregl-measure";

    this._container.appendChild(this._button);
    return this._container;
  }

  onRemove(_map: Map): void {
    if (this._container?.parentNode)
      this._container.parentNode.removeChild(this._container);
    if (this._onClickSubscription) this._onClickSubscription.unsubscribe();
    this._map = undefined;
  }

  private _onToggle = () => {
    this._active = !this._active;

    if (this._active) this._button.classList.add("active");
    else this._button.classList.remove("active");

    const geoman = (this._map as any).gm as Geoman | undefined;
    if (geoman) {
      geoman.disableDraw();
    }

    if (this._map) {
      this._map.getCanvas().style.cursor = this._active ? "crosshair" : "grab";
    }
  };

  private _convertedLabel = (meters: number) => {
    const converter = convert(meters, "meters");


    if(this._unitSystem === "nautical"){
        let quantity = converter.to("nautical miles")
        return `${quantity.toFixed(1)} nm`;
    }

    const c = converter.to("best", this._unitSystem as BestKind)
    return `${c.quantity.toFixed(1)} ${c.unit}`;
  }

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
        let a = existingPoints[i - 1].geometry.coordinates;
        let b = existingPoints[i].geometry.coordinates;

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

export default function MeasureControl() {
  const dispatch = useAppDispatch();
  const { unitSystem } = useAppSelector((state) => state.map);

  const [geoJson, setGeoJson] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const impl = useControl(
    () =>
      new MeasureControlImpl(unitSystem, (fc, label) => {
        setGeoJson(fc);
        if (label) dispatch(setTooltip({ type: "distance", distance: label }));
        else dispatch(clearTooltip("distance"));
      }),
    {
      position: "top-left",
    }
  );

  useEffect(() => {
    impl.setUnitSystem(unitSystem);
  }, [unitSystem]);

  return (
    <>
      <Source type="geojson" data={geoJson} id="measure-control-source" />
    </>
  );
}
