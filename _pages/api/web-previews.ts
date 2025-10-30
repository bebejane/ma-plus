import { withWebPreviewsEdge } from 'dato-nextjs-utils/hoc';
import { apiQuery } from 'next-dato-utils/api';
import { WhatTypeDocument } from '/graphql';

export const config = {
	runtime: 'edge',
};

export default withWebPreviewsEdge(async ({ item, itemType }) => {
	let path = null;

	switch (itemType.attributes.api_key) {
		case 'start':
			path = `/`;
			break;
		case 'about':
			path = `/om-oss`;
			break;
		case 'what':
			path = `/vad-vi-gor/${item.attributes.slug}`;
			break;
		case 'what_example':
			const {
				what: { slug },
			} = await apiQuery(WhatTypeDocument, { variables: { id: item.attributes.what_type } });
			path = `/vad-vi-gor/${slug}`;
			break;
		case 'we':
			path = `/vilka-vi-ar`;
			break;
		case 'employee':
			path = `/vilka-vi-ar`;
			break;
		case 'contact':
			path = `/`;
			break;
		case 'news':
			path = `/nyheter`;
			break;
		default:
			break;
	}

	return path;
});
