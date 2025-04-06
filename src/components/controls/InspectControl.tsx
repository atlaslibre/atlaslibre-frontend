import maplibregl, { ControlPosition } from "maplibre-gl";
import { useControl } from "react-map-gl/maplibre";

import MaplibreInspect from '@maplibre/maplibre-gl-inspect';

export default function InspectControl(props: { position: ControlPosition }) {
  useControl(() => new MaplibreInspect({
    popup: new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "500px"
    })
  }), props);

  return false;
}
