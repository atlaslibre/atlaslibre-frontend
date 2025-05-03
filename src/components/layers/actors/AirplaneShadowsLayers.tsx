import { Layer, Source } from "react-map-gl/maplibre";
import { useActors, useAppSelector, useColorMode } from "../../../app/hooks";
import { FeatureCollection } from "geojson";

export default function AirplaneShadowsLayers() {
  const { viewState } = useAppSelector((state) => state.map);
  const { tracked } = useAppSelector((state) => state.gossip);
  const { actors, tracks } = useActors();

  const c = useColorMode();

  const planeActors = actors.filter((a) => a.type == "aircraft");

  const planeTracks = tracks.filter((t) =>
    planeActors.find((a) => a.id == t.id)
  );

  const trackedPlaneIds = tracked
    .map((t) => t.id)
    .filter((id) => planeActors.find((a) => a.id == id));

  // shadow under the line
  const tracksFeatures: FeatureCollection = {
    type: "FeatureCollection",
    features: planeTracks.map((t) => {
      return {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: t.track.map((r) => [r.lon, r.lat]),
        },
        properties: {},
      };
    }),
  };

  // shadow under plane at current position
  for (let i = 0; i < trackedPlaneIds.length; i++) {
    const found = planeActors.find((s) => s.id == trackedPlaneIds[i]);
    if (found && found.type === "aircraft") {
      tracksFeatures.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [found.pos.lon, found.pos.lat],
        },
        properties: {
          type: "current_position",
        },
      });
    }
  }

  return (
    <Source type="geojson" data={tracksFeatures}>
      <Layer
        type="line"
        id="actor-track-line-shadow"
        paint={{
          "line-width": 5,
          "line-color": c("#666", "#000"),
          "line-opacity": viewState.pitch > 0 ? 0.5 : 0,
          "line-blur": 4,
        }}
      />

      <Layer
        type="circle"
        id="actor-track-current-shadow"
        paint={{
          "circle-color": c("#666", "#000"),
          "circle-blur": 0.3,
          "circle-opacity": viewState.pitch > 0 ? 0.4 : 0,
          "circle-radius": {
            type: "exponential",
            stops: [
              [2, 2],
              [9, 15],
            ],
          },
          "circle-pitch-scale": "map",
          "circle-pitch-alignment": "map",
        }}
        filter={["==", "type", "current_position"]}
      />
    </Source>
  );
}
