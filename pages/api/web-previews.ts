import { withWebPreviewsEdge } from 'dato-nextjs-utils/hoc';

export const config = {
  runtime: 'edge'
}

export default withWebPreviewsEdge(async ({ item, itemType }) => {

  let path = null;

  const { slug } = item.attributes

  switch (itemType.attributes.api_key) {
    case 'start':
      path = `/`
      break;
    case 'about':
      path = `/om`
      break;
    case 'what':
      path = `/`
      break;
    case 'what_example':
      path = `/`
      break;
    case 'we':
      path = `/`
      break;
    case 'employee':
      path = `/vilka-vi-ar`
      break;
    case 'contact':
      path = `/kontakt`
      break;
    default:
      break;
  }

  return path
})