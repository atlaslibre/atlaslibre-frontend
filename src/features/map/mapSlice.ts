import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewState } from "react-map-gl/maplibre";

interface LayerVisiblityMap
{
  [key: string]: boolean
}

interface MapState {
  projection: "mercator" | "globe";
  layerVisiblity: LayerVisiblityMap ;
  viewState: ViewState;
}

const initialState: MapState = {
  projection: "mercator",
  layerVisiblity: {},
  viewState: {
    latitude: 56,
    longitude: 12,
    zoom: 5,
    bearing: 0,
    pitch: 0,
    padding: {
      right: 0
    }
  }
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    toggleProjection: (state) => {
      if (state.projection === "globe"){
        state.projection = "mercator";
      }
      else{
        state.projection = "globe";
        state.viewState.bearing = 0;
        state.viewState.pitch = 0;
      } 
    },
    showLayer: (state, layer: PayloadAction<string>) => {
      state.layerVisiblity[layer.payload] = true;
    },
    hideLayer: (state, layer: PayloadAction<string>) => {
      state.layerVisiblity[layer.payload] = false;
    },
    setViewState: (state, payload: PayloadAction<ViewState>) => {
      state.viewState = payload.payload;
    }
  },
});

export const { toggleProjection, showLayer, hideLayer, setViewState } = mapSlice.actions;

export default mapSlice.reducer;
