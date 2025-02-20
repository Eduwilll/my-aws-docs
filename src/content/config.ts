// src/content/config.ts
import { defineCollection, z } from "astro:content";

const notesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    updated: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  notes: notesCollection,
};
