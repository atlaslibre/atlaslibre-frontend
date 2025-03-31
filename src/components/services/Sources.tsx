import { Source, StyleSpecification } from "react-map-gl/maplibre";

export const emptyMapStyle: StyleSpecification = {
  version: 8,
  sources: {},
  layers: [],
  glyphs: "https://tiles.basemaps.cartocdn.com/fonts/{fontstack}/{range}.pbf",
  sprite: "https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/sprite"
};

export default function () {
  return (
    <>
      <Source
        type="raster"
        minzoom={0}
        maxzoom={22}
        tiles={[
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ]}
        tileSize={256}
        attribution="ESRI &copy; <a href='http://www.esri.com'>ESRI</a>"
        id="ersi"
      />

      <Source
        type="raster"
        tiles={["https://tile.openstreetmap.org/{z}/{x}/{y}.png"]}
        tileSize={256}
        attribution="<a href='https://www.openstreetmap.org/copyright'>© OpenStreetMap</a>"
        id="osm"
      />

      <Source
        type="vector"
        url="https://tiles.basemaps.cartocdn.com/vector/carto.streets/v1/tiles.json"
        id="carto"
      />

      <Source
        type="vector"
        url="https://openinframap.org/map.json"
        id="openinframap"
      />
    </>
  );
}
