import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Actor, Track } from "../../interfaces/actor";

interface GossipState {
  actors: { [plugin: string]: Actor[] };
  tracked: { [plugin: string]: string[] };
  tracks:  { [plugin: string]: Track[] };
}

interface GossipUpdate {
  plugin: string;
  actors: Actor[];
  tracks: Track[];
}

interface TrackingParams {
  plugin: string;
  actor: Actor;
}

const initialState: GossipState = {
  actors: {},
  tracked: {},
  tracks: {}
};

export const gossipSlice = createSlice({
  name: "gossip",
  initialState,
  reducers: {
    updateValidatedGossip: (state, action: PayloadAction<GossipUpdate>) => {
      state.actors[action.payload.plugin] = action.payload.actors;
      state.tracks[action.payload.plugin] = action.payload.tracks;
    },
    toggleTrack: (state, action: PayloadAction<TrackingParams>) => {
      const id = action.payload.actor.id;
      const plugin = action.payload.plugin;
      if (state.tracked[plugin]) {
        const found = state.tracked[plugin].findIndex(i => i == id);
        if(found === -1){
          state.tracked[plugin].push(id);
        }else{
          state.tracked[plugin].splice(found, 1);
        }
      } else {
        state.tracked[plugin] = [id];
      }
    },
  },
});

export const { updateValidatedGossip, toggleTrack } = gossipSlice.actions;

export default gossipSlice.reducer;
