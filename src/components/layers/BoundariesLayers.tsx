import { useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import ToggleableLayer from "./shared/ToggleableLayer";
import { Layer } from "react-map-gl/maplibre";

export default function BoundariesLayers() {
  const { colorMode } = useAppSelector((state) => state.flags);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const { mapTimezoneObjectId } = useAppSelector((state) => state.map);

  function c<T>(light: T, dark: T): T {
    if (colorMode == "system") return prefersDarkMode ? dark : light;
    return colorMode == "light" ? light : dark;
  }

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
