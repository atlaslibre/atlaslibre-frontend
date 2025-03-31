import { useControl } from "react-map-gl/maplibre";

import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox";

import gossipLayer from "./3d/gossipLayer";
import { useAppSelector } from "../../app/hooks";

function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function DeckGLLayers() {
  const actors = useAppSelector((state) => state.gossip.actors);

  const aircraft = gossipLayer(
    actors.filter((s) => s.type == "aircraft"),
    "airplane.glb",
    25,
    0.1,
    3
  );

  const navigation = gossipLayer(
    actors.filter((s) => s.type == "ship" && s.class == "navigation"),
    "buoy.glb"
  );
  const tankers = gossipLayer(
    actors.filter((s) => s.type == "ship" && s.class == "tanker"),
    "tanker.glb",
    15,
    0.1,
    1
  );
  const cargo = gossipLayer(
    actors.filter((s) => s.type == "ship" && s.class == "cargo"),
    "cargo.glb",
    15,
    0.1,
    1
  );
  const container = gossipLayer(
    actors.filter((s) => s.type == "ship" && s.class == "container"),
    "container.glb",
    15,
    0.1,
    1
  );
  const military = gossipLayer(
    actors.filter((s) => s.type == "ship" && s.class == "military"),
    "military.glb",
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
      (s) =>
        s.type == "ship" &&
        s.class != "navigation" &&
        s.class != "tanker" &&
        s.class != "cargo" &&
        s.class != "container" &&
        s.class != "military"
    ),
    "duck.glb"
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
      interleaved={true}
    />
  );
}
