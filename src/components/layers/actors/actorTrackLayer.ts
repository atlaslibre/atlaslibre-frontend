import { LineLayer } from "deck.gl";
import { Actor, Track } from "../../../interfaces/actor";
import colormap from "colormap";

const rainbow = colormap<"rgba">({
  colormap: "rainbow",
  nshades: 100,
  format: "rgba",
}).reverse();

const getColor = (
  actor: Actor,
  speedRange: { [actorType: string]: [number, number] },
  speed?: number
): [number, number, number] => {
  if (!speed) return [128, 128, 128];
  const min = speedRange[actor.type][0];
  const max = speedRange[actor.type][1];
  const index = Math.trunc((100 * Math.max(speed - min, 0)) / (max - min));
  const color = rainbow[Math.min(index, 100)];
  return [color[0], color[1], color[2]];
};

export default function actorTrackLayer(
  allTracks: Track[],
  allActors: Actor[],
  speedRange: { [actorType: string]: [number, number] }
) {
  type TrackSegment = {
    start: [longitude: number, latitude: number, altitude: number];
    end: [longitude: number, latitude: number, altitude: number];
    speed: number;
    actor: Actor;
    id: string;
  };

  const trackData: TrackSegment[] = [];

  for (let j = 0; j < allTracks.length; j++) {
    for (let i = 1; i < allTracks[j].track.length; i++) {
      const p = allTracks[j].track[i - 1];
      const c = allTracks[j].track[i];
      trackData.push({
        start: [p.lon, p.lat, p.alt ?? 10],
        end: [c.lon, c.lat, c.alt ?? 10],
        speed: c.speed,
        actor: allActors.find((a) => a.id == allActors[j].id),
        id: allTracks[j].id,
      } as TrackSegment);
    }
  }

  const actorPaths = new LineLayer<TrackSegment>({
    id: "actor-paths",
    data: trackData,
    opacity: 0.4,
    getSourcePosition: (d) => d.start,
    getTargetPosition: (d) => d.end,
    getColor: (_d) => getColor(_d.actor, speedRange, _d.speed),
    getWidth: 2,
  });

  return actorPaths;
}
