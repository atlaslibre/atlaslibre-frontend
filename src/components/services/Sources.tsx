import { Layer, Source } from "react-map-gl/maplibre";
import { useActors } from "../../app/hooks";
import { uniqueFilter } from "../../util/array";
import { hash } from "../../util/string";

export default function Sources() {
  const { attributions } = useActors();

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
        attribution="&copy; <a href='http://www.esri.com'>ESRI</a>"
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
        type="raster"
        tiles={["https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"]}
        tileSize={256}
        attribution="<a href='https://www.openstreetmap.org/copyright'>© OpenStreetMap</a>"
        id="osm-sea"
      />

      <Source
        type="vector"
        url="https://tiles.basemaps.cartocdn.com/vector/carto.streets/v1/tiles.json"
        id="carto"
      />

      <Source
        type="vector"
        tiles={["https://openinframap.org/map/power/{z}/{x}/{y}.pbf"]}
        id="openinframap_power"
        attribution='© <a href="https://openinframap.org/copyright">Open Infrastructure Map</a>'
      />

      <Source
        type="vector"
        tiles={["https://openinframap.org/map/petroleum/{z}/{x}/{y}.pbf"]}
        id="openinframap_petroleum"
        attribution='© <a href="https://openinframap.org/copyright">Open Infrastructure Map</a>'
      />

      <Source
        type="vector"
        tiles={["https://openinframap.org/map/telecoms/{z}/{x}/{y}.pbf"]}
        id="openinframap_telecom"
        attribution='© <a href="https://openinframap.org/copyright">Open Infrastructure Map</a>'
      />

      <Source
        type="vector"
        tiles={["https://openinframap.org/map/water/{z}/{x}/{y}.pbf"]}
        id="openinframap_water"
        attribution='© <a href="https://openinframap.org/copyright">Open Infrastructure Map</a>'
      />

      <Source
        type="geojson"
        data="topojson://./datasets/timezones.topo.json"
        id="timezones"
      />

      {attributions.filter(uniqueFilter).map((attribution) => {
        const id = hash(attribution);
        return (
          <Source
            type="geojson"
            data={{ type: "FeatureCollection", features: [] }}
            attribution={attribution}
            key={`attribution-source-${id}`}
            id={`attribution-source-${id}`}
          >
            <Layer type="line" id={`attribution-layer-${id}`}></Layer>
          </Source>
        );
      })}
    </>
  );
}
