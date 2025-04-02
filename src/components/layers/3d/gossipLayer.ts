import { PickingInfo } from "deck.gl";
import { IActor } from "../../../interfaces/schemas";

import { ScenegraphLayer } from "@deck.gl/mesh-layers";

export default function (
  actors: IActor[],
  model: string,
  onHover: (actor?: IActor) => void,
  onClick: (actor?: IActor) => void,
  sizeScale: number = 100,
  sizeMinPixels = 1.75,
  sizeMaxPixels = 10
) {
  const layer = new ScenegraphLayer<IActor>({
    id: "gossip-layer-" + model,
    data: actors,
    pickable: true,
    sizeScale: sizeScale,
    scenegraph: "/models/" + model,
    sizeMinPixels: sizeMinPixels,
    sizeMaxPixels: sizeMaxPixels,
    autoHighlight: true,
    getPosition: (d) => [d.pos.lon ?? 0, d.pos.lat ?? 0, 0],
    _animations: {
      "*": { speed: 1 },
    },
    _lighting: "pbr",
    getOrientation: (d) => {
      const yaw = (180 + (d.pos.course ?? 0)) % 360;
      return [0, -yaw, 90];
    },
    onHover: (info: PickingInfo<IActor>) => {
      onHover(info.object);
    },
    onClick: (info: PickingInfo<IActor>) => {
      onClick(info.object);
    },
  });

  return layer;
}
