import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "../../interfaces/actor";

const initialState: GossipState = {
  tracked: [],
};

export interface TrackedActor {
  id: string;
  plugin: string;
}

interface GossipState {
  tracked: TrackedActor[];
}

export const actorTrackingSlice = createSlice({
  name: "actorTracking",
  initialState,
  reducers: {
    toggleTrack: (state, action: PayloadAction<Actor>) => {
      const id = action.payload.id;
      const plugin = action.payload.plugin;

      const found = state.tracked.findIndex(
        (t) => t.id == id && t.plugin == plugin
      );

      if (found === -1) {
        state.tracked.push({ id, plugin });
      } else {
        state.tracked.splice(found, 1);
      }
    },
  },
});

export const { toggleTrack } = actorTrackingSlice.actions;
export default actorTrackingSlice.reducer;