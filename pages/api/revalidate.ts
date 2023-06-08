import { withRevalidate } from 'dato-nextjs-utils/hoc'
import { apiQuery } from 'dato-nextjs-utils/api';
import { WhatTypeDocument } from '/graphql';


export default withRevalidate(async (record, revalidate) => {

  const { api_key: apiKey } = record.model;

  const paths = []

  switch (apiKey) {
    case 'start':
      paths.push(`/`)
      break;
    case 'about':
      paths.push(`/om-oss`)
      break;
    case 'what':
      paths.push(`/vad-vi-gor/${record.slug}`)
      break;
    case 'what_example':
      const { what: { slug } } = await apiQuery(WhatTypeDocument, { variables: { id: record.what_type } })
      paths.push(`/vad-vi-gor/${slug}`)
      break;
    case 'we':
      paths.push(`/vilka-vi-ar`)
      break;
    case 'employee':
      paths.push(`/vilka-vi-ar`)
      break;
    case 'contact':
      paths.push(`/`)
      break;
    default:
      break;
  }
  revalidate(paths)
})