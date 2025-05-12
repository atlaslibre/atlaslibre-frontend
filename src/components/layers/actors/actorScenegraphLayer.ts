import { Color, PickingInfo } from "deck.gl";
import { Actor } from "../../../interfaces/actor";

import { ScenegraphLayer } from "@deck.gl/mesh-layers";
import { ModelParams } from "../../../features/gossip/models";

const darkHighlight = [200, 200, 200];
const lightHighlight = [255, 255, 255];

export default function actorScenegraphLayer(
  model: ModelParams,
  actors: Actor[],
  tracked: string[],
  onHover: (actor?: Actor) => void,
  onClick: (actor?: Actor) => void
): ScenegraphLayer<Actor> {
  return new ScenegraphLayer<Actor>({
    id: "gossip-layer-" + model.filename,
    data: actors,
    pickable: true,
    sizeScale: model.scale,
    scenegraph: "/models/" + model.filename,
    sizeMinPixels: model.minSize,
    sizeMaxPixels: model.maxSize,
    autoHighlight: true,
    getPosition: (d) => {
      let alt = d.pos.alt ? d.pos.alt : 0;
      if (alt < 1) alt = 10;
      return [d.pos.lon ?? 0, d.pos.lat ?? 0, alt];
    },
    _animations: {
      "*": { speed: 1 },
    },
    _lighting: "pbr",
    getOrientation: (d) => {
      const yaw = (model.rotation + (d.pos.heading ?? 0)) % 360;
      return [0, -yaw, 90];
    },
    onHover: (info: PickingInfo<Actor>) => {
      onHover(info.object);
    },
    onClick: (info: PickingInfo<Actor>) => {
      onClick(info.object);
    },
    getColor: (d) => {
      if (tracked.find((a) => a == d.id)) return lightHighlight as Color;
      return darkHighlight as Color;
    },
  });
}
