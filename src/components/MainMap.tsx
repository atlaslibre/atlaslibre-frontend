import {
  Geoman,
  GlobalEventsListenerParameters,
} from "@geoman-io/maplibre-geoman-free";
import maplibregl, { MapLayerMouseEvent, MapLibreEvent } from "maplibre-gl";
import { addProtocols as addVectorTextProtocols } from "maplibre-gl-vector-text-protocol";
import { useEffect } from "react";
import {
  Map,
  NavigationControl,
  ScaleControl,
  ViewStateChangeEvent,
} from "react-map-gl/maplibre";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { saveActiveCustomMap } from "../features/map/customMapSlice";
import { geomanOptions, geomanSaveTriggers } from "../features/map/geoman";
import { setBounds, setViewState } from "../features/map/mapSlice";
import { emptyMapStyle } from "../features/map/mapStyle";
import { setLatLon } from "../features/map/tooltipSlice";
import InspectControl from "./controls/InspectControl";
import TooltipControl from "./controls/TooltipControl";
import BaseLayers from "./layers/BaseLayers";
import BoundariesLayers from "./layers/BoundariesLayers";
import DeckGLLayers from "./layers/DeckGLLayers";
import LabelLayers from "./layers/LabelLayers";
import OtherInfrastructureLayers from "./layers/OtherInfrastructureLayers";
import TransportInfrastructure from "./layers/TransportInfrastructure";
import UrbanLayers from "./layers/UrbanLayers";
import MainMapSources from "./services/Sources";
import CustomMapLayers from "./layers/CustomMapLayers";
import MeasureControl from "./controls/MeasureControl";
import MeasureControlLayers from "./layers/MeasureControlLayers";

export default function MainMap() {
  const dispatch = useAppDispatch();

  const { projection, viewState, unitSystem } = useAppSelector(
    (state) => state.map
  );

  const { activeCustomMap } = useAppSelector((state) => state.customMap);
  const { debuggingEnabled } = useAppSelector((state) => state.flags);

  const onMove = (evt: ViewStateChangeEvent) => {
    dispatch(setViewState(evt.viewState));
    dispatch(setBounds(evt.target.getBounds().toArray()));
  };

  function onLoad(evt: MapLibreEvent) {
    const geoman = new Geoman(evt.target, geomanOptions);
    geoman.setGlobalEventsListener(
      ({ type, name }: GlobalEventsListenerParameters) => {
        if (type == "converted") {
          // import and export based on events fired
          if (geomanSaveTriggers.find((t) => t == name)) {
            // if the helper mode is activated, the shape markers is visible and get
            // accententially exported when running exportGeoJson()
            const isEditing = geoman
              .getActiveHelperModes()
              .includes("shape_markers");

            if (!isEditing)
              dispatch(saveActiveCustomMap(geoman.features.exportGeoJson()));
          }
          if (name == "gm:loaded")
            geoman.features.importGeoJson(activeCustomMap);
        }
      }
    );
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
        onMouseMove={onMouseMove}
        attributionControl={{ compact: false }}
      >
        <NavigationControl position="top-left" />
        <MeasureControl />
        {debuggingEnabled && <InspectControl position="top-left" />}
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
        <CustomMapLayers />
        <MeasureControlLayers />
      </Map>
    </div>
  );
}
