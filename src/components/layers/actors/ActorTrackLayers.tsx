import { Layer } from "react-map-gl/maplibre";
import { useAppSelector } from "../../../app/hooks";
import { useMediaQuery } from "@mui/material";

export default function ActorTrackLayers() {
  const { colorMode } = useAppSelector((state) => state.flags);
  const { viewState } = useAppSelector((state) => state.map);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  function c<T>(light: T, dark: T): T {
    if (colorMode == "system") return prefersDarkMode ? dark : light;
    return colorMode == "light" ? light : dark;
  }

  return (
    <>
      <Layer
        type="line"
        id="actor-track-line-shadow"
        source="actor-track"
        paint={{
          "line-width": 5,
          "line-color": c("#666", "#000"),
          "line-opacity": viewState.pitch > 0 ? 0.5 : 0,
          "line-blur": 4
        }}
      />

      <Layer
        type="circle"
        id="actor-track-current-shadow"
        source="actor-track"
        paint={{
          "circle-color": c("#666", "#000"),
          "circle-blur": 0.3,
          "circle-opacity": viewState.pitch > 0 ? 0.4 : 0,
          "circle-radius": {
            type: "exponential",
            stops: [
              [2, 2],
              [9, 15],
            ],
          },
          "circle-pitch-scale": "map",
          "circle-pitch-alignment": "map",
        }}
        filter={["==", "type", "current_position"]}
      />
    </>
  );
}
