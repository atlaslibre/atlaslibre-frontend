import { Layer } from "react-map-gl/maplibre";
import { useAppSelector } from "../../app/hooks";
import { useMediaQuery } from "@mui/material";
import { regularFonts } from "../../features/map/fonts";

export default function MeasureControlLayers() {
  const { colorMode } = useAppSelector((state) => state.flags);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  function c<T>(light: T, dark: T): T {
    if (colorMode == "system") return prefersDarkMode ? dark : light;
    return colorMode == "light" ? light : dark;
  }

  return (
    <>
      <Layer
        type="line"
        id="measure-control-line"
        source="measure-control-source"
      />
      <Layer
        type="circle"
        id="measure-control-points"
        source="measure-control-source"
      />

      <Layer
        type="symbol"
        id="measure-control-label"
        source="measure-control-source"
        layout={{
          "symbol-placement": "line-center",
          "text-field": "{distance_label}",
          "text-font": regularFonts,
          "text-size": 12
        }}
        paint={{
          "text-color": c("#111", "#eee"),
          "text-halo-color": c("#fff", "#000"),
          "text-halo-width": 4  ,
          "text-halo-blur": 2
        }}
      />
    </>
  );
}
