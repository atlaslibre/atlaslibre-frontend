import { useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import ToggleableLayer from "./shared/ToggleableLayer";

export default function BoundariesLayers() {
  const { colorMode } = useAppSelector((state) => state.flags);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const c = (light: string, dark: string): string => {
    if (colorMode == "system") return prefersDarkMode ? dark : light;
    return colorMode == "light" ? light : dark;
  };

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
        id="timezones"
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
    </>
  );
}
