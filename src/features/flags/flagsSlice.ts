import { createSlice } from "@reduxjs/toolkit";

interface FeatureFlagState {
  debuggingEnabled: boolean;
}

const initialState: FeatureFlagState = {
  debuggingEnabled: false
};

export const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    toggleDebugging: (state) => {
      state.debuggingEnabled = !state.debuggingEnabled;
    },

  },
});

export const { toggleDebugging } = flagsSlice.actions;

export default flagsSlice.reducer;
