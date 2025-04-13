import actorScenegraphLayer from "./actorScenegraphLayer";
import {
  useAppDispatch,
  useAppSelector,
  useColorMode,
} from "../../../app/hooks";
import { LightingEffect } from "deck.gl";
import { _CameraLight, AmbientLight } from "@deck.gl/core";
import { Actor } from "../../../interfaces/actor";
import { setTooltip, clearTooltip } from "../../../features/map/tooltipSlice";
import { toggleTrack } from "../../../features/gossip/gossipSlice";
import {
  buoyModel,
  cargoModel,
  containerModel,
  duckModel,
  ferryModel,
  highspeedModel,
  jetModel,
  militaryModel,
  ModelParams,
  recreationalModel,
  specialModel,
  tankerModel,
} from "../../../features/gossip/models";
import DeckGLOverlay from "./DeckGLOverlay";
import actorTrackLayer from "./actorTrackLayer";

export default function DeckGLLayers() {
  const { actors, tracks, tracked } = useAppSelector((state) => state.gossip);
  const dispatch = useAppDispatch();
  const c = useColorMode();

  const allActors = Object.values(actors).flat();
  const allTracks = Object.values(tracks).flat();
  const allTracked = Object.values(tracked).flat();

  const onHover = (actor?: Actor) => {
    if (actor) dispatch(setTooltip({ type: "actor", actor: actor }));
    else dispatch(clearTooltip("actor"));
  };

  const onClick = (actor?: Actor) => {
    if (!actor) return;

    const plugins = Object.keys(actors);
    for (let i = 0; i < plugins.length; i++) {
      const found = actors[plugins[i]].find((a) => a.id == actor.id);

      if (found) {
        dispatch(toggleTrack({ plugin: plugins[i], actor: found }));
        return;
      }
    }
  };

  const lightingEffect = new LightingEffect({
    ambientLight: new AmbientLight({
      color: [255, 255, 255],
      intensity: c(5, 1),
    }),
    cameraLight: new _CameraLight({
      color: [255, 255, 255],
      intensity: c(2, 1),
    }),
  });

  const layerConfig: [(a: Actor) => boolean, ModelParams][] = [
    [(a) => a.type == "aircraft", jetModel],
    [(a) => a.type == "ship" && a.class == "navigation", buoyModel],
    [(a) => a.type == "ship" && a.class == "tanker", tankerModel],
    [(a) => a.type == "ship" && a.class == "cargo", cargoModel],
    [(a) => a.type == "ship" && a.class == "container", containerModel],
    [(a) => a.type == "ship" && a.class == "recreational", recreationalModel],
    [(a) => a.type == "ship" && a.class == "ferry", ferryModel],
    [(a) => a.type == "ship" && a.class == "highspeed", highspeedModel],
    [(a) => a.type == "ship" && a.class == "military", militaryModel],
    [(a) => a.type == "ship" && a.class == "special", specialModel],
    [
      (a) => a.type == "ship" && (a.class == "fishing" || a.class == "other"),
      duckModel,
    ],
  ];

  const scenegraphLayers = layerConfig.map(([filter, model]) =>
    actorScenegraphLayer(
      model,
      allActors.filter(filter),
      allTracked,
      onHover,
      onClick
    )
  );

  const trackLayer = actorTrackLayer(allTracks);

  return (
    <>
      <DeckGLOverlay
        layers={[trackLayer, ...scenegraphLayers]}
        pickingRadius={10}
        interleaved={false}
        effects={[lightingEffect]}
      />
    </>
  );
}
