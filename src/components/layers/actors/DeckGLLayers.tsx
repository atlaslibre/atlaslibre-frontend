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
import { Layer, Source } from "react-map-gl/maplibre";

export default function DeckGLLayers() {
  const { actors, tracks, tracked } = useAppSelector((state) => state.gossip);
  const { plugins } = useAppSelector((state) => state.plugin);
  const { trackColorRange, scale } = useAppSelector(
    (state) => state.pluginSettings
  );

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

  const layerConfig: [(a: Actor) => boolean, ModelParams, number][] = [
    [(a) => a.type == "aircraft", jetModel, scale["aircraft"]],
    [
      (a) => a.type == "ship" && a.class == "navigation",
      buoyModel,
      scale["ship"],
    ],
    [
      (a) => a.type == "ship" && a.class == "tanker",
      tankerModel,
      scale["ship"],
    ],
    [(a) => a.type == "ship" && a.class == "cargo", cargoModel, scale["ship"]],
    [
      (a) => a.type == "ship" && a.class == "container",
      containerModel,
      scale["ship"],
    ],
    [
      (a) => a.type == "ship" && a.class == "recreational",
      recreationalModel,
      scale["ship"],
    ],
    [(a) => a.type == "ship" && a.class == "ferry", ferryModel, scale["ship"]],
    [
      (a) => a.type == "ship" && a.class == "highspeed",
      highspeedModel,
      scale["ship"],
    ],
    [
      (a) => a.type == "ship" && a.class == "military",
      militaryModel,
      scale["ship"],
    ],
    [
      (a) => a.type == "ship" && a.class == "special",
      specialModel,
      scale["ship"],
    ],
    [
      (a) => a.type == "ship" && (a.class == "fishing" || a.class == "other"),
      duckModel,
      scale["ship"],
    ],
  ];

  const scenegraphLayers = layerConfig.map(([filter, model, scale]) =>
    actorScenegraphLayer(
      {...model, scale: model.scale * scale},
      allActors.filter(filter),
      allTracked,
      onHover,
      onClick
    )
  );

  const trackLayer = actorTrackLayer(allTracks, allActors, trackColorRange);

  const attributions = [];
  for (let i = 0; i < plugins.length; i++) {
    const attribution = plugins[i].attribution;

    if (attribution == undefined) continue;

    // show only active plugins as attributions
    if (actors[plugins[i].id] && actors[plugins[i].id].length > 0) {
      attributions.push(attribution);
    }
  }

  return (
    <>
      <Source
        id="attribution-source"
        type="geojson"
        data={{ type: "FeatureCollection", features: [] }}
        attribution={attributions.join(", ")}
      >
        <Layer type="line" id="attribution-source-force-show" />
      </Source>
      <DeckGLOverlay
        layers={[trackLayer, ...scenegraphLayers]}
        pickingRadius={10}
        interleaved={true}
        effects={[lightingEffect]}
      />
    </>
  );
}
