// @ts-check
import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify/static";
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  },
});
