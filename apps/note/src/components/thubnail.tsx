import './thumbnail.css'

type ThumbnailProps = {
  title: string
  description: string
  url: string
}

export const Thumbnail = ({ title, description, url }: ThumbnailProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '72px' }}>
      <div style={{ fontSize: '36px', marginBottom: '24px' }}>{title}</div>
      <div style={{ marginBottom: '24px' }}>{description}</div>
      <div>{url}</div>
    </div>
  )
}
