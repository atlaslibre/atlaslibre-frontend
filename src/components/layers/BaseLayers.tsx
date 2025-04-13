import { Layer } from "react-map-gl/maplibre";

import ToggleableLayer from "./shared/ToggleableLayer";
import { useColorMode } from "../../app/hooks";

export default function BaseLayers() {
  const c = useColorMode();

  return (
    <>
      <Layer
        type="background"
        id="background"
        paint={{
          "background-color": c("#fafaf8", "#0e0e0e"),
          "background-opacity": 1,
        }}
      />

      <ToggleableLayer
        group="landcover"
        type="fill"
        id="landcover"
        source-layer="landcover"
        source="carto"
        paint={{
          "fill-color": c("rgba(234, 241, 233, 0.5)", "#161b1f"),
          "fill-opacity": 1,
        }}
        filter={[
          "any",
          ["==", "class", "wood"],
          ["==", "class", "grass"],
          ["==", "subclass", "recreation_ground"],
        ]}
      />

      <ToggleableLayer
        group="landcover"
        type="fill"
        id="ice"
        source-layer="landcover"
        source="carto"
        paint={{
          "fill-color": c("#fff", "#21282d"),
          "fill-opacity": 1,
        }}
        filter={["==", "class", "ice"]}
      />

      <ToggleableLayer
        group="landcover"
        type="fill"
        id="landuse_residential"
        source-layer="landuse"
        source="carto"
        minzoom={6}
        paint={{
          "fill-color": {
            type: "interval",
            stops: [
              [5, c("rgba(237, 237, 237, 0.5)", "rgba(0, 0, 0, 0.5)")],
              [8, c("rgba(237, 237, 237, 0.45)", "rgba(0, 0, 0, 0.45)")],
              [9, c("rgba(237, 237, 237, 0.4)", "rgba(0, 0, 0, 0.4)")],
              [11, c("rgba(237, 237, 237, 0.35)", "rgba(0, 0, 0, 0.35)")],
              [13, c("rgba(237, 237, 237, 0.3)", "rgba(0, 0, 0, 0.3)")],
              [15, c("rgba(237, 237, 237, 0.25)", "rgba(0, 0, 0, 0.25)")],
              [16, c("rgba(237, 237, 237, 0.25)", "rgba(0, 0, 0, 0.15)")],
            ],
          },
          "fill-opacity": {
            type: "interval",
            stops: [
              [6, 0.6],
              [9, 1],
            ],
          },
        }}
        filter={["==", "class", "residential"]}
      />

      <ToggleableLayer
        type="line"
        group="borders"
        id="boundary_county"
        source-layer="boundary"
        source="carto"
        minzoom={9}
        maxzoom={24}
        filter={["all", ["==", "admin_level", 6], ["==", "maritime", 0]]}
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [4, c("#ead5d7", "#222")],
              [5, c("#ead5d7", "#222")],
              [6, c("#e1c5c7", "#2C353C")],
            ],
          },
          "line-width": {
            type: "interval",
            stops: [
              [4, 0.5],
              [7, 1],
            ],
          },
          "line-dasharray": {
            type: "interval",
            stops: [
              [6, [1]],
              [7, [2, 2]],
            ],
          },
        }}
      />

      <ToggleableLayer
        type="line"
        group="borders"
        id="boundary_state"
        source-layer="boundary"
        source="carto"
        minzoom={4}
        filter={["all", ["==", "admin_level", 4], ["==", "maritime", 0]]}
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [4, c("#ead5d7", "rgba(103, 103, 114, 1)")],
              [5, c("#ead5d7", "rgba(103, 103, 114, 1)")],
              [6, c("#e1c5c7", "rgba(103, 103, 114, 1)")],
            ],
          },
          "line-width": {
            type: "interval",
            stops: [
              [4, 0.5],
              [7, 1],
              [8, 1],
              [9, 1.2],
            ],
          },
          "line-dasharray": {
            type: "interval",
            stops: [
              [6, [1, 2, 3]],
              [7, [1, 2, 3]],
            ],
          },
        }}
      />

      <Layer
        type="fill"
        id="water"
        source-layer="water"
        source="carto"
        paint={{
          "fill-color": c("#d4dadc", "#2C353C"),
          "fill-antialias": true,
          "fill-translate-anchor": "map",
          "fill-opacity": 1,
        }}
      />

      <ToggleableLayer
        type="line"
        id="waterway"
        source-layer="waterway"
        source="carto"
        paint={{
          "line-color": c("#d1dbdf", "rgba(63, 90, 109, 0.64)"),
          "line-width": {
            type: "interval",
            stops: [
              [8, 0.5],
              [9, 1],
              [15, 2],
              [16, 3],
            ],
          },
        }}
      />

      <ToggleableLayer
        type="raster"
        id="satellite_basemap"
        source="ersi"
        paint={{ "raster-brightness-max": c(1, 0.6), "raster-brightness-min": c(0.4, 0) }}
      ></ToggleableLayer>

      <ToggleableLayer
        type="raster"
        id="osm_basemap"
        source="osm"
        paint={{ "raster-brightness-max": c(1, 0.6), "raster-brightness-min": c(0.4, 0) }}
      ></ToggleableLayer>

      <ToggleableLayer
        group="borders"
        type="line"
        id="boundary_country_outline"
        source-layer="boundary"
        source="carto"
        minzoom={6}
        maxzoom={24}
        filter={["all", ["==", "admin_level", 2], ["==", "maritime", 0]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-color": c("#f3efed", "#2C353C"),
          "line-opacity": 0.5,
          "line-width": 8,
          "line-offset": 0,
        }}
      />

      <ToggleableLayer
        group="borders"
        type="line"
        id="boundary_country_inner"
        source-layer="boundary"
        source="carto"
        minzoom={0}
        filter={["all", ["==", "admin_level", 2], ["==", "maritime", 0]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [4, c("#f2e6e7", "rgba(92, 94, 94, 1)")],
              [5, c("#ebd6d8", "rgba(96, 96, 96, 1)")],
              [6, c("#ebd6d8", "rgba(102, 102, 102, 1)")],
            ],
          },
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
