import maplibregl, { ControlPosition } from "maplibre-gl";
import { useControl } from "react-map-gl/maplibre";

import MaplibreInspect from "@maplibre/maplibre-gl-inspect";
import renderPopup, { GeoJSONFeatureWithSourceLayer } from "@maplibre/maplibre-gl-inspect/lib/renderPopup";

export default function InspectControl(props: { position: ControlPosition }) {

  const filteredRenderPopup = (features: GeoJSONFeatureWithSourceLayer[]) : string => {
    const filtered = features.filter(s => s.source !== "timezones");
    return renderPopup(filtered);
  };

  useControl(
    () =>
      new MaplibreInspect({
        popup: new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          maxWidth: "500px",
        }),
        renderPopup: filteredRenderPopup,
      }),
    props
  );

  return false;
}
