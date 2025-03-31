import ToggleableLayer from "./shared/ToggleableLayer";

export default function OtherInfrastructureLayers() {
  const underwaterDashes = [1, 1, 5, 1];
  const terrestrialDashes = [5, 1, 5, 1];
  return (
    <>
      <ToggleableLayer
        type="line"
        id="infrastructure_underwater_communication"
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
        type="line"
        id="infrastructure_terrestrial_communication"
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
        type="line"
        id="infrastructure_underwater_powerline"
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
        type="line"
        id="infrastructure_terrestrial_powerline"
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
        type="line"
        id="infrastructure_underwater_pipeline"
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
        type="line"
        id="infrastructure_terrestrial_pipeline"
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
    </>
  );
}
