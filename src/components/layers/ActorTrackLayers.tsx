import { Layer } from "react-map-gl/maplibre";
import { useAppSelector } from "../../app/hooks";
import { useMediaQuery } from "@mui/material";

export default function ActorTrackLayers() {
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
        id="actor-track"
        source="actor-track"
        paint={{
            "line-color": c("#000", "#fff"),
            "line-dasharray": [1,1]
        }}
      />
    </>
  );
}
