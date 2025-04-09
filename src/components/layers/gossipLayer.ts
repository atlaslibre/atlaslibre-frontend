import { PickingInfo } from "deck.gl";
import { Actor } from "../../interfaces/actor";

import { ScenegraphLayer } from "@deck.gl/mesh-layers";

export default function (
  actors: Actor[],
  model: string,
  onHover: (actor?: Actor) => void,
  onClick: (actor?: Actor) => void,
  sizeScale: number = 100,
  sizeMinPixels = 1.75,
  sizeMaxPixels = 10,
  rotation: number = 0
) {
  const layer = new ScenegraphLayer<Actor>({
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
      const yaw = (rotation + (d.pos.heading ?? 0)) % 360;
      return [0, -yaw, 90];
    },
    onHover: (info: PickingInfo<Actor>) => {
      onHover(info.object);
    },
    onClick: (info: PickingInfo<Actor>) => {
      onClick(info.object);
    },
  });

  return layer;
}
