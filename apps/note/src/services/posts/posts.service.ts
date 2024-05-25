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
    return this.posts
  }

  getGenres() {
    const posts = this.posts
    const genres = [
      ...new Set(
        posts
          .map((post) => {
            return post.data.genre
          })
          .filter((genre) => {
            return genre != null
          })
      )
    ]

    return genres
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

  findByGenres(genres: (string | undefined | null)[]) {
    const exactGenres = genres.filter((genre) => genre != null)
    if (exactGenres.length === 0) {
      return []
    }

    const posts = this.posts
    return posts.filter((post) => {
      return exactGenres.every((genre) => {
        return post.data.genre && post.data.genre === genre
      })
    })
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

  findByTags(tags: (string | undefined | null)[]) {
    const exactTags = tags.filter((tag) => tag != null)
    if (exactTags.length === 0) {
      return []
    }

    const posts = this.posts
    return posts.filter((post) => {
      return exactTags.every((tag) => {
        return post.data.tags && post.data.tags.includes(tag)
      })
    })
  }
}

export { PostsService }
