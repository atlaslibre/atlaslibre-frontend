import { Layer } from "react-map-gl/maplibre";
import { regularFonts } from "../../features/map/fonts";
import { useColorMode } from "../../app/hooks";

export default function MeasureControlLayers() {
  const c = useColorMode();

  return (
    <>
      <Layer
        type="line"
        id="measure-control-line"
        source="measure-control-source"
        paint={{
            "line-color": c("#f66", "#f33"),
            "line-dasharray": [2,2]
        }}
      />
      <Layer
        type="circle"
        id="measure-control-points"
        source="measure-control-source"
        paint={{
            "circle-color": c("#000", "#fff"),
            "circle-radius": 4,
            "circle-pitch-scale": "map",
            "circle-pitch-alignment": "map",
        }}
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
          "text-halo-width": 1,
        }}
      />
    </>
  );
}
