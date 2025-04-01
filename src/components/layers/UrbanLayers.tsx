import { useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import ToggleableLayer from "./shared/ToggleableLayer";

export default function UrbanLayers() {
  const { colorMode } = useAppSelector((state) => state.flags);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const c = (light: any, dark: any) => {
    if (colorMode == "system") return prefersDarkMode ? dark : light;
    return colorMode == "light" ? light : dark;
  };

  return (
    <>
      <ToggleableLayer
        type="fill"
        id="building-top"
        group="buildings"
        source-layer="building"
        source="carto"
        paint={{
          "fill-translate": {
            type: "exponential",
            stops: [
              [14, [0, 0]],
              [16, [-2, -2]],
            ],
          },
          "fill-outline-color": c("#dfdfdf", "#0e0e0e"),
          "fill-color": c("#ededed", "rgba(57, 57, 57, 0.7)"),
          "fill-opacity": {
            type: "exponential",
            stops: [
              [13, 0],
              [16, 1],
            ],
          },
        }}
      />
    </>
  );
}
