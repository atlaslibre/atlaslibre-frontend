import { z } from "zod";
import { incomingActorSchema, trackSchema } from "./actor";

const basePluginDefinitionSchema = z.object({
  name: z.string(),
});

export const pluginDefinitionSchema = z.discriminatedUnion("type", [
  basePluginDefinitionSchema.extend({
    type: z.literal("actor"),
    attribution: z
      .string()
      .optional()
      .transform((x) => x ?? undefined),
    replay: z
      .boolean()
      .optional()
      .transform((x) => x ?? false),
    locate: z
      .boolean()
      .optional()
      .transform((x) => x ?? false),
    status: z
      .boolean()
      .optional()
      .transform((x) => x ?? false),
  }),
  basePluginDefinitionSchema.extend({
    type: z.literal("tile"),
  }),
]);

export const pluginActorQueryResponseSchema = z.object({
  version: z.literal(1),
  actors: z.array(incomingActorSchema),
  tracks: z.array(trackSchema),
});

export type PluginDefinition = z.infer<typeof pluginDefinitionSchema>;
