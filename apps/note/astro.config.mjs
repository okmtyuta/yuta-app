import { defineConfig, passthroughImageService } from 'astro/config'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkDirective from 'remark-directive'
import { directivePlugin } from './src/markdown/directive-plugin'

const katexOption = {
  trust: (context) => ['\\htmlId', '\\href'].includes(context.command),
  macros: {
    '\\eqref': '\\href{###1}{(\\text{#1})}',
    '\\ref': '\\href{###1}{\\text{#1}}',
    '\\label': '\\htmlId{#1}{}'
  }
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkDirective,
      directivePlugin
    ],
    rehypePlugins: [[rehypeKatex, katexOption]]
  },

  image: {
    service: passthroughImageService()
  }
})
