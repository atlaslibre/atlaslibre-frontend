import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BaseGossipPlugin {
  id: string;
  name: string;
  attribution?: string;
}

export interface ActorGossipPlugin extends BaseGossipPlugin {
  type: "actor";
  replay: boolean;
  locate: boolean;
  status: boolean;
}

export interface TileGossipPlugin extends BaseGossipPlugin {
  type: "tile";
}

export type GossipPlugin = ActorGossipPlugin | TileGossipPlugin;

interface PluginState {
  plugins: GossipPlugin[];
}

const initialState: PluginState = {
  plugins: [],
};

export const pluginSlice = createSlice({
  name: "plugin",
  initialState,
  reducers: {
    discovered: (state, action: PayloadAction<GossipPlugin>) => {
      if (!state.plugins.find((p) => p.id == action.payload.id))
        state.plugins.push(action.payload);
    },
  },
});

export const { discovered } = pluginSlice.actions;

export default pluginSlice.reducer;
