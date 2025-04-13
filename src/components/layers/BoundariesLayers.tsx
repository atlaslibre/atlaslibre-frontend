import { useAppSelector, useColorMode } from "../../app/hooks";
import ToggleableLayer from "./shared/ToggleableLayer";
import { Layer } from "react-map-gl/maplibre";

export default function BoundariesLayers() {
  const c = useColorMode();
  const { mapTimezoneObjectId } = useAppSelector((state) => state.map);
  
  return (
    <>
      <ToggleableLayer
        type="line"
        id="boundary_country_outline_water"
        source-layer="boundary"
        source="carto"
        minzoom={0}
        maxzoom={24}
        filter={["all", ["==", "admin_level", 2], ["==", "maritime", 1]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-color": c("#f3efed", "rgb(101, 101, 101)"),
          "line-width": {
            type: "interval",
            stops: [
              [3, 1],
              [6, 1.5],
            ],
          },
          "line-offset": 0,
        }}
      />

      <ToggleableLayer
        type="line"
        id="timezones_lines"
        group="timezones"
        source="timezones"
        paint={{
          "line-color": c("rgb(200, 200, 255)", "rgb(50, 101, 101)"),
          "line-width": {
            type: "interval",
            stops: [
              [3, 1],
              [6, 1.5],
            ],
          },
          "line-offset": 0,
        }}
      />

      <ToggleableLayer
        type="fill"
        id="timezones_highlight"
        group="timezones"
        source="timezones"
        paint={{
          "fill-opacity": 0.3,
          "fill-color": c("rgb(200, 200, 255)", "rgb(50, 101, 101)")
        }}
        filter={["==", "objectid", mapTimezoneObjectId]}
      />

      <Layer
        type="fill"
        id="timezones_lookup"
        source="timezones"
        paint={{
          "fill-opacity": 0,
        }}
      />
    </>
  );
}
