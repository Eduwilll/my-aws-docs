// src/content.config.ts (Astro v6+ Content Layer API)
// Migrated from src/content/config.ts during Astro 5 -> 7 upgrade.
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    updated: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  notes,
};
