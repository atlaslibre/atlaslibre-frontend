import { StyleSpecification } from "maplibre-gl";

export const emptyMapStyle: StyleSpecification = {
  version: 8,
  sources: {},
  layers: [],
  glyphs: "https://tiles.basemaps.cartocdn.com/fonts/{fontstack}/{range}.pbf",
  sprite: "https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/sprite"
};