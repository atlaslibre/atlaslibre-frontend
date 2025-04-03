import { z } from "zod";

export const locationRecordSchema = z.object({
  ts: z.number(),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  course: z
    .number()
    .min(0)
    .max(360)
    .nullish()
    .transform((x) => x ?? undefined),
  z: z.number().min(0).optional(),
});

export const dimensionsSchema = z.object({
  width: z
    .number()
    .nullish()
    .transform((x) => x ?? undefined),
  length: z
    .number()
    .nullish()
    .transform((x) => x ?? undefined),
});

export const actorSchema = z.object({
  id: z.string(),
  type: z.enum(["ship", "aircraft"]),
  name: z.string(),
  class: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  cc: z
    .string()
    .length(2)
    .nullish()
    .transform((x) => x ?? undefined),
  dim: dimensionsSchema.nullish().transform((x) => x ?? undefined),
  pos: locationRecordSchema,
});

const basePluginDefinitionSchema = z.object({
  name: z.string(),
});

export const pluginDefinitionSchema = z.discriminatedUnion("type", [
  basePluginDefinitionSchema.extend({
    type: z.literal("actor"),
    replay: z.boolean().optional().transform((x) => x ?? false),
    locate: z.boolean().optional().transform((x) => x ?? false),
  }),
  basePluginDefinitionSchema.extend({
    type: z.literal("tile"),
  }),
]);

export type ILocationRecord = z.infer<typeof locationRecordSchema>;
export type IDimensions = z.infer<typeof dimensionsSchema>;
export type IActor = z.infer<typeof actorSchema>;
export type IPluginDefinition = z.infer<typeof pluginDefinitionSchema>;
