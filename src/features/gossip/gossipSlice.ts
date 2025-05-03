import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Actor, Track } from "../../interfaces/actor";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ActorGossipPluginSettings,
  ActorOverrides,
} from "./pluginSettingsSlice";
import { pluginActorQueryResponseSchema } from "../../interfaces/plugins";

interface GossipState {
  tracked: { [plugin: string]: string[] };
}

interface GossipUpdate {
  actors: Actor[];
  tracks: Track[];
}

const initialState: GossipState = {
  tracked: {},
};

interface GetStatusParams {
  pluginId: string;
}

interface QueryActorsParams {
  pluginId: string;
  bounds: [number, number][];
  settings: ActorGossipPluginSettings;
  alreadyTracked: string[];
  overrides: ActorOverrides;
  fixedTime?: string;
}

export const gossipApiSlice = createApi({
  reducerPath: "gossip-api",
  baseQuery: async (args: [pluginId: string, payload: object]) => {
    const data = new Promise<any>((resolve) => {
      chrome.runtime.sendMessage(args[0], args[1], (response) => {
        resolve(response);
      });
    });
    return { data: await data };
  },
  keepUnusedDataFor: 0.5,
  refetchOnMountOrArgChange: 1,
  endpoints: (builder) => ({
    getStatus: builder.query<string, GetStatusParams>({
      query: ({pluginId}) => [pluginId, {type: "status"}]
    }),
    getActors: builder.query<GossipUpdate, QueryActorsParams>({
      serializeQueryArgs: ({ queryArgs }) => {
        const { pluginId, alreadyTracked, fixedTime, settings } = queryArgs;
        return { pluginId, alreadyTracked, fixedTime, settings };
      },
      query: ({ pluginId, alreadyTracked, fixedTime, settings, bounds }) => {
        const ts: dayjs.Dayjs = fixedTime ? dayjs(fixedTime) : dayjs.utc();
        console.log(pluginId, alreadyTracked, fixedTime, settings, bounds);
        return [
          pluginId,
          {
            type: "query",
            tracks: alreadyTracked ?? [],
            ts: ts.utc().unix(),
            maxDelta: settings.query.maxAge,
            maxDeltaTrack: settings.query.maxTrack,
            limit: 10_000,
            bounds: bounds,
          },
        ];
      },
      transformResponse: (
        response: any,
        _meta: any,
        { pluginId, overrides }
      ) => {
        /* 
  if (filter) {
    const filterLines = filter.split("\n");

    const filterFn = (a: Actor) => {
      for (let i = 0; i < filterLines.length; i++) {
        const line = filterLines[i];
        if (a.name.indexOf(line) >= 0) return true;
      }
      return false;
    };

    allActors = allActors.filter(filterFn);
  }
    */

        if (response.actors)
          for (let i = 0; i < response.actors.length; i++) {
            const actor = response.actors[i];
            const override = overrides[actor.id];
            if (override) {
              const keys = Object.keys(override);
              const values = Object.values(override);

              for (let k = 0; k < keys.length; k++) {
                const key = keys[k];
                if (key === "type") continue;
                actor[key] = values[k];
              }
            }
          }

        const parseResult = pluginActorQueryResponseSchema.safeParse(response);

        if (!parseResult.success) {
          console.error(
            "Failed to parse query response from plugin",
            parseResult.error,
            response
          );
          return {
            actors: [],
            tracks: [],
          };
        }

        return {
          actors: parseResult.data.actors.map(
            (incomingActor) => ({ plugin: pluginId, ...incomingActor } as Actor)
          ),
          tracks: parseResult.data.tracks,
        };
      },
    }),
  }),
});

export const gossipSlice = createSlice({
  name: "gossip",
  initialState,
  reducers: {
    toggleTrack: (state, action: PayloadAction<Actor>) => {
      const id = action.payload.id;
      const plugin = action.payload.plugin;
      if (state.tracked[plugin]) {
        const found = state.tracked[plugin].findIndex((i) => i == id);
        if (found === -1) {
          state.tracked[plugin].push(id);
        } else {
          state.tracked[plugin].splice(found, 1);
        }
      } else {
        state.tracked[plugin] = [id];
      }
    },
  },
});

export const { toggleTrack } = gossipSlice.actions;

export const { useGetActorsQuery, useGetStatusQuery } = gossipApiSlice;

export default gossipSlice.reducer;
