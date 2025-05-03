import actorScenegraphLayer from "./actorScenegraphLayer";
import {
  useActors,
  useAppDispatch,
  useAppSelector,
  useColorMode,
} from "../../../app/hooks";
import { LightingEffect } from "deck.gl";
import { _CameraLight, AmbientLight } from "@deck.gl/core";
import { Actor } from "../../../interfaces/actor";
import { setTooltip, clearTooltip } from "../../../features/map/tooltipSlice";
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
import actorTooltipLine from "./actorTooltipLine";
import { toggleTrack } from "../../../features/gossip/actorTrackingSlice";

export default function DeckGLLayers() {
  const { tracked } = useAppSelector((state) => state.actorTracking);
  const { trackedCoordinates } = useAppSelector((state) => state.tooltip);
  const { actors, tracks } = useActors();

  const { trackColorRange, scale } = useAppSelector(
    (state) => state.pluginSettings
  );

  const dispatch = useAppDispatch();
  const c = useColorMode();

  const allTracked = tracked.map((t) => t.id);

  const onHover = (actor?: Actor) => {
    if (actor) dispatch(setTooltip({ type: "actor", actor: actor }));
    else dispatch(clearTooltip("actor"));
  };

  const onClick = (actor?: Actor) => {
    if (!actor) return;
    dispatch(toggleTrack(actor));
  };

  const lightingEffect = new LightingEffect({
    ambientLight: new AmbientLight({
      color: [255, 255, 255],
      intensity: c(5, 2),
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
      { ...model, scale: model.scale * scale },
      actors.filter(filter),
      allTracked,
      onHover,
      onClick
    )
  );

  const trackLayer = actorTrackLayer(tracks, actors, trackColorRange);
  const tooltipLines = actorTooltipLine(trackedCoordinates, c("light", "dark"));

  return (
    <DeckGLOverlay
      layers={[trackLayer, ...scenegraphLayers, tooltipLines]}
      pickingRadius={10}
      interleaved={true}
      effects={[lightingEffect]}
    />
  );
}
