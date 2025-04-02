import {
  GeoJsonImportFeatureCollection,
  GeoJsonShapeFeatureCollection,
} from "@geoman-io/maplibre-geoman-free";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomMapState {
  activeCustomMap: GeoJsonImportFeatureCollection;
}

const initialState: CustomMapState = {
  activeCustomMap: {
    type: "FeatureCollection",
    features: [],
  },
};

export const customMapSlice = createSlice({
  name: "customMap",
  initialState,
  reducers: {
    saveActiveCustomMap: (
      state,
      payload: PayloadAction<GeoJsonShapeFeatureCollection>
    ) => {
      state.activeCustomMap = payload.payload as GeoJsonImportFeatureCollection;
    },
  },
});

export const { saveActiveCustomMap } = customMapSlice.actions;

export default customMapSlice.reducer;
