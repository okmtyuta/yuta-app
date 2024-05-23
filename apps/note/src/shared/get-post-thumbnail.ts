export const getPostThumbnail = (
  slug?: string | null,
  genre?: string | null,
  name?: string | null
) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/posts/**/*.{png,jpg}'
  )

  return (
    images[`/src/assets/posts/${slug}/${name}`] ||
    images[`/src/assets/posts/${name}`] ||
    images[`/src/assets/posts/${slug}/thumbnail.jpg`] ||
    images[`/src/assets/posts/${slug}/thumbnail.png`] ||
    images[`/src/assets/posts/${genre}/thumbnail.jpg`] ||
    images[`/src/assets/posts/${genre}/thumbnail.png`] ||
    images[`/src/assets/posts/thumbnail.jpg`] ||
    images[`/src/assets/posts/thumbnail.png`]
  )
}
