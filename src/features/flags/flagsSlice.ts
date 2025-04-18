import { createSlice } from "@reduxjs/toolkit";

interface FeatureFlagState {
  debuggingEnabled: boolean;
  screenshotMode: boolean;
  colorMode: "light" | "dark" | "system";
}

const initialState: FeatureFlagState = {
  debuggingEnabled: false,
  screenshotMode: false,
  colorMode: "system",
};

export const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    toggleDebugging: (state) => {
      state.debuggingEnabled = !state.debuggingEnabled;
    },

    toggleScreenshotMode: (state) => {
      state.screenshotMode = !state.screenshotMode;
    },

    toggleColorMode: (state) => {
      if (state.colorMode === "light") state.colorMode = "dark";
      else if (state.colorMode === "dark") state.colorMode = "system";
      else state.colorMode = "light";
    },
  },
});

export const { toggleDebugging, toggleColorMode, toggleScreenshotMode } =
  flagsSlice.actions;

export default flagsSlice.reducer;
