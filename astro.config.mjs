import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import remarkWikiLink from 'remark-wiki-link';
import vercel from "@astrojs/vercel";
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      hostname: 'https://my-aws-docs.vercel.app',
      exclude: ['/404'],
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
