import {
  GeoJsonImportFeature,
  GeoJsonImportFeatureCollection,
  GeoJsonShapeFeatureCollection,
} from "@geoman-io/maplibre-geoman-free";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomTemplate } from "./template";

export interface CustomMap {
  geoJson: GeoJsonImportFeatureCollection;
  name: string;
  visible: boolean;
  color: string;
}

interface CustomMapState {
  activeCustomMap: GeoJsonImportFeatureCollection;
  inactiveCustomMap: CustomMap[];
  activeTemplate?: CustomTemplate;
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

const randomHsl = () =>
  `hsla(${Math.trunc(Math.random() * 360)}, 100%, 50%, 1)`;

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
    addFeatureToActiveMap: (
      state,
      action: PayloadAction<GeoJsonImportFeature>
    ) => {
      const matcher = /feature-(\d+)/;

      const ids = state.activeCustomMap.features
        .map((f) => {
          if (f.id === undefined) return undefined;
          const match = matcher.exec(f.id.toString());
          if (match === null) return undefined;
          return parseInt(match[1]);
        })
        .filter((id) => id !== undefined);

      state.activeCustomMap.features = [
        ...state.activeCustomMap.features,
        { id: `template-feature-${Math.max(-1, ...ids) + 1}`, ...action.payload },
      ];
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
    setActiveTemplate: (state, action: PayloadAction<CustomTemplate>) => {
      state.activeTemplate = action.payload;
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
  addFeatureToActiveMap,
  setActiveTemplate,
} = customMapSlice.actions;

export default customMapSlice.reducer;
