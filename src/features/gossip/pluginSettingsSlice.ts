import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BaseGossipPluginSettings {
  id: string;
}

export interface ActorGossipPluginSettings extends BaseGossipPluginSettings {
  type: "actor";
}

export interface TileGossipPluginSettings extends BaseGossipPluginSettings {
  type: "tile";
}

export type GossipPluginSettings =
  | ActorGossipPluginSettings
  | TileGossipPluginSettings;

export type TrackColorRangeType = "speed" | "altitude";

export interface TrackColorRange {
  type: TrackColorRangeType;
  min: number;
  max: number;
}

interface PluginSettingsState {
  settings: GossipPluginSettings[];
  trackColorRange: { [actorType: string]: TrackColorRange };
  scale: { [actorType: string]: number };
}

interface UpdateTrackColorRangeTypePayload {
  actorType: string;
  parameterType: TrackColorRangeType;
}

interface UpdateTrackColorRangePayload {
  actorType: string;
  min: number;
  max: number;
}

interface UpdateScalePayload {
  actorType: string;
  scale: number;
}

const initialState: PluginSettingsState = {
  settings: [],
  trackColorRange: {
    ship: { min: 5, max: 20, type: "speed" },
    aircraft: { min: 0, max: 30000, type: "altitude" },
  },
  scale: {
    ship: 1,
    aircraft: 1,
  },
};

export const pluginSettingsSlice = createSlice({
  name: "pluginSettings",
  initialState,
  reducers: {
    updateTrackColorRangeType: (
      state,
      action: PayloadAction<UpdateTrackColorRangeTypePayload>
    ) => {
      state.trackColorRange[action.payload.actorType].type =
        action.payload.parameterType;
    },
    updateTrackColorRange: (
      state,
      action: PayloadAction<UpdateTrackColorRangePayload>
    ) => {
      state.trackColorRange[action.payload.actorType].min = action.payload.min;
      state.trackColorRange[action.payload.actorType].max = action.payload.max;
    },
    updateScale: (state, action: PayloadAction<UpdateScalePayload>) => {
      state.scale[action.payload.actorType] = action.payload.scale;
    },
  },
});

export const { updateTrackColorRangeType, updateTrackColorRange, updateScale } =
  pluginSettingsSlice.actions;

export default pluginSettingsSlice.reducer;
