import { useAppDispatch, useAppSelector } from "../app/hooks";

import "maplibre-gl/dist/maplibre-gl.css";

import {
  Map,
  NavigationControl,
  ScaleControl,
  ViewStateChangeEvent,
} from "react-map-gl/maplibre";

import { useCallback } from "react";
import { setViewState } from "../features/map/mapSlice";
import DeckGLLayers from "./layers/DeckGLLayers";
import OtherInfrastructureLayers from "./layers/OtherInfrastructureLayers";
import BaseLayers from "./layers/BaseLayers";
import MainMapSources, { emptyMapStyle } from "./services/Sources";
import LabelLayers from "./layers/LabelLayers";
import BoundariesLayers from "./layers/BoundariesLayers";
import UrbanLayers from "./layers/UrbanLayers";
import TransportInfrastructure from "./layers/TransportInfrastructure";

export default function MainMap() {
  const dispatch = useAppDispatch();
  const { projection, viewState } = useAppSelector((state) => state.map);

  const onMove = useCallback((evt: ViewStateChangeEvent) => {
    dispatch(setViewState(evt.viewState));
  }, []);

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
      >
        <NavigationControl position="top-left" />
        <ScaleControl />
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
