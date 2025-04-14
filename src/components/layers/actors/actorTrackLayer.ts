import { LineLayer } from "deck.gl";
import { Actor, Track } from "../../../interfaces/actor";
import colormap from "colormap";
import { TrackColorRange } from "../../../features/gossip/pluginSettingsSlice";

const rainbow = colormap<"rgba">({
  colormap: "rainbow",
  nshades: 100,
  format: "rgba",
}).reverse();

const getColor = (
  actor: Actor,
  trackColorRange: {
    [actorType: string]: TrackColorRange;
  },
  speed?: number,
  altitude?: number
): [number, number, number] => {
  const type = trackColorRange[actor.type].type;

  let value;
  if (type == "speed") value = speed;
  else if (trackColorRange[actor.type].type == "altitude") value = altitude;

  if (!value) return [128, 128, 128];

  const min = trackColorRange[actor.type].min;
  const max = trackColorRange[actor.type].max;

  const index = Math.min(
    Math.trunc((100 * Math.max(value - min, 0)) / (max - min)),
    99
  );

  const color = rainbow[Math.min(index, 100)];
  return [color[0], color[1], color[2]];
};

export default function actorTrackLayer(
  allTracks: Track[],
  allActors: Actor[],
  trackColorRange: {
    [actorType: string]: TrackColorRange;
  }
) {
  type TrackSegment = {
    start: [longitude: number, latitude: number, altitude: number];
    end: [longitude: number, latitude: number, altitude: number];
    speed?: number;
    altitude?: number;
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
        altitude: c.alt,
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
    getColor: (_d) =>
      getColor(_d.actor, trackColorRange, _d.speed, _d.altitude),
    getWidth: 2,
  });

  return actorPaths;
}
