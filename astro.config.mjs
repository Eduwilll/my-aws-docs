import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import remarkWikiLink from 'remark-wiki-link';
import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    remarkPlugins: [
      [
        remarkWikiLink,
        {
          pageResolver: (name) => [name.toLowerCase().replace(/ /g, '-')],
          hrefTemplate: (permalink) => `/notes/${permalink}`,
        },
      ],
    ],
    shikiConfig: {
      theme: 'github-light',
    },
  },
  output: "static",
  adapter: vercel(),
});
