import { LineLayer } from "deck.gl";
import { Actor, Track } from "../../../interfaces/actor";
import colormap from "colormap";
import { TrackColorRange } from "../../../features/gossip/pluginSettingsSlice";

export const rainbow = colormap<"rgba">({
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
  else if (type == "altitude") value = altitude;

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
  tracks: Track[],
  actors: Actor[],
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

  for (let j = 0; j < tracks.length; j++) {
    const id = tracks[j].id;
    for (let i = 1; i < tracks[j].track.length; i++) {
      const p = tracks[j].track[i - 1];
      const c = tracks[j].track[i];
      trackData.push({
        start: [p.lon, p.lat, p.alt ?? 10],
        end: [c.lon, c.lat, c.alt ?? 10],
        speed: c.speed,
        altitude: c.alt,
        actor: actors.find((a) => a.id == id),
        id: id,
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
