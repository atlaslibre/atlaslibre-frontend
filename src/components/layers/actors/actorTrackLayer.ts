import { LineLayer } from "deck.gl";
import { Track } from "../../../interfaces/actor";

export default function actorTrackLayer(allTracks: Track[]){

    type TrackSegment = {
        start: [longitude: number, latitude: number, altitude: number];
        end: [longitude: number, latitude: number, altitude: number];
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
        getColor: (_d) => {
          return [200, 0, 200];
        },
        getWidth: 2,
      });


      return actorPaths;
}