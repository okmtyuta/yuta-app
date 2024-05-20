import { defineConfig, passthroughImageService } from "astro/config";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import rehypeKatex from "rehype-katex";
import { amsthm } from './thmenv';
import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, amsthm],
    rehypePlugins: [[rehypeKatex, {
      macros: {
        "\\kakko": "\\left(#1\\right)"
      }
    }]]
  },
  integrations: [react()],
  image: {
    service: passthroughImageService()
  }
});