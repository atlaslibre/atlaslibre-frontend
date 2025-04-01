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
        source="openinframap_telecom"
        source-layer="telecoms_data_center"
        paint={{
          "fill-color": {
            type: "interval",
            stops: [
              [5, "rgba(255, 128, 0, 0.5)"],
              [10, "rgba(255, 128, 0, 0.75)"],
            ],
          },
        }}
      />

      <ToggleableLayer
        type="symbol"
        group="infrastructure_telecoms_data_center"
        id="infrastructure_telecoms_data_center_label"
        source="openinframap_telecom"
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
        source="openinframap_telecom"
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
        source="openinframap_telecom"
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
        source="openinframap_telecom"
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
        source="openinframap_telecom"
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

      <ToggleableLayer
        type="circle"
        id="infrastructure_telecoms_mast"
        source="openinframap_telecom"
        source-layer="telecoms_mast"
        paint={{
          "circle-radius": {
            type: "interval",
            stops: [
              [5, 2],
              [15, 5],
            ],
          },
          "circle-color": {
            type: "interval",
            stops: [
              [5, "rgba(255, 128, 0, 0.5)"],
              [10, "rgba(255, 128, 0, 0.75)"],
            ],
          },
        }}
      />

      {/* Power */}

      <ToggleableLayer
        type="line"
        group="infrastructure_underwater_powerline"
        id="infrastructure_underwater_powerline_line"
        source="openinframap_power"
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
        source="openinframap_power"
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
        source="openinframap_power"
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
        source="openinframap_power"
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

      <ToggleableLayer
        type="fill"
        group="infrastructure_power_generation"
        id="infrastructure_power_plant_generic"
        source="openinframap_power"
        source-layer="power_plant"
        paint={{
          "fill-color": {
            type: "interval",
            stops: [
              [0, "rgba(255, 0, 0, 0.2)"],
              [3, "rgba(255, 0, 0, 0.35)"],
              [5, "rgba(255, 0, 0, 0.5)"],
              [10, "rgba(255, 0, 0, 1)"],
            ],
          },
        }}
        filter={["all", ["!=", "source", "wind"], ["!=", "source", "solar"]]}
      />

      <ToggleableLayer
        type="line"
        group="infrastructure_power_generation"
        id="infrastructure_power_substation"
        source="openinframap_power"
        source-layer="power_substation"
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
          "line-dasharray": [1, 1]
        }}
      />

      <ToggleableLayer
        type="line"
        group="infrastructure_power_generation"
        id="infrastructure_windfarm"
        source="openinframap_power"
        source-layer="power_plant"
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
        }}
        filter={["==", "source", "wind"]}
      />

      <ToggleableLayer
        type="line"
        group="infrastructure_power_generation"
        id="infrastructure_solar_farm"
        source="openinframap_power"
        source-layer="power_plant"
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
        }}
        filter={["==", "source", "solar"]}
      />

      <ToggleableLayer
        type="symbol"
        group="infrastructure_power_generation"
        id="infrastructure_power_generation_label"
        source-layer="power_plant"
        source="openinframap_power"
        minzoom={9}
        layout={{
          "symbol-placement": "point",
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
      />

      {/* Oil and gas */}

      <ToggleableLayer
        type="line"
        group="infrastructure_underwater_pipeline"
        id="infrastructure_underwater_pipeline_line"
        source="openinframap_petroleum"
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
        source="openinframap_petroleum"
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
        source="openinframap_petroleum"
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
        source="openinframap_petroleum"
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

      {/* Water */}

      <ToggleableLayer
        type="fill"
        group="infrastructure_water_reservoir"
        id="infrastructure_water_reservoir_fill"
        source="openinframap_water"
        source-layer="water_reservoir"
        paint={{
          "fill-color": {
            type: "interval",
            stops: [
              [0, "rgba(0, 0, 255, 0.2)"],
              [3, "rgba(0, 0, 255, 0.35)"],
              [5, "rgba(0, 0, 255, 0.5)"],
              [10, "rgba(0, 0, 255, 1)"],
            ],
          },
        }}
      />

      <ToggleableLayer
        type="symbol"
        group="infrastructure_water_reservoir"
        id="infrastructure_water_reservoir_label"
        source="openinframap_water"
        source-layer="water_reservoir"
        minzoom={10}
        layout={{
          "symbol-placement": "point",
          "text-field": "{name}",
          "text-font": italicRegularFonts,
          "symbol-spacing": 300,
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
      />

      <ToggleableLayer
        type="fill"
        group="infrastructure_water_production"
        id="infrastructure_water_treatment_plant"
        source="openinframap_water"
        source-layer="water_treatment_plant_polygon"
        paint={{
          "fill-color": {
            type: "interval",
            stops: [
              [0, "rgba(0, 0, 255, 0.2)"],
              [3, "rgba(0, 0, 255, 0.35)"],
              [5, "rgba(0, 0, 255, 0.5)"],
              [10, "rgba(0, 0, 255, 0.75)"],
            ],
          },
        }}
      />

      <ToggleableLayer
        type="fill"
        group="infrastructure_water_production"
        id="infrastructure_water_pumping_station"
        source="openinframap_water"
        source-layer="pumping_station_polygon"
        paint={{
          "fill-color": {
            type: "interval",
            stops: [
              [0, "rgba(0, 0, 255, 0.2)"],
              [3, "rgba(0, 0, 255, 0.35)"],
              [5, "rgba(0, 0, 255, 0.5)"],
              [10, "rgba(0, 0, 255, 0.75)"],
            ],
          },
        }}
      />

      <ToggleableLayer
        type="line"
        group="infrastructure_water_pipeline"
        id="infrastructure_water_pipeline_water"
        source="openinframap_water"
        source-layer="water_pipeline"
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [0, "rgba(0, 0, 255, 0.2)"],
              [3, "rgba(0, 0, 255, 0.35)"],
              [5, "rgba(0, 0, 255, 0.5)"],
              [10, "rgba(0, 0, 255, 1)"],
            ],
          },
          "line-width": 1.5,
        }}
        filter={["==", "substance", "water"]}
      />

      <ToggleableLayer
        type="line"
        group="infrastructure_water_pipeline"
        id="infrastructure_water_pipeline_sewage"
        source="openinframap_water"
        source-layer="water_pipeline"
        paint={{
          "line-color": {
            type: "interval",
            stops: [
              [0, "rgba(139,69,19,0.2)"],
              [3, "rgba(139,69,19,0.35)"],
              [5, "rgba(139,69,19,0.5)"],
              [10, "rgba(139,69,19,1)"],
            ],
          },
          "line-width": 1.5,
        }}
        filter={["in", "substance", "wastewater", "sewage", "waterwaste"]}
      />

      <ToggleableLayer
        type="fill"
        group="infrastructure_sewage"
        id="infrastructure_water_sewage_plant"
        source="openinframap_water"
        source-layer="wastewater_plant_polygon"
        paint={{
          "fill-color": {
            type: "interval",
            stops: [
              [0, "rgba(139,69,19, 0.2)"],
              [3, "rgba(139,69,19, 0.35)"],
              [5, "rgba(139,69,19, 0.5)"],
              [10, "rgba(139,69,19, 0.75)"],
            ],
          },
        }}
      />
    </>
  );
}
