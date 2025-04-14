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

interface PluginSettingsState {
  settings: GossipPluginSettings[];
  speedColorRange: { [actorType: string]: [number, number] };
}

interface UpdateSpeedColorRangePayload {
  type: string;
  min: number;
  max: number;
}

const initialState: PluginSettingsState = {
  settings: [],
  speedColorRange: {
    ship: [5, 20],
    aircraft: [0, 300],
  },
};

export const pluginSettingsSlice = createSlice({
  name: "pluginSettings",
  initialState,
  reducers: {
    updateSpeedColorRange: (
      state,
      action: PayloadAction<UpdateSpeedColorRangePayload>
    ) => {
      state.speedColorRange[action.payload.type] = [
        action.payload.min,
        action.payload.max,
      ];
    },
  },
});

export const { updateSpeedColorRange } = pluginSettingsSlice.actions;

export default pluginSettingsSlice.reducer;
