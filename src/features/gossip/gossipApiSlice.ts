import { createApi } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";
import { Actor, Track } from "../../interfaces/actor";
import { pluginActorQueryResponseSchema } from "../../interfaces/plugins";
import { ActorOverrides, PluginSettings } from "./pluginSettingsSlice";
import { GossipPlugin } from "./pluginSlice";
import { applyOverride } from "../../util/overrides";
import { TrackedActor } from "./actorTrackingSlice";



interface GossipUpdate {
  actors: Actor[];
  tracks: Track[];
}

interface GetStatusParams {
  pluginId: string;
}

interface QueryActorsParams {
  plugins: GossipPlugin[];
  bounds: [number, number][];
  settings: PluginSettings;
  alreadyTracked: TrackedActor[];
  overrides: ActorOverrides;
  fixedTime?: string;
}

interface ErrorResult {
  type: "error";
  pluginId: string;
  error: string;
}

interface SuccessResult {
  type: "success";
  pluginId: string;
  data: any;
}

export const gossipApiSlice = createApi({
  reducerPath: "gossipApi",
  baseQuery: async (args: [pluginId: string, payload: object]) => {
    const data = new Promise<any>((resolve) => {
      chrome.runtime.sendMessage(args[0], args[1], (response) => {
        resolve(response);
      });
    });
    return {
      data: await data,
      type: "success",
      pluginId: args[0],
    } as SuccessResult;
  },
  keepUnusedDataFor: 0.5,
  refetchOnMountOrArgChange: 1,
  endpoints: (builder) => ({
    getStatus: builder.query<string, GetStatusParams>({
      query: ({ pluginId }) => [pluginId, { type: "status" }],
    }),
    getActors: builder.query<GossipUpdate, QueryActorsParams>({
      serializeQueryArgs: ({ queryArgs }) => {
        const { plugins, alreadyTracked, fixedTime, settings } = queryArgs;
        return { plugins, alreadyTracked, fixedTime, settings };
      },
      queryFn: async (
        { plugins, alreadyTracked, fixedTime, settings, bounds, overrides },
        _api,
        _extraOptions,
        baseQuery
      ) => {
        const ts: dayjs.Dayjs = fixedTime ? dayjs(fixedTime) : dayjs.utc();

        const results = await Promise.all(
          plugins
            .filter((p) => p.type === "actor")
            .map(async (plugin) => {
              const tracks = alreadyTracked
                .filter((t) => t.plugin == plugin.id)
                .map((t) => t.id);

              const actorSettings = settings[plugin.id];

              if (actorSettings.type !== "actor")
                return {
                  type: "error",
                  error: "plugin setting type does not match plugin type",
                } as ErrorResult;

              return await baseQuery([
                plugin.id,
                {
                  type: "query",
                  tracks,
                  ts: ts.utc().unix(),
                  maxDelta: actorSettings.query.maxAge,
                  maxDeltaTrack: actorSettings.query.maxTrack,
                  limit: 10000,
                  bounds,
                },
              ]);
            })
        );

        const tracks: Track[][] = [];
        const actors: Actor[][] = [];

        for (let i = 0; i < results.length; i++) {
          const result = results[i];

          if (result.type !== "success") continue;

          for (let i = 0; i < result.data.actors.length; i++)
            applyOverride(
              result.data.actors[i],
              overrides[result.data.actors[i].id],
              ["type"]
            );

          const parseResult = pluginActorQueryResponseSchema.safeParse(
            result.data
          );

          if (!parseResult.success) {
            console.error(
              "Failed to parse query response from plugin",
              parseResult.error,
              result.data
            );
            continue;
          }

          actors.push(
            parseResult.data.actors.map(
              (incomingActor) =>
                ({ plugin: result.pluginId, ...incomingActor } as Actor)
            )
          );

          tracks.push(parseResult.data.tracks);
        }

        return {
          data: {
            actors: actors.flat(),
            tracks: tracks.flat(),
          },
        };
      },
    }),
  }),
});

export const { useGetActorsQuery, useGetStatusQuery } = gossipApiSlice;

