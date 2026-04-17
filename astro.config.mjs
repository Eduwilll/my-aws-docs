import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import remarkWikiLink from 'remark-wiki-link';
import vercel from "@astrojs/vercel";
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import path from 'path';

// Build a map of permalinks to their actual category paths
const getPermalinksMap = () => {
  const notesDir = path.resolve('./src/content/notes');
  const map = {};
  if (fs.existsSync(notesDir)) {
    const categories = fs.readdirSync(notesDir);
    categories.forEach(category => {
      const categoryPath = path.join(notesDir, category);
      if (fs.statSync(categoryPath).isDirectory()) {
        fs.readdirSync(categoryPath).forEach(file => {
          if (file.endsWith('.md')) {
            const slug = file.replace('.md', '');
            map[slug] = `${category}/${slug}`;
          }
        });
      }
    });
  }
  return map;
};
const permalinksMap = getPermalinksMap();

export default defineConfig({
  site: 'https://my-aws-docs.vercel.app',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  markdown: {
    remarkPlugins: [
      [
        remarkWikiLink,
        {
          pageResolver: (name) => [name.toLowerCase().replace(/ /g, '-')],
          hrefTemplate: (permalink) => {
            const mapped = permalinksMap[permalink] || `aws/${permalink}`;
            return `/docs/${mapped}`;
          },
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

