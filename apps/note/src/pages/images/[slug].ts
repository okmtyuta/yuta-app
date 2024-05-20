import { Resvg } from '@resvg/resvg-js'
import type { APIRoute } from 'astro'
import { getCollection, getEntry } from 'astro:content'
import { createElement } from 'react'

import satori from 'satori'
import { Thumbnail } from '../../components/thubnail'

const FONT_NAME = 'Noto Sans JP'

export async function getStaticPaths() {
  return (await getCollection('posts')).map((post) => ({
    params: { slug: post.slug }
  }))
}

const getNotoSansFontBuffer = async () => {
  const endpoint = new URL('https://www.googleapis.com/webfonts/v1/webfonts')
  endpoint.searchParams.set('family', FONT_NAME)
  endpoint.searchParams.set('key', import.meta.env.GOOGLE_FONT_API_KEY)
  const info = await fetch(endpoint).then((res) => res.json())
  const fontResponse = await fetch(info.items[0].files['800'])
  const fontBuffer = await fontResponse.arrayBuffer()

  return fontBuffer
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params

  if (!slug) {
    return new Response(JSON.stringify({}), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const post = await getEntry('posts', slug)

  if (!post) {
    return new Response(JSON.stringify({}), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const fontBuffer = await getNotoSansFontBuffer()

  const svg = await satori(
    createElement(Thumbnail, {
      title: post.data.title,
      description: post.data.description,
      url: 'https://note.me.yuta.app'
    }),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: FONT_NAME,
          data: fontBuffer
        }
      ]
    }
  )

  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: false
    },
    fitTo: {
      mode: 'width',
      value: 1200
    }
  })

  const image = resvg.render()

  return new Response(image.asPng(), {
    status: 200,
    headers: {
      'Content-Type': 'image/png'
    }
  })
}
