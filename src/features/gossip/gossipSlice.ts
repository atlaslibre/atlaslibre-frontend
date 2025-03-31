import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { actorSchema, IActor } from "../../interfaces/schemas";

interface GossipState {
  actors: IActor[];
}

const initialState: GossipState = {
  actors: [],
};

export const gossipSlice = createSlice({
  name: "gossip",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<IActor[]>) => {
      const newActors: IActor[] = [];
      const updatedActors: IActor[] = [];
      for (let i = 0; i < action.payload.length; i++) {
        const parseResult = actorSchema.safeParse(action.payload[i]);

        if (!parseResult.success) {
          console.error(
            "Skipping bad gossip from update",
            action.payload[i],
            parseResult.error
          );
          continue;
        }

        const actorGossipUpdate = parseResult.data;

        const knownActor = state.actors.find((a) => a.id == actorGossipUpdate.id);

        if (knownActor) {
          updatedActors.push(actorGossipUpdate);
        } else {
          newActors.push(actorGossipUpdate);
        }
      }

      state.actors = state.actors
        .map((item) => updatedActors.find((a) => a.id == item.id) ?? item)
        .concat(newActors);
    },
  },
});

export const { update } = gossipSlice.actions;

export default gossipSlice.reducer;
