import { defineConfig, passthroughImageService } from 'astro/config'
import remarkMath from 'remark-math'
import remarkDirective from 'remark-directive'
import rehypeKatex from 'rehype-katex'
import remarkLinkCard from 'remark-link-card'
import { amsthm } from './src/markdown/amsthm'

const katexOption = {
  macros: {
    '\\kakko': '\\left(#1\\right)'
  }
}

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, remarkLinkCard, amsthm],
    rehypePlugins: [[rehypeKatex, katexOption]]
  },
  integrations: [],
  image: {
    service: passthroughImageService()
  }
})
