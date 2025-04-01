import { italicMediumFonts, italicRegularFonts, mediumFonts, regularFonts } from "../../features/map/fonts";
import ToggleableLayer from "./shared/ToggleableLayer";



export default function LabelLayers() {

  const name = "{name_en}";

  return (
    <>
      {/* water layers */}
      <ToggleableLayer
        group="labels_water"
        type="symbol"
        id="waterway_label"
        source-layer="waterway"
        source="carto"
        filter={["all", ["has", "name"], ["==", "class", "river"]]}
        layout={{
          "symbol-placement": "line",
          "text-field": name,
          "text-font": italicRegularFonts,
          "symbol-spacing": 300,
          "symbol-avoid-edges": false,
          "text-size": {
            type: "interval",
            stops: [
              [9, 8],
              [10, 9],
            ],
          },
          "text-offset": {
            type: "interval",
            stops: [
              [6, [0, -0.2]],
              [11, [0, -0.4]],
              [12, [0, -0.6]],
            ],
          },
          "text-padding": 2,
          "text-pitch-alignment": "auto",
          "text-rotation-alignment": "auto",
          "text-letter-spacing": 0,
          "text-keep-upright": true,
        }}
        paint={{
          "text-color": "rgba(164, 164, 164, 1)",
          "text-halo-color": "#181818",
          "text-halo-width": 1,
          "text-halo-blur": 1,
        }}
      />

      <ToggleableLayer
        group="labels_water"
        type="symbol"
        id="watername_ocean"
        source-layer="water_name"
        source="carto"
        minzoom={0}
        maxzoom={5}
        filter={[
          "all",
          ["has", "name"],
          ["==", "$type", "Point"],
          ["==", "class", "ocean"],
        ]}
        layout={{
          "symbol-placement": "point",
          "text-field": name,
          "text-font": italicMediumFonts,
          "text-size": {
            type: "interval",
            stops: [
              [0, 13],
              [2, 14],
              [4, 18],
            ],
          },
          "text-line-height": 1.2,
          "text-padding": 2,
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-pitch-alignment": "auto",
          "text-rotation-alignment": "auto",
          "text-max-width": 6,
          "text-letter-spacing": 0.1,
        }}
        paint={{
          "text-color": "rgba(109, 123, 129, 1)",
          "text-halo-color": "#181818",
          "text-halo-width": 1,
          "text-halo-blur": 1,
        }}
      />

      <ToggleableLayer
        group="labels_water"
        type="symbol"
        id="watername_sea"
        source-layer="water_name"
        source="carto"
        minzoom={5}
        filter={[
          "all",
          ["has", "name"],
          ["==", "$type", "Point"],
          ["==", "class", "sea"],
        ]}
        layout={{
          "symbol-placement": "point",
          "text-field": name,
          "text-font": italicMediumFonts,
          "text-size": 12,
          "text-line-height": 1.2,
          "text-padding": 2,
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-pitch-alignment": "auto",
          "text-rotation-alignment": "auto",
          "text-max-width": 6,
          "text-letter-spacing": 0.1,
        }}
        paint={{
          "text-color": "#3c3c3c",
          "text-halo-color": "rgba(0,0,0,0.7)",
          "text-halo-width": 1,
          "text-halo-blur": 0,
        }}
      />

      <ToggleableLayer
        group="labels_water"
        type="symbol"
        id="watername_lake"
        source-layer="water_name"
        source="carto"
        minzoom={5}
        filter={[
          "all",
          ["has", "name"],
          ["==", "$type", "Point"],
          ["==", "class", "lake"],
        ]}
        layout={{
          "symbol-placement": "point",
          "text-field": name,
          "text-font": italicRegularFonts,
          "text-size": {
            type: "interval",
            stops: [
              [13, 9],
              [14, 10],
              [15, 11],
              [16, 12],
              [17, 13],
            ],
          },
          "text-line-height": 1.2,
          "text-padding": 2,
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "text-pitch-alignment": "auto",
          "text-rotation-alignment": "auto",
        }}
        paint={{
          "text-color": "rgba(155, 155, 155, 1)",
          "text-halo-color": "#181818",
          "text-halo-width": 1,
          "text-halo-blur": 1,
        }}
      />

      <ToggleableLayer
        group="labels_water"
        type="symbol"
        id="watername_lake_line"
        source-layer="water_name"
        source="carto"
        minzoom={5}
        filter={["all", ["has", "name"], ["==", "$type", "LineString"]]}
        layout={{
          "symbol-placement": "line",
          "text-field": name,
          "text-font": italicRegularFonts,
          "text-size": {
            type: "interval",
            stops: [
              [13, 9],
              [14, 10],
              [15, 11],
              [16, 12],
              [17, 13],
            ],
          },
          "symbol-spacing": 350,
          "text-pitch-alignment": "auto",
          "text-rotation-alignment": "auto",
          "text-line-height": 1.2,
        }}
        paint={{
          "text-color": "#444",
          "text-halo-color": "#181818",
          "text-halo-width": 1,
          "text-halo-blur": 1,
        }}
      />

      {/* small towns, etc. layers */}

      <ToggleableLayer
        group="labels_small_towns"
        type="symbol"
        id="place_hamlet"
        source-layer="place"
        source="carto"
        minzoom={12}
        maxzoom={16}
        filter={[
          "any",
          ["==", "class", "neighbourhood"],
          ["==", "class", "hamlet"],
        ]}
        layout={{
          "text-field": name,
          "text-font": regularFonts,
          "text-size": {
            type: "interval",
            stops: [
              [13, 8],
              [14, 10],
              [16, 11],
            ],
          },
          "text-anchor": "center",
          "text-max-width": 10,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
          "text-transform": {
            type: "interval",
            stops: [
              [12, "none"],
              [14, "uppercase"],
            ],
          },
        }}
        paint={{
          "text-color": "rgba(182, 180, 180, 1)",
          "text-halo-color": "rgba(53, 52, 52, 1)",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_small_towns"
        type="symbol"
        id="place_suburbs"
        source-layer="place"
        source="carto"
        minzoom={12}
        maxzoom={16}
        filter={["all", ["==", "class", "suburb"]]}
        layout={{
          "text-field": name,
          "text-font": regularFonts,
          "text-size": {
            type: "interval",
            stops: [
              [12, 9],
              [13, 10],
              [14, 11],
              [15, 12],
              [16, 13],
            ],
          },
          "text-anchor": "center",
          "text-max-width": 10,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
          "text-transform": {
            type: "interval",
            stops: [
              [8, "none"],
              [12, "uppercase"],
            ],
          },
        }}
        paint={{
          "text-color": "#666",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_small_towns"
        type="symbol"
        id="place_villages"
        source-layer="place"
        source="carto"
        minzoom={10}
        maxzoom={16}
        filter={["all", ["==", "class", "village"]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": {
            type: "interval",
            stops: [
              [10, 9],
              [12, 10],
              [13, 11],
              [14, 12],
              [16, 13],
            ],
          },
          "text-anchor": "center",
          "text-max-width": 10,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
          "text-transform": {
            type: "interval",
            stops: [
              [8, "none"],
              [12, "uppercase"],
            ],
          },
        }}
        paint={{
          "text-color": "rgba(154, 153, 153, 1)",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_small_towns"
        type="symbol"
        id="place_town"
        source-layer="place"
        source="carto"
        minzoom={8}
        maxzoom={14}
        filter={["all", ["==", "class", "town"]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": {
            type: "interval",
            stops: [
              [8, 10],
              [9, 10],
              [10, 11],
              [13, 14],
              [14, 15],
            ],
          },
          "text-anchor": "center",
          "text-max-width": 10,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
          "text-transform": "none",
        }}
        paint={{
          "text-color": "rgba(204, 208, 228, 1)",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      {/* cities layers */}

      <ToggleableLayer
        group="labels_cities"
        type="symbol"
        id="place_city_r6"
        source-layer="place"
        source="carto"
        minzoom={8}
        maxzoom={13}
        filter={["all", ["==", "class", "city"], [">=", "rank", 6]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": {
            type: "interval",
            stops: [
              [8, 12],
              [9, 13],
              [10, 14],
              [13, 17],
              [14, 20],
            ],
          },
          "text-anchor": "center",
          "text-max-width": 10,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
          "text-transform": "uppercase",
        }}
        paint={{
          "text-color": "rgba(168, 176, 180, 1)",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_cities"
        type="symbol"
        id="place_city_r5"
        source-layer="place"
        source="carto"
        minzoom={8}
        maxzoom={15}
        filter={[
          "all",
          ["==", "class", "city"],
          [">=", "rank", 0],
          ["<=", "rank", 5],
        ]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": {
            type: "interval",
            stops: [
              [8, 14],
              [10, 16],
              [13, 19],
              [14, 22],
            ],
          },
          "text-anchor": "center",
          "text-max-width": 10,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
          "text-transform": "uppercase",
        }}
        paint={{
          "text-color": "rgba(211, 228, 236, 1)",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_cities"
        type="symbol"
        id="place_city_dot_r7"
        source-layer="place"
        source="carto"
        minzoom={6}
        maxzoom={7}
        filter={["all", ["==", "class", "city"], ["<=", "rank", 7]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": 12,
          "icon-image": "circle-11",
          "icon-offset": [16, 5],
          "text-anchor": "right",
          "icon-size": 0.4,
          "text-max-width": 8,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
        }}
        paint={{
          "text-color": "rgba(174, 191, 207, 1)",
          "icon-color": "rgba(94, 105, 106, 1)",
          "icon-translate-anchor": "map",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_cities"
        type="symbol"
        id="place_city_dot_r4"
        source-layer="place"
        source="carto"
        minzoom={5}
        maxzoom={7}
        filter={["all", ["==", "class", "city"], ["<=", "rank", 4]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": 12,
          "icon-image": "circle-11",
          "icon-offset": [16, 5],
          "text-anchor": "right",
          "icon-size": 0.4,
          "text-max-width": 8,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
        }}
        paint={{
          "text-color": "rgba(233, 239, 246, 1)",
          "icon-color": "#666",
          "icon-translate-anchor": "map",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_cities"
        type="symbol"
        id="place_city_dot_r2"
        source-layer="place"
        source="carto"
        minzoom={4}
        maxzoom={7}
        filter={["all", ["==", "class", "city"], ["<=", "rank", 2]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": 12,
          "icon-image": "circle-11",
          "icon-offset": [16, 5],
          "text-anchor": "right",
          "icon-size": 0.4,
          "text-max-width": 8,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
        }}
        paint={{
          "text-color": "rgba(175, 194, 217, 1)",
          "icon-color": "rgba(131, 164, 189, 1)",
          "icon-translate-anchor": "map",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_cities"
        type="symbol"
        id="place_city_dot_r2"
        source-layer="place"
        source="carto"
        minzoom={4}
        maxzoom={7}
        filter={["all", ["==", "class", "city"], ["<=", "rank", 2]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": 12,
          "icon-image": "circle-11",
          "icon-offset": [16, 5],
          "text-anchor": "right",
          "icon-size": 0.4,
          "text-max-width": 8,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
        }}
        paint={{
          "text-color": "rgba(175, 194, 217, 1)",
          "icon-color": "rgba(131, 164, 189, 1)",
          "icon-translate-anchor": "map",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_small_towns"
        type="symbol"
        id="place_city_dot_z7"
        source-layer="place"
        source="carto"
        minzoom={7}
        maxzoom={8}
        filter={[
          "all",
          ["!has", "capital"],
          ["!in", "class", "country", "state"],
        ]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": 12,
          "icon-image": "circle-11",
          "icon-offset": [16, 5],
          "text-anchor": "right",
          "icon-size": 0.4,
          "text-max-width": 8,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
        }}
        paint={{
          "text-color": "rgba(160, 179, 191, 1)",
          "icon-color": "rgba(113, 128, 147, 1)",
          "icon-translate-anchor": "map",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_cities"
        type="symbol"
        id="place_capital_dot_z7"
        source-layer="place"
        source="carto"
        minzoom={7}
        maxzoom={8}
        filter={["all", [">", "capital", 0]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": 12,
          "icon-image": "circle-11",
          "icon-offset": [16, 5],
          "text-anchor": "right",
          "icon-size": 0.4,
          "text-max-width": 8,
          "text-keep-upright": true,
          "text-offset": [0.2, 0.2],
          "text-transform": "uppercase",
        }}
        paint={{
          "text-color": "rgba(177, 201, 214, 1)",
          "icon-color": "#666",
          "icon-translate-anchor": "map",
          "text-halo-color": "#222",
          "text-halo-width": 1,
        }}
      />

      {/* region naming layers */}

      <ToggleableLayer
        group="labels_regions"
        type="symbol"
        id="place_state"
        source-layer="place"
        source="carto"
        minzoom={5}
        maxzoom={10}
        filter={["all", ["==", "class", "state"], ["<=", "rank", 4]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": {
            type: "interval",
            stops: [
              [5, 12],
              [7, 14],
            ],
          },
          "text-max-width": 9,
          "text-transform": "uppercase",
        }}
        paint={{
          "text-color": "rgba(203, 230, 230, 1)",
          "text-halo-color": "#111",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_regions"
        type="symbol"
        id="place_country_2"
        source-layer="place"
        source="carto"
        minzoom={3}
        maxzoom={10}
        filter={[
          "all",
          ["==", "class", "country"],
          [">=", "rank", 3],
          ["has", "iso_a2"],
        ]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": {
            type: "interval",
            stops: [
              [3, 10],
              [5, 11],
              [6, 12],
              [7, 13],
              [8, 14],
            ],
          },
          "text-transform": "uppercase",
        }}
        paint={{
          "text-color": {
            type: "interval",
            stops: [
              [3, "rgba(157, 157, 157, 1)"],
              [5, "rgba(114, 114, 114, 1)"],
              [6, "rgba(112, 112, 112, 1)"],
            ],
          },
          "text-halo-color": "#111",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_regions"
        type="symbol"
        id="place_country_1"
        source-layer="place"
        source="carto"
        minzoom={2}
        maxzoom={7}
        filter={["all", ["==", "class", "country"], ["<=", "rank", 2]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": {
            type: "interval",
            stops: [
              [3, 11],
              [4, 12],
              [5, 13],
              [6, 14],
            ],
          },
          "text-max-width": {
            type: "interval",
            stops: [
              [2, 6],
              [3, 6],
              [4, 9],
              [5, 12],
            ],
          },
          "text-transform": "uppercase",
        }}
        paint={{
          "text-color": {
            type: "interval",
            stops: [
              [3, "rgba(158, 182, 189, 1)"],
              [5, "rgba(118, 126, 137, 1)"],
              [6, "rgba(120, 141, 147, 1)"],
            ],
          },
          "text-halo-color": "#111",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_regions"
        type="symbol"
        id="place_continent"
        source-layer="place"
        source="carto"
        minzoom={0}
        maxzoom={2}
        filter={["all", ["==", "class", "continent"]]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-transform": "uppercase",
          "text-size": 14,
          "text-letter-spacing": 0.1,
          "text-max-width": 9,
          "text-justify": "center",
          "text-keep-upright": false,
        }}
        paint={{
          "text-color": "rgba(135, 164, 179, 1)",
          "text-halo-color": "#111",
          "text-halo-width": 1,
        }}
      />

      {/* POI */}

      <ToggleableLayer
        group="labels_poi"
        type="symbol"
        id="poi"
        source-layer="poi"
        source="carto"
        minzoom={15}
        filter={[
          "any",
          [
            "all",
            ["in", "class", "stadium", "cemetery", "attraction"],
            ["<=", "rank", 3],
          ],
          ["==", "class", "park"],
        ]}
        layout={{
          "text-field": name,
          "text-font": mediumFonts,
          "text-size": {
            type: "interval",
            stops: [
              [15, 8],
              [17, 9],
              [18, 10],
            ],
          },
          "text-transform": "uppercase",
        }}
        paint={{
          "text-color": "#515151",
          "text-halo-color": "#151515",
          "text-halo-width": 1,
        }}
      />

      {/* Roads, etc. */}

      <ToggleableLayer
        group="labels_roads"
        type="symbol"
        id="roadname_minor"
        source-layer="transportation_name"
        source="carto"
        filter={["all", ["in", "class", "minor", "service"]]}
        minzoom={16}
        layout={{
          "symbol-placement": "line",
          "text-field": name,
          "text-font": regularFonts,
          "text-size": 9,
          "symbol-avoid-edges": false,
          "symbol-spacing": 200,
          "text-pitch-alignment": "auto",
          "text-rotation-alignment": "auto",
          "text-justify": "center",
        }}
        paint={{
          "text-color": "rgba(181, 180, 180, 1)",
          "text-halo-color": "#111",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_roads"
        type="symbol"
        id="roadname_sec"
        source-layer="transportation_name"
        source="carto"
        filter={["all", ["in", "class", "secondary", "tertiary"]]}
        minzoom={15}
        layout={{
          "symbol-placement": "line",
          "text-field": name,
          "text-font": regularFonts,
          "text-size": {
            type: "interval",
            stops: [
              [15, 9],
              [16, 11],
              [18, 12],
            ],
          },
          "symbol-avoid-edges": false,
          "symbol-spacing": 200,
          "text-pitch-alignment": "auto",
          "text-rotation-alignment": "auto",
          "text-justify": "center",
        }}
        paint={{
          "text-color": "rgba(146, 146, 146, 1)",
          "text-halo-color": "rgba(34, 34, 34, 1)",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_roads"
        type="symbol"
        id="roadname_pri"
        source-layer="transportation_name"
        source="carto"
        filter={["all", ["in", "class", "primary"]]}
        minzoom={14}
        layout={{
          "symbol-placement": "line",
          "text-field": name,
          "text-font": regularFonts,
          "text-size": {
            type: "interval",
            stops: [
              [14, 10],
              [15, 10],
              [16, 11],
              [18, 12],
            ],
          },

          "symbol-avoid-edges": false,
          "symbol-spacing": {
            type: "interval",
            stops: [
              [6, 200],
              [16, 250],
            ],
          },
          "text-pitch-alignment": "auto",
          "text-rotation-alignment": "auto",
          "text-justify": "center",
          "text-letter-spacing": {
            type: "interval",
            stops: [
              [14, 0],
              [16, 0.2],
            ],
          },
        }}
        paint={{
          "text-color": "rgba(189, 189, 189, 1)",
          "text-halo-color": "#111",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_roads"
        type="symbol"
        id="roadname_major"
        source-layer="transportation_name"
        source="carto"
        filter={["all", ["in", "class", "trunk", "motorway"]]}
        minzoom={13}
        layout={{
          "symbol-placement": "line",
          "text-field": name,
          "text-font": regularFonts,
          "text-size": {
            type: "interval",
            stops: [
              [14, 10],
              [15, 10],
              [16, 11],
              [18, 12],
            ],
          },

          "symbol-avoid-edges": false,
          "symbol-spacing": {
            type: "interval",
            stops: [
              [6, 200],
              [16, 250],
            ],
          },
          "text-pitch-alignment": "auto",
          "text-rotation-alignment": "auto",
          "text-justify": "center",
          "text-letter-spacing": {
            type: "interval",
            stops: [
              [13, 0],
              [16, 0.2],
            ],
          },
        }}
        paint={{
          "text-color": "#383838",
          "text-halo-color": "#111",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        group="labels_roads"
        type="symbol"
        id="housenumber"
        source-layer="housenumber"
        source="carto"
        minzoom={17}
        maxzoom={24}
        layout={{
          "text-field": "{housenumber}",
          "text-font": regularFonts,
          "text-size": {
            type: "interval",
            stops: [
              [17, 8],
              [18, 9],
            ],
          },

          "symbol-avoid-edges": false,
          "symbol-spacing": {
            type: "interval",
            stops: [
              [6, 200],
              [16, 250],
            ],
          },
          "text-pitch-alignment": "auto",
          "text-rotation-alignment": "auto",
          "text-justify": "center",
          "text-letter-spacing": {
            type: "interval",
            stops: [
              [13, 0],
              [16, 0.2],
            ],
          },
        }}
        paint={{
          "text-color": "rgba(189, 189, 189, 0.2)",
          "text-halo-color": "#111",
          "text-halo-width": 1,
        }}
      />
    </>
  );
}
