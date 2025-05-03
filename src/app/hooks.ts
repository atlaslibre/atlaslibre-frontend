import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useMediaQuery } from "@mui/material";
import { useEffect, useRef } from "react";
import { useGetActorsQuery } from "../features/gossip/gossipApiSlice";
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

export const useActors = (): {
  actors: Actor[];
  tracks: Track[];
  attributions: string[];
} => {
  const { plugins } = useAppSelector((state) => state.plugin);
  const { settings, overrides } = useAppSelector(
    (state) => state.pluginSettings
  );
  const { bounds, fixedTime } = useAppSelector((state) => state.map);
  const { tracked } = useAppSelector((state) => state.actorTracking);

  const attributions: string[] = [];

  const pluginResults = useGetActorsQuery({
    plugins,
    alreadyTracked: tracked,
    settings,
    fixedTime,
    bounds,
    overrides,
  });

  if (pluginResults.isSuccess)
    for (let i = 0; i < plugins.length; i++) {
      const attribution = plugins[i].attribution;

      if (!attribution) continue;

      const actorsForPlugin = pluginResults.data.actors.filter(
        (a) => a.plugin == plugins[i].id
      );

      if (actorsForPlugin.length == 0) continue;

      attributions.push(attribution);
    }

  return {
    actors: pluginResults.data?.actors ?? [],
    tracks: pluginResults.data?.tracks ?? [],
    attributions,
  };
};
