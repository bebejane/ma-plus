import { apiQuery } from 'next-dato-utils/api';
import { MenuDocument } from '@/graphql';

const base: Menu = [
	{ id: 'about-us', label: 'Om oss', slug: '/om-oss', sub: null },
	{ id: 'what-we-do', label: 'Vad vi gör', slug: null, sub: [] },
	{ id: 'who-we-are', label: 'Vilka vi är', slug: '/vilka-vi-ar', sub: null },
	{ id: 'news', label: 'Nyheter', slug: '/nyheter', sub: null },
	{ id: 'contact', label: 'Kontakt', slug: null, sub: null },
];

export const buildMenu = async (): Promise<Menu> => {
	const { whats } = await apiQuery(MenuDocument);

	return base.map((item) => {
		switch (item.id) {
			case 'what-we-do':
				return {
					...item,
					sub: whats.map(({ title, slug }) => ({ id: 'what-we-do', label: title, slug: `/vad-vi-gor/${slug}` })),
				};
			default:
				break;
		}
		return item;
	});
};

export const pathToSectionId = (path: string): SectionId => {
	const slug = path?.split('/')[1];

	switch (slug) {
		case 'om-oss':
			return 'about-us';
		case 'vilka-vi-ar':
			return 'who-we-are';
		case 'vad-vi-gor':
			return 'what-we-do';
		case 'nyheter':
			return 'news';
		case 'kontakt':
			return 'contact';
		default:
			return 'home';
	}
};

export type Menu = MenuItem[];
export type SectionId = 'home' | 'about-us' | 'what-we-do' | 'who-we-are' | 'contact' | 'news';
export type MenuItem = {
	id: SectionId;
	label: string;
	slug?: string;
	sub?: MenuItem[];
};
