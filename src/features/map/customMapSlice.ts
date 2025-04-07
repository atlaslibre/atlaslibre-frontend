import {
  GeoJsonImportFeatureCollection,
  GeoJsonShapeFeatureCollection,
} from "@geoman-io/maplibre-geoman-free";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomMap {
  geoJson: GeoJsonImportFeatureCollection;
  name: string;
  visible: boolean;
  color: string;
}

interface CustomMapState {
  activeCustomMap: GeoJsonImportFeatureCollection;
  inactiveCustomMap: CustomMap[];
}

interface SetColorParams {
  color: string;
  index: number;
}

const emptyGeoJson = (): GeoJsonImportFeatureCollection => ({
  type: "FeatureCollection",
  features: [],
});

const initialState: CustomMapState = {
  activeCustomMap: emptyGeoJson(),
  inactiveCustomMap: [],
};

const randomHsl = () => `hsla(${Math.trunc(Math.random() * 360)}, 100%, 50%, 1)`;

export const customMapSlice = createSlice({
  name: "customMap",
  initialState,
  reducers: {
    saveActiveCustomMap: (
      state,
      action: PayloadAction<GeoJsonShapeFeatureCollection>
    ) => {
      state.activeCustomMap = action.payload as GeoJsonImportFeatureCollection;
    },
    setActiveMapToInactive: (state, action: PayloadAction<string>) => {
      state.inactiveCustomMap.unshift({
        geoJson: state.activeCustomMap,
        name: action.payload,
        visible: true,
        color: randomHsl(),
      });
      state.activeCustomMap = emptyGeoJson();
    },
    setInactiveMapToActive: (state, action: PayloadAction<number>) => {
      const [customMap] = state.inactiveCustomMap.splice(action.payload, 1);
      state.activeCustomMap = customMap.geoJson;
    },
    deleteInactiveMap: (state, action: PayloadAction<number>) => {
      state.inactiveCustomMap.splice(action.payload, 1);
    },
    toggleVisibilityOfInactiveMap: (state, action: PayloadAction<number>) => {
      state.inactiveCustomMap[action.payload].visible =
        !state.inactiveCustomMap[action.payload].visible;
    },
    setInactiveMapColor: (state, action: PayloadAction<SetColorParams>) => {
      state.inactiveCustomMap[action.payload.index].color =
        action.payload.color;
    },
  },
});

export const {
  saveActiveCustomMap,
  setActiveMapToInactive,
  setInactiveMapToActive,
  deleteInactiveMap,
  toggleVisibilityOfInactiveMap,
  setInactiveMapColor,
} = customMapSlice.actions;

export default customMapSlice.reducer;
