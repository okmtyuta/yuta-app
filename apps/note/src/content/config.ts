import { z, defineCollection } from 'astro:content'

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    postedAt: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    serie: z.string().optional(),
    public: z.boolean().optional()
  })
})

export const collections = {
  posts: postsCollection
}
