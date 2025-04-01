import { createSlice } from "@reduxjs/toolkit";

interface FeatureFlagState {
  debuggingEnabled: boolean;
  colorMode: "light" | "dark" | "system";
}

const initialState: FeatureFlagState = {
  debuggingEnabled: false,
  colorMode: "system",
};

export const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    toggleDebugging: (state) => {
      state.debuggingEnabled = !state.debuggingEnabled;
    },

    toggleColorMode: (state) => {
      if (state.colorMode === "light") state.colorMode = "dark";
      else if (state.colorMode === "dark") state.colorMode = "system";
      else state.colorMode = "light";
    },
  },
});

export const { toggleDebugging, toggleColorMode } = flagsSlice.actions;

export default flagsSlice.reducer;
