import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewState } from "react-map-gl/maplibre";
import dayjs, { Dayjs } from "dayjs";
import { createTransform, Transform } from "redux-persist";

interface LayerVisiblityMap {
  [key: string]: boolean;
}

interface MapState {
  projection: "mercator" | "globe";
  layerVisiblity: LayerVisiblityMap;
  viewState: ViewState;
  unitSystem: "metric" | "nautical" | "imperial";
  bounds: [number, number][];
  fixedTime?: Dayjs;
  timezoneType: string;
  mapTimezone: string;
}

const initialState: MapState = {
  projection: "mercator",
  unitSystem: "metric",
  layerVisiblity: {},
  viewState: {
    latitude: 56,
    longitude: 12,
    zoom: 5,
    bearing: 0,
    pitch: 0,
    padding: {
      right: 0,
    },
  },
  bounds: [],
  fixedTime: undefined,
  mapTimezone: "Europe/Paris",
  timezoneType: "map",
};

type InboundState = { fixedTime?: Dayjs };
type OutboundState = { fixedTime?: Dayjs };

export const mapSliceTransform: Transform<InboundState, OutboundState> = createTransform(
  (inboundState) => ({
    ...inboundState,
  }),
  (outboundState) => ({
    ...outboundState,
    fixedTime: outboundState.fixedTime
      ? dayjs(outboundState.fixedTime)
      : undefined,
  }),
  { whitelist: ["map"] }
);

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    toggleProjection: (state) => {
      if (state.projection === "globe") {
        state.projection = "mercator";
      } else {
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
    },
    setMapTimezone: (state, action: PayloadAction<string>) => {
      state.mapTimezone = action.payload;
    },
    setTimezoneType: (state, action: PayloadAction<string>) => {
      state.timezoneType = action.payload;
    },
    setFixedTime: (state, action: PayloadAction<Dayjs>) => {
      state.fixedTime = action.payload;
    },
    clearFixedTime: (state) => {
      state.fixedTime = undefined;
    },
    setBounds: (state, payload: PayloadAction<[number, number][]>) => {
      state.bounds = payload.payload;
    },
    nextUnit: (state) => {
      if (state.unitSystem == "metric") state.unitSystem = "nautical";
      else if (state.unitSystem == "nautical") state.unitSystem = "imperial";
      else state.unitSystem = "metric";
    },
  },
});

export const {
  toggleProjection,
  showLayer,
  hideLayer,
  setViewState,
  setBounds,
  nextUnit,
  setMapTimezone,
  setTimezoneType,
  setFixedTime,
  clearFixedTime,
} = mapSlice.actions;

export default mapSlice.reducer;
