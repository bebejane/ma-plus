import { withRevalidate } from 'dato-nextjs-utils/hoc'

export default withRevalidate(async (record, revalidate) => {

  const { api_key: apiKey } = record.model;
  const { slug } = record
  const paths = []

  switch (apiKey) {
    case 'start':
      paths.push(`/`)
      break;
    case 'about':
      paths.push(`/om-oss`)
      break;
    case 'what_example':
      paths.push(`/vad-vi-gor/${slug}`)
      break;
    case 'we':
      paths.push(`/vilka-vi-ar`)
      break;
    case 'employee':
      paths.push(`/vilka-vi-ar`)
      break;
    case 'contact':
      paths.push(`/kontakt`)
      break;
    default:
      break;
  }
  revalidate(paths)
})