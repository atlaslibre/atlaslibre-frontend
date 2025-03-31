import { IconLayer } from "deck.gl";
import { IActor } from "../../../interfaces/schemas";

export default function (actors: IActor[]) {
  const layer = new IconLayer({
    id: "gossipShipIconLayer",
    data: actors.filter((s) => s.type == "ship"), 
    getPosition: (d: IActor) => [
      d.pos.lon ?? 0,
      d.pos.lat ?? 0,
      1
    ],
    getIcon: () => {
      return {
        url: "/pinkship.png",
        width: 128,
        height: 128,
        id: "ship"
      };
    },
    getAngle: (d: IActor) => {
      return d.pos.course ?? 0;
    },
    getColor: () => {
      return [0,140,0]
    },
    sizeUnits: "meters",
    sizeScale: 2000,
    sizeMinPixels: 10,
    billboard: false,
    mask: true
  });

  return layer;
}
