import { italicRegularFonts, mediumFonts } from "../../features/map/fonts";
import ToggleableLayer from "./shared/ToggleableLayer";

export default function OtherInfrastructureLayers() {
  const underwaterDashes = [1, 1, 5, 1];
  const terrestrialDashes = [5, 1, 5, 1];

  return (
    <>
      {/* Communications */}

      <ToggleableLayer
        group="infrastructure_telecoms_data_center"
        type="fill"
        id="infrastructure_telecoms_data_center_fill"
        source="openinframap"
        source-layer="telecoms_data_center"
        paint={{
          "fill-color": {
            type: "interval",
            stops: [
              [5, "rgba(255, 128, 0, 0.5)"],
              [10, "rgba(255, 128, 0, 1)"],
            ],
          },
        }}
      />

      <ToggleableLayer
        type="symbol"
        group="infrastructure_telecoms_data_center"
        id="infrastructure_telecoms_data_center_label"
        source="openinframap"
        source-layer="telecoms_data_center"
        minzoom={15}
        layout={{
          "text-field": "{name} {operator}",
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
          "text-color": "#eee",
          "text-halo-color": "#151515",
          "text-halo-width": 1,
        }}
      />

      <ToggleableLayer
        type="line"
        group="infrastructure_underwater_communication"
        id="infrastructure_underwater_communication_line"
        source="openinframap"
        source-layer="telecoms_communication_line"
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [0, "rgba(255, 128, 0, 0.2)"],
              [3, "rgba(255, 128, 0, 0.35)"],
              [5, "rgba(255, 128, 0, 0.5)"],
              [10, "rgba(255, 128, 0, 1)"],
            ],
          },
          "line-width": 1.5,
          "line-dasharray": underwaterDashes,
        }}
        filter={["==", "location", "underwater"]}
      />

      <ToggleableLayer
        type="symbol"
        group="infrastructure_underwater_communication"
        id="infrastructure_underwater_communication_label"
        source-layer="telecoms_communication_line"
        source="openinframap"
        layout={{
          "symbol-placement": "line",
          "text-field": "{name}",
          "text-font": italicRegularFonts,
          "symbol-spacing": 300,
          "symbol-avoid-edges": false,
          "text-size": {
            type: "interval",
            stops: [
              [9, 9],
              [10, 11],
            ],
          },
        }}
        paint={{
          "text-color": "#eee",
          "text-halo-color": "#181818",
          "text-halo-width": 1,
          "text-halo-blur": 1,
        }}
        filter={["==", "location", "underwater"]}
      />

      <ToggleableLayer
        type="line"
        group="infrastructure_terrestrial_communication"
        id="infrastructure_terrestrial_communication_line"
        source="openinframap"
        source-layer="telecoms_communication_line"
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [0, "rgba(255, 128, 0, 0.2)"],
              [3, "rgba(255, 128, 0, 0.35)"],
              [5, "rgba(255, 128, 0, 0.5)"],
              [10, "rgba(255, 128, 0, 1)"],
            ],
          },
          "line-width": 1.5,
          "line-dasharray": terrestrialDashes,
        }}
        filter={["!=", "location", "underwater"]}
      />

      <ToggleableLayer
        type="symbol"
        group="infrastructure_terrestrial_communication"
        id="infrastructure_terrestrial_communication_label"
        source-layer="telecoms_communication_line"
        source="openinframap"
        layout={{
          "symbol-placement": "line",
          "text-field": "{name}",
          "text-font": italicRegularFonts,
          "symbol-spacing": 300,
          "symbol-avoid-edges": false,
          "text-size": {
            type: "interval",
            stops: [
              [9, 9],
              [10, 11],
            ],
          },
        }}
        paint={{
          "text-color": "#eee",
          "text-halo-color": "#181818",
          "text-halo-width": 1,
          "text-halo-blur": 1,
        }}
        filter={["!=", "location", "underwater"]}
      />

      {/* Power */}

      <ToggleableLayer
        type="line"
        group="infrastructure_underwater_powerline"
        id="infrastructure_underwater_powerline_line"
        source="openinframap"
        source-layer="power_line"
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [0, "rgba(255, 0, 0, 0.2)"],
              [3, "rgba(255, 0, 0, 0.35)"],
              [5, "rgba(255, 0, 0, 0.5)"],
              [10, "rgba(255, 0, 0, 1)"],
            ],
          },
          "line-width": 1.5,
          "line-dasharray": underwaterDashes,
        }}
        filter={["==", "location", "underwater"]}
      />

      <ToggleableLayer
        type="symbol"
        group="infrastructure_underwater_powerline"
        id="infrastructure_underwater_powerline_label"
        source-layer="power_line"
        source="openinframap"
        layout={{
          "symbol-placement": "line",
          "text-field": "{name}",
          "text-font": italicRegularFonts,
          "symbol-spacing": 300,
          "symbol-avoid-edges": false,
          "text-size": {
            type: "interval",
            stops: [
              [9, 9],
              [10, 11],
            ],
          },
        }}
        paint={{
          "text-color": "#eee",
          "text-halo-color": "#181818",
          "text-halo-width": 1,
          "text-halo-blur": 1,
        }}
        filter={["==", "location", "underwater"]}
      />

      <ToggleableLayer
        type="line"
        group="infrastructure_terrestrial_powerline"
        id="infrastructure_terrestrial_powerline_line"
        source="openinframap"
        source-layer="power_line"
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [0, "rgba(255, 0, 0, 0.2)"],
              [3, "rgba(255, 0, 0, 0.35)"],
              [5, "rgba(255, 0, 0, 0.5)"],
              [10, "rgba(255, 0, 0, 1)"],
            ],
          },
          "line-width": 1.5,
          "line-dasharray": terrestrialDashes,
        }}
        filter={["!=", "location", "underwater"]}
      />

      <ToggleableLayer
        type="symbol"
        group="infrastructure_terrestrial_powerline"
        id="infrastructure_terrestrial_powerline_label"
        source-layer="power_line"
        source="openinframap"
        layout={{
          "symbol-placement": "line",
          "text-field": "{name}",
          "text-font": italicRegularFonts,
          "symbol-spacing": 300,
          "symbol-avoid-edges": false,
          "text-size": {
            type: "interval",
            stops: [
              [9, 9],
              [10, 11],
            ],
          },
        }}
        paint={{
          "text-color": "#eee",
          "text-halo-color": "#181818",
          "text-halo-width": 1,
          "text-halo-blur": 1,
        }}
        filter={["!=", "location", "underwater"]}
      />

      {/* Oil and gas */}

      <ToggleableLayer
        type="line"
        group="infrastructure_underwater_pipeline"
        id="infrastructure_underwater_pipeline_line"
        source="openinframap"
        source-layer="petroleum_pipeline"
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [0, "rgba(255, 255, 0, 0.2)"],
              [3, "rgba(255, 255, 0, 0.35)"],
              [5, "rgba(255, 255, 0, 0.5)"],
              [10, "rgba(255, 255, 0, 1)"],
            ],
          },
          "line-width": 1.5,
          "line-dasharray": underwaterDashes,
        }}
        filter={["==", "location", "underwater"]}
      />

      <ToggleableLayer
        type="symbol"
        group="infrastructure_underwater_pipeline"
        id="infrastructure_underwater_pipeline_label"
        source-layer="petroleum_pipeline"
        source="openinframap"
        layout={{
          "symbol-placement": "line",
          "text-field": "{name}",
          "text-font": italicRegularFonts,
          "symbol-spacing": 300,
          "symbol-avoid-edges": false,
          "text-size": {
            type: "interval",
            stops: [
              [9, 9],
              [10, 11],
            ],
          },
        }}
        paint={{
          "text-color": "#eee",
          "text-halo-color": "#181818",
          "text-halo-width": 1,
          "text-halo-blur": 1,
        }}
        filter={["==", "location", "underwater"]}
      />

      <ToggleableLayer
        type="line"
        group="infrastructure_terrestrial_pipeline"
        id="infrastructure_terrestrial_pipeline_line"
        source="openinframap"
        source-layer="petroleum_pipeline"
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [0, "rgba(255, 255, 0, 0.2)"],
              [3, "rgba(255, 255, 0, 0.35)"],
              [5, "rgba(255, 255, 0, 0.5)"],
              [10, "rgba(255, 255, 0, 1)"],
            ],
          },
          "line-width": 1.5,
          "line-dasharray": terrestrialDashes,
        }}
        filter={["!=", "location", "underwater"]}
      />

      <ToggleableLayer
        type="symbol"
        group="infrastructure_terrestrial_pipeline"
        id="infrastructure_terrestrial_pipeline_label"
        source-layer="petroleum_pipeline"
        source="openinframap"
        layout={{
          "symbol-placement": "line",
          "text-field": "{name}",
          "text-font": italicRegularFonts,
          "symbol-spacing": 300,
          "symbol-avoid-edges": false,
          "text-size": {
            type: "interval",
            stops: [
              [9, 9],
              [10, 11],
            ],
          },
        }}
        paint={{
          "text-color": "#eee",
          "text-halo-color": "#181818",
          "text-halo-width": 1,
          "text-halo-blur": 1,
        }}
        filter={["!=", "location", "underwater"]}
      />
    </>
  );
}
