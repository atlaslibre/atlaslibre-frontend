import {
  Geoman,
  GlobalEventsListenerParameters,
} from "@geoman-io/maplibre-geoman-free";
import maplibregl, { MapLayerMouseEvent, MapLibreEvent } from "maplibre-gl";
import { addProtocols as addVectorTextProtocols } from "maplibre-gl-vector-text-protocol";
import { useEffect, useState } from "react";
import {
  Map,
  NavigationControl,
  ScaleControl,
  ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import { useAppDispatch, useAppSelector, useColorMode } from "../app/hooks";
import { saveActiveCustomMap } from "../features/map/customMapSlice";
import { geomanOptions, geomanSaveTriggers } from "../features/map/geoman";
import { setBounds, setViewState } from "../features/map/mapSlice";
import { emptyMapStyle } from "../features/map/mapStyle";
import { setLatLon } from "../features/map/tooltipSlice";
import InspectControl from "./controls/InspectControl";
import MeasureControl from "./controls/MeasureControl";
import TooltipControl from "./controls/TooltipControl";
import BaseLayers from "./layers/BaseLayers";
import BoundariesLayers from "./layers/BoundariesLayers";
import CustomMapLayers from "./layers/CustomMapLayers";
import LabelLayers from "./layers/LabelLayers";
import MeasureControlLayers from "./layers/MeasureControlLayers";
import OtherInfrastructureLayers from "./layers/OtherInfrastructureLayers";
import TransportInfrastructure from "./layers/TransportInfrastructure";
import UrbanLayers from "./layers/UrbanLayers";
import AirplaneShadowsLayers from "./layers/actors/AirplaneShadowsLayers";
import DeckGLLayers from "./layers/actors/DeckGLLayers";
import MainMapSources from "./services/Sources";
import TrackColorScaleControl from "./controls/TrackColorScaleControl";
import { toggleScreenshotMode } from "../features/flags/flagsSlice";
import TrackedTooltipControl from "./controls/TrackedTooltipControl";
import TimeControl from "./controls/TimeControl";

export default function MainMap() {
  const c = useColorMode();
  const dispatch = useAppDispatch();
  const [geoman, setGeoman] = useState<Geoman | undefined>(undefined);

  const { projection, viewState, unitSystem } = useAppSelector(
    (state) => state.map
  );

  const { customAttribution } = useAppSelector((state) => state.gossip);

  const { activeCustomMap } = useAppSelector((state) => state.customMap);
  const { debuggingEnabled, screenshotMode } = useAppSelector(
    (state) => state.flags
  );

  function onLoad(evt: MapLibreEvent) {
    const geoman = new Geoman(evt.target, geomanOptions);
    setGeoman(geoman);
    geoman.setGlobalEventsListener(
      ({ type, name }: GlobalEventsListenerParameters) => {
        if (!geoman) return;
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

  const onMove = (evt: ViewStateChangeEvent) => {
    dispatch(setViewState(evt.viewState));
    dispatch(setBounds(evt.target.getBounds().toArray()));
  };

  function onMouseMove(evt: MapLayerMouseEvent) {
    dispatch(setLatLon({ lat: evt.lngLat.lat, lon: evt.lngLat.lng }));
  }

  const onClick = () => {
    if (screenshotMode) dispatch(toggleScreenshotMode());
  };

  // add support for TopoJSON etc
  useEffect(() => {
    addVectorTextProtocols(maplibregl);
  });

  useEffect(() => {
    if (geoman?.control.container) {
      geoman.control.container.style.display = screenshotMode
        ? "none"
        : "block";
    }
  }, [screenshotMode, geoman]);

  const screenshotHiddenStyle = screenshotMode
    ? { display: "none" }
    : { display: "block" };

  useEffect(() => {}, [customAttribution]);

  return (
    <div
      className="w-full h-full"
      style={{ padding: screenshotMode ? "20px" : "0px" }}
    >
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
        onClick={onClick}
        attributionControl={{ compact: false }}
      >
        <TimeControl position="top-right" />
        <NavigationControl position="top-left" style={screenshotHiddenStyle} />
        <MeasureControl />
        {debuggingEnabled && !screenshotMode && (
          <InspectControl position="top-left" />
        )}
        <TooltipControl position="bottom-right" style={screenshotHiddenStyle} />
        <TrackColorScaleControl position="bottom-left" />
        <ScaleControl
          unit={unitSystem}
          style={{ borderColor: c("#333", "#fff") }}
        />
        <TrackedTooltipControl />
        <MainMapSources />
        <BaseLayers />
        <BoundariesLayers />
        <UrbanLayers />
        <TransportInfrastructure />
        <OtherInfrastructureLayers />
        <AirplaneShadowsLayers />
        <DeckGLLayers />
        <LabelLayers />
        <CustomMapLayers />
        <MeasureControlLayers />
      </Map>
    </div>
  );
}
