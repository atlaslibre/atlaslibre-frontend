import { Source } from "react-map-gl/maplibre";
import gossipLayer from "./gossipLayer";
import { useAppDispatch, useAppSelector, useColorMode } from "../../../app/hooks";
import { LightingEffect, LineLayer } from "deck.gl";
import { _CameraLight, AmbientLight } from "@deck.gl/core";
import { Actor } from "../../../interfaces/actor";
import { setTooltip, clearTooltip } from "../../../features/map/tooltipSlice";
import { toggleTrack } from "../../../features/gossip/gossipSlice";
import { FeatureCollection } from "geojson";
import DeckGLOverlay from "./DeckGLOverlay";

// TODO this file is a royal mess, clean up :)

export default function DeckGLLayers() {
  const { actors, tracks, tracked } = useAppSelector((state) => state.gossip);
  const dispatch = useAppDispatch();
  const c = useColorMode();

  const onHover = (actor?: Actor) => {
    if (actor) dispatch(setTooltip({ type: "actor", actor: actor }));
    else dispatch(clearTooltip("actor"));
  };

  const onClick = (actor?: Actor) => {
    if (!actor) return;

    const plugins = Object.keys(actors);
    for (let i = 0; i < plugins.length; ) {
      const found = actors[plugins[i]].find((a) => a.id == actor.id);

      if (found) {
        dispatch(toggleTrack({ plugin: plugins[i], actor: found }));
        return;
      }
    }
  };

  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: c(5, 1),
  });

  const cameraLight = new _CameraLight({
    color: [255, 255, 255],
    intensity: c(2, 1),
  });

  const lightingEffect = new LightingEffect({ ambientLight, cameraLight });

  const allActors = Object.values(actors).flat();
  const allTracks = Object.values(tracks).flat();
  const allTracked = Object.values(tracked).flat();

  const aircraft = gossipLayer(
    allActors.filter((s: Actor) => s.type == "aircraft"),
    allTracked,
    "jet.glb",
    onHover,
    onClick,
    1000,
    1.5,
    3,
    180
  );

  type FlightPath = {
    start: [longitude: number, latitude: number, altitude: number];
    end: [longitude: number, latitude: number, altitude: number];
    id: string;
  };

  const tracksFeatures: FeatureCollection = {
    type: "FeatureCollection",
    features: allTracks.filter(t => allActors.find(a => a.id == t.id)?.type === "aircraft" ).map((t) => {
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

  for (let i = 0; i < allTracked.length; i++) {
    const found = allActors.find((s) => s.id == allTracked[i]);
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

  const lineLayerData: FlightPath[] = [];
  for (let j = 0; j < allTracks.length; j++) {
    for (let i = 1; i < allTracks[j].track.length; i++) {
      const p = allTracks[j].track[i - 1];
      const c = allTracks[j].track[i];
      lineLayerData.push({
        start: [p.lon, p.lat, p.alt ?? 10],
        end: [c.lon, c.lat, c.alt ?? 10],
        id: allTracks[j].id,
      } as FlightPath);
    }
  }

  const actorPaths = new LineLayer<FlightPath>({
    id: "actor-paths",
    data: lineLayerData,
    opacity: 0.4,
    getSourcePosition: (d) => d.start,
    getTargetPosition: (d) => d.end,
    getColor: (_d) => {
      return [200, 0, 200];
    },
    getWidth: 2,
  });

  const navigation = gossipLayer(
    allActors.filter((s: Actor) => s.type == "ship" && s.class == "navigation"),
    allTracked,
    "buoy.glb",
    onHover,
    onClick,
    100,
    1.75,
    10,
    180
  );

  const tankers = gossipLayer(
    allActors.filter((s: Actor) => s.type == "ship" && s.class == "tanker"),
    allTracked,
    "tanker.glb",
    onHover,
    onClick,
    15,
    0.1,
    1,
    180
  );
  const cargo = gossipLayer(
    allActors.filter((s: Actor) => s.type == "ship" && s.class == "cargo"),
    allTracked,
    "cargo.glb",
    onHover,
    onClick,
    15,
    0.1,
    1,
    180
  );
  const container = gossipLayer(
    allActors.filter((s: Actor) => s.type == "ship" && s.class == "container"),
    allTracked,
    "container.glb",
    onHover,
    onClick,
    15,
    0.1,
    1,
    180
  );
  const military = gossipLayer(
    allActors.filter((s: Actor) => s.type == "ship" && s.class == "military"),
    allTracked,
    "military.glb",
    onHover,
    onClick,
    15,
    0.1,
    1,
    180
  );

  const recreational = gossipLayer(
    allActors.filter(
      (s: Actor) => s.type == "ship" && s.class == "recreational"
    ),
    allTracked,
    "sailboat.glb",
    onHover,
    onClick,
    30,
    0.1,
    1,
    180
  );

  const ferry = gossipLayer(
    allActors.filter((s: Actor) => s.type == "ship" && s.class == "ferry"),
    allTracked,
    "ferry.glb",
    onHover,
    onClick,
    15,
    0.1,
    1,
    180
  );

  const highspeed = gossipLayer(
    allActors.filter((s: Actor) => s.type == "ship" && s.class == "highspeed"),
    allTracked,
    "highspeed.glb",
    onHover,
    onClick,
    30,
    0.1,
    1,
    180
  );

  const special = gossipLayer(
    allActors.filter((s: Actor) => s.type == "ship" && s.class == "special"),
    allTracked,
    "special.glb",
    onHover,
    onClick,
    20,
    0.1,
    1,
    180
  );

  /*
  other
  fishing
    */

  const ships = gossipLayer(
    allActors.filter(
      (s: Actor) =>
        s.type == "ship" && (s.class == "fishing" || s.class == "other")
    ),
    allTracked,
    "duck.glb",
    onHover,
    onClick
  );

  return (
    <>
      <Source type="geojson" data={tracksFeatures} id="actor-track" />
      <DeckGLOverlay
        layers={[
          actorPaths,
          aircraft,
          navigation,
          tankers,
          cargo,
          container,
          military,
          special, 
          highspeed,
          ferry,
          recreational,
          ships,
        ]}
        pickingRadius={10}
        interleaved={false}
        effects={[lightingEffect]}
      />
    </>
  );
}
