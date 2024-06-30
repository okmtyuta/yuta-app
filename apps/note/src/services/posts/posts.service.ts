import { getCollection, type CollectionEntry } from 'astro:content'

class PostsService {
  private posts: CollectionEntry<'posts'>[]

  constructor(posts: CollectionEntry<'posts'>[]) {
    this.posts = posts
  }

  public static init = async () => {
    const posts = await getCollection('posts')
    return new PostsService(posts)
  }

  getPosts() {
    return this.posts.sort((p, q) => {
      return (
        new Date(q.data.postedAt).getTime() -
        new Date(p.data.postedAt).getTime()
      )
    })
  }

  getSeries() {
    const posts = this.posts
    const series = [
      ...new Set(
        posts
          .map((post) => {
            return post.data.serie
          })
          .filter((serie) => {
            return serie != null
          })
      )
    ]

    return series
  }

  listTags() {
    const posts = this.posts
    const tags = [
      ...new Set(
        posts
          .map((post) => {
            return post.data.tags
          })
          .filter((tag) => {
            return tag != null
          })
          .flat()
      )
    ]

    return tags
  }

  listSeries() {
    const posts = this.posts
    const series = [
      ...new Set(
        posts
          .filter((post) => {
            return post.data.serie
          })
          .map((post) => {
            return post.data.serie
          })
      )
    ]

    return series
  }

  findBySeries(series: (string | undefined | null)[]) {
    const exactSeries = series.filter((serie) => serie != null)
    if (exactSeries.length === 0) {
      return []
    }

    const posts = this.posts
    return posts.filter((post) => {
      return exactSeries.every((serie) => {
        return post.data.serie && post.data.serie === serie
      })
    })
  }

  findByTags(tags: string[]) {
    if (tags.length === 0) {
      return []
    }

    const posts = this.posts
    return posts.filter((post) => {
      return tags.every((tag) => {
        return post.data.tags && post.data.tags.includes(tag)
      })
    })
  }
}

export { PostsService }
