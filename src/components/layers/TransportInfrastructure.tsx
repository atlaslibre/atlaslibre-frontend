import ToggleableLayer from "./shared/ToggleableLayer";

export default function TransportInfrastructure() {
  return (
    <>
      {/* airports */}

      <ToggleableLayer
        group="airports"
        type="line"
        id="aeroway-runway"
        source="carto"
        source-layer="aeroway"
        filter={["all", ["==", "class", "runway"]]}
        minzoom={12}
        layout={{ "line-cap": "square" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 1],
              [13, 4],
              [14, 6],
              [15, 8],
              [16, 10],
            ],
          },
          "line-color": "#111",
        }}
      />

      <ToggleableLayer
        group="airports"
        type="line"
        id="aeroway-taxiway"
        source="carto"
        source-layer="aeroway"
        filter={["all", ["==", "class", "taxiway"]]}
        minzoom={13}
        layout={{ "line-cap": "square" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [13, 0.5],
              [14, 1],
              [15, 2],
              [16, 4],
            ],
          },
          "line-color": "#111",
        }}
      />

      {/* tunnels */}

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_service_case"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "service"],
          ["==", "brunnel", "tunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 1],
              [16, 3],
              [17, 6],
              [18, 8],
            ],
          },
          "line-color": "#1a1a1a",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_minor_case"
        source="carto"
        source-layer="transportation"
        minzoom={13}
        maxzoom={24}
        filter={["all", ["==", "class", "minor"], ["==", "brunnel", "tunnel"]]}
        layout={{ "line-cap": "butt", "line-join": "miter" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 0.5],
              [12, 0.5],
              [14, 2],
              [15, 4],
              [16, 6],
              [17, 10],
              [18, 14],
            ],
          },
          "line-color": "#1a1a1a",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_sec_case"
        source="carto"
        source-layer="transportation"
        minzoom={11}
        maxzoom={24}
        filter={[
          "all",
          ["in", "class", "secondary", "tertiary"],
          ["==", "brunnel", "tunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 0.5],
              [12, 1],
              [13, 2],
              [14, 5],
              [15, 6],
              [16, 8],
              [17, 12],
              [18, 16],
            ],
          },
          "line-color": "#1a1a1a",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_pri_case"
        source="carto"
        source-layer="transportation"
        minzoom={8}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "primary"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "tunnel"],
        ]}
        layout={{ "line-cap": "butt", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 0.8],
              [8, 1],
              [11, 3],
              [13, 4],
              [14, 6],
              [15, 8],
              [16, 10],
              [17, 14],
              [18, 18],
            ],
          },
          "line-opacity": {
            type: "interval",
            stops: [
              [5, 0.5],
              [7, 1],
            ],
          },
          "line-color": "#1a1a1a",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_trunk_case"
        source="carto"
        source-layer="transportation"
        minzoom={5}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "trunk"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "tunnel"],
        ]}
        layout={{
          "line-cap": "butt",
          "line-join": "round",
        }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 0.8],
              [8, 1],
              [11, 3],
              [13, 4],
              [14, 6],
              [15, 8],
              [16, 10],
              [17, 14],
              [18, 18],
            ],
          },
          "line-opacity": {
            type: "interval",
            stops: [
              [5, 0.5],
              [7, 1],
            ],
          },
          "line-color": "#232323",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_mot_case"
        source="carto"
        source-layer="transportation"
        minzoom={5}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "motorway"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "tunnel"],
        ]}
        layout={{ "line-cap": "butt", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 0.8],
              [8, 1],
              [11, 3],
              [12, 4],
              [13, 5],
              [14, 7],
              [15, 9],
              [16, 11],
              [17, 13],
              [18, 22],
            ],
          },
          "line-opacity": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 1],
            ],
          },
          "line-color": "#232323",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_path"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        maxzoom={24}
        filter={["all", ["==", "class", "path"], ["==", "brunnel", "tunnel"]]}
        layout={{ "line-cap": "butt", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 0.5],
              [16, 1],
              [18, 3],
            ],
          },
          "line-dasharray": {
            type: "interval",
            stops: [
              [15, [2, 2]],
              [18, [3, 3]],
            ],
          },
          "line-color": "#262626",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_service_fill"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "service"],
          ["==", "brunnel", "tunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 2],
              [16, 2],
              [17, 4],
              [18, 6],
            ],
          },
          "line-color": "#161616",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_minor_fill"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        maxzoom={24}
        filter={["all", ["==", "class", "minor"], ["==", "brunnel", "tunnel"]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 3],
              [16, 4],
              [17, 8],
              [18, 12],
            ],
          },
          "line-color": "rgba(22, 22, 22, 1)",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_sec_fill"
        source="carto"
        source-layer="transportation"
        minzoom={13}
        maxzoom={24}
        filter={[
          "all",
          ["in", "class", "secondary", "tertiary"],
          ["==", "brunnel", "tunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 2],
              [13, 2],
              [14, 3],
              [15, 4],
              [16, 6],
              [17, 10],
              [18, 14],
            ],
          },
          "line-color": "#161616",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_pri_fill"
        source="carto"
        source-layer="transportation"
        minzoom={11}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "primary"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "tunnel"],
        ]}
        layout={{ "line-cap": "butt", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 1],
              [13, 2],
              [14, 4],
              [15, 6],
              [16, 8],
              [17, 12],
              [18, 16],
            ],
          },
          "line-color": "rgba(65, 71, 88, 1)",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_trunk_fill"
        source="carto"
        source-layer="transportation"
        minzoom={11}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "trunk"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "tunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 1],
              [13, 2],
              [14, 4],
              [15, 6],
              [16, 8],
              [17, 12],
              [18, 16],
            ],
          },
          "line-color": "#161616",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="tunnel_mot_fill"
        source="carto"
        source-layer="transportation"
        minzoom={10}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "motorway"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "tunnel"],
        ]}
        layout={{ "line-cap": "butt", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [10, 1],
              [12, 2],
              [13, 3],
              [14, 5],
              [15, 7],
              [16, 9],
              [17, 11],
              [18, 20],
            ],
          },
          "line-color": "rgba(65, 71, 88, 1)",
        }}
      />

      <ToggleableLayer
        group="rail"
        type="line"
        id="tunnel_rail"
        source="carto"
        source-layer="transportation"
        minzoom={13}
        maxzoom={24}
        filter={["all", ["==", "class", "rail"], ["==", "brunnel", "tunnel"]]}
        layout={{ "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [13, 0.5],
              [14, 1],
              [15, 1],
              [16, 3],
              [21, 7],
            ],
          },
          "line-opacity": 0.5,
          "line-color": "#1a1a1a",
        }}
      />

      <ToggleableLayer
        group="rail"
        type="line"
        id="tunnel_rail_dash"
        source="carto"
        source-layer="transportation"
        minzoom={13}
        maxzoom={24}
        filter={["all", ["==", "class", "rail"], ["==", "brunnel", "tunnel"]]}
        layout={{ "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 0.5],
              [16, 1],
              [20, 5],
            ],
          },
          "line-dasharray": {
            type: "interval",

            stops: [
              [15, [5, 5]],
              [16, [6, 6]],
            ],
          },
          "line-opacity": 0.5,
          "line-color": "#111",
        }}
      />

      {/* roads */}
      <ToggleableLayer
        group="roads"
        type="line"
        id="road_service_case"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        maxzoom={24}
        filter={["all", ["==", "class", "service"], ["!has", "brunnel"]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 1],
              [16, 3],
              [17, 6],
              [18, 8],
            ],
          },
          "line-color": "#1c1c1c",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_minor_case"
        source="carto"
        source-layer="transportation"
        minzoom={13}
        maxzoom={24}
        filter={["all", ["==", "class", "minor"], ["!has", "brunnel"]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 0.5],
              [12, 0.5],
              [14, 2],
              [15, 3],
              [16, 4.3],
              [17, 10],
              [18, 14],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [13, "rgba(65, 71, 88, 1)"],
              [15.7, "rgba(65, 71, 88, 1)"],
              [16, "rgba(65, 71, 88, 1)"],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_pri_case_ramp"
        source="carto"
        source-layer="transportation"
        minzoom={12}
        maxzoom={24}
        filter={["all", ["==", "class", "primary"], ["==", "ramp", 1]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [12, 2],
              [13, 3],
              [14, 4],
              [15, 5],
              [16, 8],
              [17, 10],
            ],
          },
          "line-opacity": {
            type: "interval",
            stops: [
              [5, 0.5],
              [7, 1],
            ],
          },
          "line-color": "#232323",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_trunk_case_ramp"
        source="carto"
        source-layer="transportation"
        minzoom={12}
        maxzoom={24}
        filter={["all", ["==", "class", "trunk"], ["==", "ramp", 1]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [12, 2],
              [13, 3],
              [14, 4],
              [15, 5],
              [16, 8],
              [17, 10],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [12, "#1a1a1a"],
              [14, "#232323"],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_mot_case_ramp"
        source="carto"
        source-layer="transportation"
        minzoom={12}
        maxzoom={24}
        filter={["all", ["==", "class", "motorway"], ["==", "ramp", 1]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [12, 2],
              [13, 3],
              [14, 4],
              [15, 5],
              [16, 8],
              [17, 10],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [12, "#1a1a1a"],
              [14, "#232323"],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_sec_case_noramp"
        source="carto"
        source-layer="transportation"
        minzoom={11}
        maxzoom={24}
        filter={[
          "all",
          ["in", "class", "secondary", "tertiary"],
          ["!has", "brunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 0.9],
              [12, 1.5],
              [13, 3],
              [14, 5],
              [15, 6],
              [16, 8],
              [17, 12],
              [18, 16],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [11, "rgba(65, 71, 88, 1)"],
              [12.99, "rgba(65, 71, 88, 1)"],
              [13, "rgba(65, 71, 88, 1)"],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_pri_case_noramp"
        source="carto"
        source-layer="transportation"
        minzoom={7}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "primary"],
          ["!=", "ramp", 1],
          ["!has", "brunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 0.8],
              [8, 1],
              [11, 3],
              [13, 4],
              [14, 6],
              [15, 8],
              [16, 10],
              [17, 14],
              [18, 18],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [7, "#1a1a1a"],
              [12, "#232323"],
            ],
          },
          "line-opacity": {
            type: "interval",
            stops: [
              [5, 0.5],
              [7, 1],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_trunk_case_noramp"
        source="carto"
        source-layer="transportation"
        minzoom={5}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "trunk"],
          ["!=", "ramp", 1],
          ["!has", "brunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 0.8],
              [8, 1],
              [11, 3],
              [13, 4],
              [14, 6],
              [15, 8],
              [16, 10],
              [17, 14],
              [18, 18],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [5, "#1a1a1a"],
              [12, "#232323"],
            ],
          },
          "line-opacity": {
            type: "interval",
            stops: [
              [5, 0.5],
              [7, 1],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_mot_case_noramp"
        source="carto"
        source-layer="transportation"
        minzoom={5}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "motorway"],
          ["!=", "ramp", 1],
          ["!has", "brunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 0.7],
              [8, 0.8],
              [11, 3],
              [12, 4],
              [13, 5],
              [14, 7],
              [15, 9],
              [16, 11],
              [17, 13],
              [18, 22],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [5, "#1a1a1a"],
              [12, "#232323"],
            ],
          },
          "line-opacity": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 1],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_path"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        maxzoom={24}
        filter={["all", ["in", "class", "path", "track"], ["!has", "brunnel"]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 0.5],
              [16, 1],
              [18, 3],
            ],
          },
          "line-color": "#262626",
          "line-dasharray": {
            type: "interval",
            stops: [
              [15, [2, 2]],
              [18, [3, 3]],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_service_fill"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        maxzoom={24}
        filter={["all", ["==", "class", "service"], ["!has", "brunnel"]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 2],
              [16, 2],
              [17, 4],
              [18, 6],
            ],
          },
          "line-color": "#0b0b0b",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_minor_fill"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        maxzoom={24}
        filter={["all", ["==", "class", "minor"], ["!has", "brunnel"]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 3],
              [16, 4],
              [17, 8],
              [18, 12],
            ],
          },
          "line-color": "rgba(65, 71, 88, 1)",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_pri_fill_ramp"
        source="carto"
        source-layer="transportation"
        minzoom={12}
        maxzoom={24}
        filter={["all", ["==", "class", "primary"], ["==", "ramp", 1]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [12, 1],
              [13, 1.5],
              [14, 2],
              [15, 3],
              [16, 6],
              [17, 8],
            ],
          },
          "line-color": "#0b0b0b",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_trunk_fill_ramp"
        source="carto"
        source-layer="transportation"
        minzoom={12}
        maxzoom={24}
        filter={["all", ["==", "class", "trunk"], ["==", "ramp", 1]]}
        layout={{ "line-cap": "square", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [12, 1],
              [13, 1.5],
              [14, 2],
              [15, 3],
              [16, 6],
              [17, 8],
            ],
          },
          "line-color": "#0b0b0b",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_mot_fill_ramp"
        source="carto"
        source-layer="transportation"
        minzoom={12}
        maxzoom={24}
        filter={["all", ["==", "class", "motorway"], ["==", "ramp", 1]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [12, 1],
              [13, 1.5],
              [14, 2],
              [15, 3],
              [16, 6],
              [17, 8],
            ],
          },
          "line-color": "rgba(65, 71, 88, 1)",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_sec_fill_noramp"
        source="carto"
        source-layer="transportation"
        minzoom={13}
        maxzoom={24}
        filter={[
          "all",
          ["in", "class", "secondary", "tertiary"],
          ["!has", "brunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 2],
              [13, 2],
              [14, 3],
              [15, 4],
              [16, 6],
              [17, 10],
              [18, 14],
            ],
          },
          "line-color": "rgba(65, 71, 88, 1)",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_pri_fill_noramp"
        source="carto"
        source-layer="transportation"
        minzoom={10}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "primary"],
          ["!=", "ramp", 1],
          ["!has", "brunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [10, 0.3],
              [13, 2],
              [14, 4],
              [15, 6],
              [16, 8],
              [17, 12],
              [18, 16],
            ],
          },
          "line-color": "rgba(83, 86, 102, 1)",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_trunk_fill_noramp"
        source="carto"
        source-layer="transportation"
        minzoom={10}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "trunk"],
          ["!=", "ramp", 1],
          ["!has", "brunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 1],
              [13, 2],
              [14, 4],
              [15, 6],
              [16, 8],
              [17, 12],
              [18, 16],
            ],
          },
          "line-color": "rgba(65, 71, 88, 1)",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="road_mot_fill_noramp"
        source="carto"
        source-layer="transportation"
        minzoom={10}
        maxzoom={24}
        filter={[
          "all",
          ["==", "class", "motorway"],
          ["!=", "ramp", 1],
          ["!has", "brunnel"],
        ]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [10, 1],
              [12, 2],
              [13, 3],
              [14, 5],
              [15, 7],
              [16, 9],
              [17, 11],
              [18, 20],
            ],
          },
          "line-color": "rgba(73, 73, 73, 1)",
        }}
      />

      <ToggleableLayer
        group="rail"
        type="line"
        id="rail"
        source="carto"
        source-layer="transportation"
        minzoom={5}
        filter={["all", ["==", "class", "rail"], ["!=", "brunnel", "tunnel"]]}
        layout={{ "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [5, 0.5],
              [13, 1],
              [14, 1],
              [15, 2],
              [16, 3],
              [21, 7],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [5, "#222"],
              [12, "#1a1a1a"],
            ],
          },
        }}
      />
      <ToggleableLayer
        group="rail"
        type="line"
        id="rail_dash"
        source="carto"
        source-layer="transportation"
        minzoom={12}
        filter={["all", ["==", "class", "rail"], ["!=", "brunnel", "tunnel"]]}
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 0.5],
              [16, 1],
              [20, 5],
            ],
          },
          "line-color": "#111",
          "line-dasharray": {
            type: "interval",
            stops: [
              [15, [5, 5]],
              [16, [6, 6]],
            ],
          },
        }}
      />

      {/* Bridges */}

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_service_case"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        filter={[
          "all",
          ["==", "class", "service"],
          ["==", "brunnel", "bridge"],
        ]}
        layout={{ "line-join": "round" }}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 1],
              [16, 3],
              [17, 6],
              [18, 8],
            ],
          },
          "line-color": "#1c1c1c",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_minor_case"
        source="carto"
        source-layer="transportation"
        minzoom={12}
        filter={["all", ["==", "class", "minor"], ["==", "brunnel", "bridge"]]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 0.5],
              [12, 0.5],
              [14, 2],
              [15, 3],
              [16, 4.3],
              [17, 10],
              [18, 14],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [13, "#161616"],
              [15.7, "#161616"],
              [16, "#1c1c1c"],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_sec_case"
        source="carto"
        source-layer="transportation"
        minzoom={11}
        filter={[
          "all",
          ["in", "class", "secondary", "tertiary"],
          ["==", "brunnel", "bridge"],
        ]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 0.5],
              [12, 1.5],
              [13, 3],
              [14, 5],
              [15, 6],
              [16, 8],
              [17, 12],
              [18, 16],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [11, "#1a1a1a"],
              [12.99, "#1a1a1a"],
              [13, "#232323"],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_pri_case"
        source="carto"
        source-layer="transportation"
        minzoom={11}
        layout={{ "line-join": "round" }}
        filter={[
          "all",
          ["==", "class", "primary"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "bridge"],
        ]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 0.8],
              [8, 1],
              [11, 3],
              [13, 4],
              [14, 6],
              [15, 8],
              [16, 10],
              [17, 14],
              [18, 18],
            ],
          },
          "line-opacity": {
            type: "interval",
            stops: [
              [5, 0.5],
              [7, 1],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [8, "#1a1a1a"],
              [12, "#232323"],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_trunk_case"
        source="carto"
        source-layer="transportation"
        minzoom={5}
        layout={{ "line-join": "round" }}
        filter={[
          "all",
          ["==", "class", "trunk"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "bridge"],
        ]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 0.8],
              [8, 1],
              [11, 3],
              [13, 4],
              [14, 6],
              [15, 8],
              [16, 10],
              [17, 14],
              [18, 18],
            ],
          },
          "line-opacity": {
            type: "interval",
            stops: [
              [5, 0.5],
              [7, 1],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [5, "#1a1a1a"],
              [12, "#232323"],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_mot_case"
        source="carto"
        source-layer="transportation"
        minzoom={5}
        layout={{ "line-join": "round" }}
        filter={[
          "all",
          ["==", "class", "motorway"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "bridge"],
        ]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 0.8],
              [8, 1],
              [11, 3],
              [12, 4],
              [13, 5],
              [14, 7],
              [15, 9],
              [16, 11],
              [17, 13],
              [18, 22],
            ],
          },
          "line-opacity": {
            type: "interval",
            stops: [
              [6, 0.5],
              [7, 1],
            ],
          },
          "line-color": {
            type: "interval",
            stops: [
              [5, "#1a1a1a"],
              [10, "#232323"],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_path"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        layout={{ "line-cap": "round", "line-join": "round" }}
        filter={["all", ["==", "class", "path"], ["==", "brunnel", "bridge"]]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 0.5],
              [16, 1],
              [18, 3],
            ],
          },
          "line-color": "#262626",
          "line-dasharray": {
            type: "interval",
            stops: [
              [15, [2, 2]],
              [18, [3, 3]],
            ],
          },
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_service_fill"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        layout={{ "line-cap": "round", "line-join": "round" }}
        filter={[
          "all",
          ["==", "class", "service"],
          ["==", "brunnel", "bridge"],
        ]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 2],
              [16, 2],
              [17, 4],
              [18, 6],
            ],
          },
          "line-color": "#0b0b0b",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_minor_fill"
        source="carto"
        source-layer="transportation"
        minzoom={15}
        layout={{ "line-cap": "round", "line-join": "round" }}
        filter={["all", ["==", "class", "minor"], ["==", "brunnel", "bridge"]]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [15, 3],
              [16, 4],
              [17, 8],
              [18, 12],
            ],
          },
          "line-color": "#0b0b0b",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_sec_fill"
        source="carto"
        source-layer="transportation"
        minzoom={13}
        layout={{ "line-cap": "round", "line-join": "round" }}
        filter={[
          "all",
          ["in", "class", "secondary", "tertiary"],
          ["==", "brunnel", "bridge"],
        ]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 2],
              [13, 2],
              [14, 3],
              [15, 4],
              [16, 6],
              [17, 10],
              [18, 14],
            ],
          },
          "line-color": "#0b0b0b",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_pri_fill"
        source="carto"
        source-layer="transportation"
        minzoom={11}
        layout={{ "line-join": "round" }}
        filter={[
          "all",
          ["==", "class", "primary"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "bridge"],
        ]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 1],
              [13, 2],
              [14, 4],
              [15, 6],
              [16, 8],
              [17, 12],
              [18, 16],
            ],
          },
          "line-color": "#0b0b0b",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_trunk_fill"
        source="carto"
        source-layer="transportation"
        minzoom={11}
        layout={{ "line-join": "round" }}
        filter={[
          "all",
          ["==", "class", "trunk"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "bridge"],
        ]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [11, 1],
              [13, 2],
              [14, 4],
              [15, 6],
              [16, 8],
              [17, 12],
              [18, 16],
            ],
          },
          "line-color": "rgba(65, 71, 88, 1)",
        }}
      />

      <ToggleableLayer
        group="roads"
        type="line"
        id="bridge_mot_fill"
        source="carto"
        source-layer="transportation"
        minzoom={10}
        layout={{ "line-join": "round" }}
        filter={[
          "all",
          ["==", "class", "motorway"],
          ["!=", "ramp", 1],
          ["==", "brunnel", "bridge"],
        ]}
        paint={{
          "line-width": {
            type: "interval",
            stops: [
              [10, 1],
              [12, 2],
              [13, 3],
              [14, 5],
              [15, 7],
              [16, 9],
              [17, 11],
              [18, 20],
            ],
          },
          "line-color": "rgba(65, 71, 88, 1)",
        }}
      />
    </>
  );
}
