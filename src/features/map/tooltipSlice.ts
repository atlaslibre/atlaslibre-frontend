import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActor } from "../../interfaces/schemas";

interface TooltipState {
  actor?: IActor | undefined;
  activeActor?: IActor | undefined;
  lat: number;
  lon: number;
  distance?: string | undefined;
}

const initialState: TooltipState = { lat: 0, lon: 0 };

interface SetActorTooltipParams {
  type: "actor" | "activeActor";
  actor: IActor;
}

interface SetDistanceToolipParams {
  type: "distance";
  distance: string | undefined;
}

type SetTooltipParams = SetActorTooltipParams | SetDistanceToolipParams;

interface SetLatLonParams {
  lat: number;
  lon: number;
}

export const tooltipSlice = createSlice({
  name: "tooltip",
  initialState,
  reducers: {
    setLatLon: (state, payload: PayloadAction<SetLatLonParams>) => {
      state.lat = payload.payload.lat;
      state.lon = payload.payload.lon;
    },
    setTooltip: (state, payload: PayloadAction<SetTooltipParams>) => {
      const type = payload.payload.type;

      if (type == "actor") state.actor = payload.payload.actor;
      else if (type == "activeActor") state.activeActor = payload.payload.actor;
      else if (type == "distance") state.distance = payload.payload.distance;
    },
    clearTooltip: (state, payload: PayloadAction<SetTooltipParams["type"]>) => {
      const type = payload.payload;

      if (type == "actor") state.actor = undefined;
      else if (type == "activeActor") state.activeActor = undefined;
      else if (type == "distance") state.distance = undefined;
    },
  },
});

export const { setTooltip, clearTooltip, setLatLon } = tooltipSlice.actions;

export default tooltipSlice.reducer;
