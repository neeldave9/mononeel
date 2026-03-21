import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { isFeaturePathEnabled } from "./src/config/features";

export default defineConfig({
  site: "https://neeldave.dev",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return isFeaturePathEnabled(pathname);
      },
    }),
    tailwind(),
  ],
});
