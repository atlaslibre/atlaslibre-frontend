import ToggleableLayer from "./shared/ToggleableLayer";

export default function LandUseLayers() {
  return (
    <>
      <ToggleableLayer
        type="fill"
        id="landuse_military"
        source-layer="landuse"
        source="carto"
        minzoom={6}
        paint={{
          "fill-color": "#A6192E",
          "fill-opacity": 0.5,
        }}
        filter={["==", "class", "military"]}
      />
      <ToggleableLayer
        type="fill"
        id="landuse_industrial"
        source-layer="landuse"
        source="carto"
        minzoom={6}
        paint={{
          "fill-color": "#ffa500",
          "fill-opacity": 0.5,
        }}
        filter={["==", "class", "industrial"]}
      />
      <ToggleableLayer
        type="fill"
        id="landcover_farmland"
        source-layer="landcover"
        source="carto"
        minzoom={6}
        paint={{
          "fill-color": "#725438",
          "fill-opacity": 0.5,
        }}
        filter={["==", "class", "farmland"]}
      />
      <ToggleableLayer
        type="fill"
        id="landcover_wood"
        source-layer="landcover"
        source="carto"
        paint={{
          "fill-color": "#228c22",
          "fill-opacity": 0.5,
        }}
        filter={["==", "class", "wood"]}
      />
    </>
  );
}
