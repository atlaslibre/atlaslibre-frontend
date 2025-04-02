import { useControl } from "react-map-gl/maplibre";

import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox";

import gossipLayer from "./3d/gossipLayer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LightingEffect } from "deck.gl";
import { _CameraLight, AmbientLight } from "@deck.gl/core";
import { useMediaQuery } from "@mui/material";
import { IActor } from "../../interfaces/schemas";
import { setTooltip, clearTooltip } from "../../features/map/tooltipSlice";

function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function DeckGLLayers() {
  const actors = useAppSelector((state) => state.gossip.actors);
  const { colorMode } = useAppSelector((state) => state.flags);
  const dispatch = useAppDispatch();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  function c<T>(light: T, dark: T): T {
    if (colorMode == "system") return prefersDarkMode ? dark : light;
    return colorMode == "light" ? light : dark;
  }

  const onHover = (actor?: IActor) => {
    if (actor) dispatch(setTooltip({ type: "actor", actor: actor }));
    else dispatch(clearTooltip("actor"));
  };

  const onClick = (actor?: IActor) => {
    if (actor) dispatch(setTooltip({ type: "activeActor", actor: actor }));
    else dispatch(clearTooltip("activeActor"));
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

  const aircraft = gossipLayer(
    actors.filter((s: IActor) => s.type == "aircraft"),
    "airplane.glb",
    onHover,
    onClick,
    25,
    0.1,
    3
  );

  const navigation = gossipLayer(
    actors.filter((s: IActor) => s.type == "ship" && s.class == "navigation"),
    "buoy.glb",
    onHover,
    onClick
  );
  const tankers = gossipLayer(
    actors.filter((s: IActor) => s.type == "ship" && s.class == "tanker"),
    "tanker.glb",
    onHover,
    onClick,
    15,
    0.1,
    1
  );
  const cargo = gossipLayer(
    actors.filter((s: IActor) => s.type == "ship" && s.class == "cargo"),
    "cargo.glb",
    onHover,
    onClick,
    15,
    0.1,
    1
  );
  const container = gossipLayer(
    actors.filter((s: IActor) => s.type == "ship" && s.class == "container"),
    "container.glb",
    onHover,
    onClick,
    15,
    0.1,
    1
  );
  const military = gossipLayer(
    actors.filter((s: IActor) => s.type == "ship" && s.class == "military"),
    "military.glb",
    onHover,
    onClick,
    15,
    0.1,
    1
  );

  /*
  other
  fishing
  special
  highspeed
  ferry
  recreational
  */

  const ships = gossipLayer(
    actors.filter(
      (s: IActor) =>
        s.type == "ship" &&
        s.class != "navigation" &&
        s.class != "tanker" &&
        s.class != "cargo" &&
        s.class != "container" &&
        s.class != "military"
    ),
    "duck.glb",
    onHover,
    onClick
  );

  return (
    <DeckGLOverlay
      layers={[
        aircraft,
        navigation,
        tankers,
        cargo,
        container,
        military,
        ships,
      ]}
      pickingRadius={10}
      interleaved={true}
      effects={[lightingEffect]}
      getCursor={(state) => state.isHovering ?  "crosshair" : "grab"}
    />
  );
}
