import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useMediaQuery } from "@mui/material";
import { useEffect, useRef } from "react";
import { useGetActorsQuery } from "../features/gossip/gossipSlice";
import { Actor, Track } from "../interfaces/actor";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useColorMode = () => {
  const { colorMode } = useAppSelector((state) => state.flags);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return function c<T>(light: T, dark: T): T {
    if (colorMode == "system") return prefersDarkMode ? dark : light;
    return colorMode == "light" ? light : dark;
  };
};

export const useUnmount = (fn: () => void) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => () => fnRef.current(), []);
};

export const useActors = (): {actors: Actor[], tracks: Track[], attributions: string[]} => {
  const { plugins } = useAppSelector((state) => state.plugin);
  const { settings, overrides } = useAppSelector(
    (state) => state.pluginSettings
  );
  const { bounds, fixedTime } = useAppSelector((state) => state.map);
  const { tracked } = useAppSelector((state) => state.gossip);

  const actors: Actor[] = [];
  const tracks: Track[] = [];
  const attributions: string[] = [];
  for (let i = 0; i < plugins.length; i++) {
    const pluginId = plugins[i].id;
    const actorSettings = settings[pluginId];
    const attribution = plugins[i].attribution;

    if (plugins[i].type !== "actor" || actorSettings.type !== "actor") continue;
    if (!actorSettings.enabled) continue;

    const alreadyTracked = tracked[pluginId];
    const pluginResults = useGetActorsQuery({
      pluginId,
      alreadyTracked,
      settings: actorSettings,
      fixedTime,
      bounds,
      overrides,
    });

    if (pluginResults.isSuccess) {
      actors.push(...pluginResults.data.actors);
      tracks.push(...pluginResults.data.tracks);

      if(attribution && pluginResults.data.actors.length > 0)
        attributions.push(attribution)
    }
  }
  
  return {actors, tracks, attributions};
};
