import { Layer } from "react-map-gl/maplibre";

import ToggleableLayer from "./shared/ToggleableLayer";

export default function BaseLayers() {

  return (
    <>
      <Layer
        type="background"
        id="background"
        paint={{ "background-color": "#0e0e0e", "background-opacity": 1 }}
      />

      <ToggleableLayer
        group="landcover"
        type="fill"
        id="landcover"
        source-layer="landcover"
        source="carto"
        paint={{
          "fill-color": "#161b1f",
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
          "fill-color": "#21282d",
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
              [5, "rgba(0, 0, 0, 0.5)"],
              [8, "rgba(0, 0, 0, 0.45)"],
              [9, "rgba(0, 0, 0, 0.4)"],
              [11, "rgba(0, 0, 0, 0.35)"],
              [13, "rgba(0, 0, 0, 0.3)"],
              [15, "rgba(0, 0, 0, 0.25)"],
              [16, "rgba(0, 0, 0, 0.15)"],
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
              [4, "#222"],
              [5, "#222"],
              [6, "#2C353C"],
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
              [4, "rgba(103, 103, 114, 1)"],
              [5, "rgba(103, 103, 114, 1)"],
              [6, "rgba(103, 103, 114, 1)"],
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
          "fill-color": "#2C353C",
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
          "line-color": "rgba(63, 90, 109, 0.64)",
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
        paint={{ "raster-brightness-max": 0.8 }}
      ></ToggleableLayer>

      <ToggleableLayer
        type="raster"
        id="osm_basemap"
        source="osm"
        paint={{ "raster-brightness-max": 0.8 }}
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
          "line-color": "#2C353C",
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
              [4, "rgba(92, 94, 94, 1)"],
              [5, "rgba(96, 96, 96, 1)"],
              [6, "rgba(102, 102, 102, 1)"],
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
