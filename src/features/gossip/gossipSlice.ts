import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Actor } from "../../interfaces/actor";

interface GossipState {
  actors: { [plugin: string]: Actor[] };
}

interface GossipUpdate {
  plugin: string;
  actors: Actor[];
}

const initialState: GossipState = {
  actors: {},
};

export const gossipSlice = createSlice({
  name: "gossip",
  initialState,
  reducers: {
    updateValidatedGossip: (state, action: PayloadAction<GossipUpdate>) => {
      state.actors[action.payload.plugin] = action.payload.actors;
    },
  },
});

export const { updateValidatedGossip } = gossipSlice.actions;

export default gossipSlice.reducer;
