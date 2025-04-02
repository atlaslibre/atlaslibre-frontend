import { useAppDispatch, useAppSelector } from "../app/hooks";

import maplibregl, { MapLayerMouseEvent, MapLibreEvent } from "maplibre-gl";

import {
  Map,
  NavigationControl,
  ScaleControl,
  ViewStateChangeEvent,
} from "react-map-gl/maplibre";

import { useCallback, useEffect } from "react";
import { setViewState } from "../features/map/mapSlice";
import DeckGLLayers from "./layers/DeckGLLayers";
import OtherInfrastructureLayers from "./layers/OtherInfrastructureLayers";
import BaseLayers from "./layers/BaseLayers";
import MainMapSources from "./services/Sources";
import LabelLayers from "./layers/LabelLayers";
import BoundariesLayers from "./layers/BoundariesLayers";
import UrbanLayers from "./layers/UrbanLayers";
import TransportInfrastructure from "./layers/TransportInfrastructure";
import { emptyMapStyle } from "../features/map/mapStyle";

import { addProtocols as addVectorTextProtocols } from "maplibre-gl-vector-text-protocol";

import {
  Geoman,
  GlobalEventsListenerParameters,
} from "@geoman-io/maplibre-geoman-free";
import { geomanOptions, geomanSaveTriggers } from "../features/map/geoman";
import { saveActiveCustomMap } from "../features/map/customMapSlice";
import TooltipControl from "./controls/TooltipControl";
import { setLatLon } from "../features/map/tooltipSlice";

export default function MainMap() {
  const dispatch = useAppDispatch();

  const { projection, viewState, unitSystem } = useAppSelector(
    (state) => state.map
  );

  const { activeCustomMap } = useAppSelector((state) => state.customMap);

  const onMove = useCallback(
    (evt: ViewStateChangeEvent) => {
      dispatch(setViewState(evt.viewState));
    },
    [dispatch]
  );

  function onLoad(evt: MapLibreEvent) {
    const geoman = new Geoman(evt.target, geomanOptions);
    geoman.setGlobalEventsListener(
      ({ type, name }: GlobalEventsListenerParameters) => {
        if (type == "converted") {
          // import and export based on events fired
          if (geomanSaveTriggers.find((t) => t == name)) {
            dispatch(saveActiveCustomMap(geoman.features.exportGeoJson()));
          }
          if (name == "gm:loaded")
            geoman.features.importGeoJson(activeCustomMap);
        }
      }
    );
  }

  function onClick(evt: MapLayerMouseEvent) {
    console.log("MainMap onclick", evt);
  }

  function onMouseMove(evt: MapLayerMouseEvent) {
    dispatch(setLatLon({ lat: evt.lngLat.lat, lon: evt.lngLat.lng }));
  }

  // add support for TopoJSON etc
  useEffect(() => {
    addVectorTextProtocols(maplibregl);
  });

  return (
    <div className="w-full h-screen">
      <Map
        {...viewState}
        onMove={onMove}
        projection={projection}
        maxPitch={projection === "globe" ? 0 : 60}
        dragRotate={projection !== "globe"}
        touchZoomRotate={projection !== "globe"}
        keyboard={projection !== "globe"}
        mapStyle={emptyMapStyle}
        onLoad={onLoad}
        onClick={onClick}
        onMouseMove={onMouseMove}
        attributionControl={{ compact: false }}
      >
        <NavigationControl position="top-left" />
        <TooltipControl position="bottom-right" />
        <ScaleControl unit={unitSystem} />
        <MainMapSources />

        <BaseLayers />
        <BoundariesLayers />
        <UrbanLayers />
        <TransportInfrastructure />
        <OtherInfrastructureLayers />
        <DeckGLLayers />
        <LabelLayers />
      </Map>
    </div>
  );
}
