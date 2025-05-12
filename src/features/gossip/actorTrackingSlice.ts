import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Actor } from "../../interfaces/actor";

const initialState: GossipState = {
  tracked: [],
  trackable: true
};

export interface TrackedActor {
  id: string;
  plugin: string;
}

interface GossipState {
  tracked: TrackedActor[];
  trackable: boolean;
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
    setTrackable: (state, action: PayloadAction<boolean>) => {
      state.trackable = action.payload;
    }
  },
});

export const { toggleTrack, setTrackable } = actorTrackingSlice.actions;
export default actorTrackingSlice.reducer;