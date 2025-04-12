import { z } from "zod";

export const locationRecordSchema = z.object({
  ts: z.number(),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  heading: z
    .number()
    .min(0)
    .max(360)
    .nullish()
    .transform((x) => x ?? undefined),
  speed: z
    .number()
    .nullish()
    .transform((x) => x ?? undefined),
  alt: z
    .number()
    .min(0)
    .nullish()
    .transform((x) => x ?? undefined),
});

export const trackSchema = z.object({
  id: z.string(),
  track: z.array(locationRecordSchema),
});

const baseActorSchema = z.object({
  id: z.string(),
  name: z.string(),
  pos: locationRecordSchema,
});

export const actorSchema = z.discriminatedUnion("type", [
  baseActorSchema.extend({
    type: z.literal("ship"),
    flag: z
      .string()
      .length(2)
      .nullish()
      .transform((x) => x ?? undefined),
    class: z.enum([
      "cargo",
      "container",
      "ferry",
      "fishing",
      "highspeed",
      "military",
      "navigation",
      "other",
      "recreational",
      "special",
      "tanker",
    ]),
    mmsi: z
      .string()
      .nullish()
      .transform((x) => x ?? undefined),
  }),
  baseActorSchema.extend({
    type: z.literal("aircraft"),
    hex: z.string().min(6).max(7),
    reg: z
      .string()
      .nullish()
      .transform((x) => x ?? undefined),
    flight: z
      .string()
      .nullish()
      .transform((x) => x ?? undefined),
    squawk: z
      .string()
      .nullish()
      .transform((x) => x ?? undefined),
  }),
]);

export type Track = z.infer<typeof trackSchema>;
export type LocationRecord = z.infer<typeof locationRecordSchema>;
export type Actor = z.infer<typeof actorSchema>;
