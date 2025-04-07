import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { gossipSlice } from "../features/gossip/gossipSlice";
import { mapSlice } from "../features/map/mapSlice";
import { flagsSlice } from "../features/flags/flagsSlice";
import { customMapSlice } from "../features/map/customMapSlice";
import { tooltipSlice } from "../features/map/tooltipSlice";
import { pluginSlice } from "../features/gossip/pluginSlice";

import { rememberReducer, rememberEnhancer } from 'redux-remember';

const rootReducer = combineSlices(
  gossipSlice,
  mapSlice,
  flagsSlice,
  customMapSlice,
  tooltipSlice,
  pluginSlice
);

const rememberedSlices = [ 'map', 'customMap', 'flags' ];

const reducer = rememberReducer(rootReducer);

export const store = configureStore({
  //reducer: persistedReducer,
  reducer,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
    rememberEnhancer(
      window.localStorage, // or window.sessionStorage, or your own custom storage driver
      rememberedSlices
    )
  ),
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
