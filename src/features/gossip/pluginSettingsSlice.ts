import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BaseGossipPluginSettings {
  enabled: boolean;
}

export interface ActorGossipPluginSettings extends BaseGossipPluginSettings {
  type: "actor";
  query: {
    maxAge: number;
    maxTrack: number;
  };
}

export interface TileGossipPluginSettings extends BaseGossipPluginSettings {
  type: "tile";
}

export type GossipPluginSettings =
  | ActorGossipPluginSettings
  | TileGossipPluginSettings;

export type GossipPluginType = "actor" | "tile";
export type ActorType = "aircraft" | "ship";
export type TrackColorRangeType = "speed" | "altitude";

export interface TrackColorRange {
  type: TrackColorRangeType;
  min: number;
  max: number;
}

interface PluginSettingsState {
  overrides: { [actorId: string]: ActorOverrides }
  settings: { [plugin: string]: GossipPluginSettings };
  trackColorRange: { [actorType in ActorType]: TrackColorRange };
  scale: { [actorType in ActorType]: number };
  filter?: string;
}

type ActorOverrides = ShipActorOverrides | AircraftActorOverrides;

interface ShipActorOverrides {
  type: "ship";
  name?: string;
  flag?: string;
  class?: string;
}

interface AircraftActorOverrides {
  type: "aircraft";
  name: string;
}

interface UpdateActorOverrides {
  id: string;
  overrides: ActorOverrides;
}


interface UpdateTrackColorRangeTypePayload {
  actorType: ActorType;
  parameterType: TrackColorRangeType;
}

interface UpdateTrackColorRangePayload {
  actorType: ActorType;
  min: number;
  max: number;
}

interface UpdateScalePayload {
  actorType: ActorType;
  scale: number;
}

interface InitSettingsPayload {
  plugin: string;
  type: GossipPluginType;
}

interface NumericSettingsPayload {
  plugin: string;
  value: number;
}

const initialState: PluginSettingsState = {
  settings: {},
  overrides: {},
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
    setFilter: (state, action: PayloadAction<string | undefined>) => {
      state.filter = action.payload;
    },
    setOverrides: (state, action: PayloadAction<UpdateActorOverrides>) => {
      state.overrides[action.payload.id] = action.payload.overrides;
    },
    clearOverrides: (state, action: PayloadAction<string>) => {
      delete state.overrides[action.payload];
    },
    toggleEnabled: (state, action: PayloadAction<string>) => {
      state.settings[action.payload].enabled =
        !state.settings[action.payload].enabled;
    },
    initSettings: (state, action: PayloadAction<InitSettingsPayload>) => {
      if (action.payload.type === "actor")
        state.settings[action.payload.plugin] = {
          type: "actor",
          enabled: true,
          query: { maxAge: 300, maxTrack: 3600 },
        };
    },
    updateSettingsQueryMaxAge: (
      state,
      action: PayloadAction<NumericSettingsPayload>
    ) => {
      const settings = state.settings[action.payload.plugin];
      if (settings.type !== "actor")
        throw new Error("Plugin is not of type 'actor'");
      settings.query.maxAge = action.payload.value;
    },
    updateSettingsQueryMaxTrack: (
      state,
      action: PayloadAction<NumericSettingsPayload>
    ) => {
      const settings = state.settings[action.payload.plugin];
      if (settings.type !== "actor")
        throw new Error("Plugin is not of type 'actor'");
      settings.query.maxTrack = action.payload.value;
    },
  },
});

export const {
  updateTrackColorRangeType,
  updateTrackColorRange,
  updateScale,
  toggleEnabled,
  initSettings,
  updateSettingsQueryMaxAge,
  updateSettingsQueryMaxTrack,
  setFilter,
  setOverrides,
  clearOverrides
} = pluginSettingsSlice.actions;

export default pluginSettingsSlice.reducer;
