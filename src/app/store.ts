import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { gossipApiSlice, gossipSlice } from "../features/gossip/gossipSlice";
import { mapSlice } from "../features/map/mapSlice";
import { flagsSlice } from "../features/flags/flagsSlice";
import { customMapSlice } from "../features/map/customMapSlice";
import { tooltipSlice } from "../features/map/tooltipSlice";
import { pluginSlice } from "../features/gossip/pluginSlice";
import { rememberReducer, rememberEnhancer } from "redux-remember";
import { plancespotterSlice } from "../features/gossip/planespotterSlice";
import { listenerMiddleware } from "./listenerMiddleware";
import { pluginSettingsSlice } from "../features/gossip/pluginSettingsSlice";

const rootReducer = combineSlices(
  gossipSlice,
  gossipApiSlice,
  mapSlice,
  flagsSlice,
  customMapSlice,
  tooltipSlice,
  pluginSlice,
  pluginSettingsSlice,
  plancespotterSlice
);

const rememberedSlices = ["map", "customMap", "pluginSettings", "flags"];

const reducer = rememberReducer(rootReducer);

export const store = configureStore({
  reducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      rememberEnhancer(window.localStorage, rememberedSlices)
    ),
  devTools: process.env.NODE_ENV !== "production",
  // @ts-expect-error typescript gets angry, but it is ok
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat(plancespotterSlice.middleware)
      .concat(gossipApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
