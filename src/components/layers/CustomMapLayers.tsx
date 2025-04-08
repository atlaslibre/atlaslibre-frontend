import { useAppSelector } from "../../app/hooks";
import { Layer, Source } from "react-map-gl/maplibre";
import { regularFonts } from "../../features/map/fonts";

export default function CustomMapLayers() {
  const { inactiveCustomMap } = useAppSelector((state) => state.customMap);

  return (
    <>
      {inactiveCustomMap.map((customMap, index) => (
        <Source
          key={`custom-map-${index}`}
          type="geojson"
          data={customMap.geoJson}
        >
          <Layer
            type="fill"
            id={`custom-map-${index}-fill`}
            paint={{
              "fill-opacity": 0.2,
              "fill-color": customMap.color,
            }}
            layout={{
              visibility: customMap.visible ? "visible" : "none",
            }}
            filter={["!=", "shape", "line"]}
          />

          <Layer
            type="line"
            id={`custom-map-${index}-line`}
            paint={{
              "line-opacity": 0.5,
              "line-color": customMap.color,
            }}
            layout={{
              visibility: customMap.visible ? "visible" : "none",
            }}
          />

          <Layer
            type="circle"
            id={`custom-map-${index}-circle`}
            paint={{
              "circle-opacity": 0.2,
              "circle-radius": 10,
              "circle-color": customMap.color,
              "circle-stroke-width": 1,
              "circle-stroke-color": customMap.color,
              "circle-stroke-opacity": 0.5,
            }}
            layout={{
              visibility: customMap.visible ? "visible" : "none",
            }}
            filter={["==", "shape", "circle_marker"]}
          />

          <Layer
            type="circle"
            id={`custom-map-${index}-marker`}
            paint={{
              "circle-opacity": 0.2,
              "circle-radius": 3,
              "circle-color": customMap.color,
              "circle-stroke-width": 1,
              "circle-stroke-color": customMap.color,
              "circle-stroke-opacity": 0.5,
            }}
            layout={{
              visibility: customMap.visible ? "visible" : "none",
            }}
            filter={["==", "shape", "marker"]}
          />

          <Layer
            type="symbol"
            id={`custom-map-${index}-text`}
            layout={{
              "text-field": "{text}",
              "text-size": 20,
              "text-font": regularFonts,
              visibility: customMap.visible ? "visible" : "none",
            }}
            paint={{
              "text-color": customMap.color,
            }}
            filter={["==", "shape", "text_marker"]}
          />
        </Source>
      ))}
    </>
  );
}
