import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { gossipSlice } from '../features/gossip/gossipSlice'
import { mapSlice } from '../features/map/mapSlice'
import { flagsSlice } from '../features/flags/flagsSlice';

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['gossip']
};

const rootReducer = combineSlices(gossipSlice, mapSlice, flagsSlice)
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch







