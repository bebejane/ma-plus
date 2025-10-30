import { apiQuery } from 'next-dato-utils/api';
import { DatoCmsConfig, getUploadReferenceRoutes } from 'next-dato-utils/config';
import { MetadataRoute } from 'next';
import { AllWhatTypesDocument, WhatTypeDocument } from '@/graphql';

export default {
	routes: {
		start: async () => ['/'],
		about: async () => ['/om-oss'],
		what: async () => ['/vad-vi-gor/:slug'],
		what_example: async ({ what_type }) => {
			const {
				what: { slug },
			} = await apiQuery(WhatTypeDocument, { variables: { id: what_type } });
			return [`/vad-vi-gor/${slug}`];
		},
		we: async () => ['/vilka-vi-ar'],
		employee: async () => ['/vilka-vi-ar'],
		contact: async () => ['/'],
		news: async () => ['/nyheter'],
		upload: async ({ id }) => getUploadReferenceRoutes(id),
	},
	manifest: async () => {
		return {
			name: 'MAA Studio',
			short_name: 'MAA Studio',
			description: 'MAA Studio website',
			start_url: '/',
			display: 'standalone',
			background_color: '#fcfcfc',
			theme_color: '##ed5113',
			icons: [
				{
					src: '/favicon.ico',
					sizes: 'any',
					type: 'image/x-icon',
				},
			],
		} satisfies MetadataRoute.Manifest;
	},
	sitemap: async () => {
		const { allWhats } = await apiQuery(AllWhatTypesDocument, { all: true });
		const whatsRoutes = allWhats.map(({ slug }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/vad-vi-gor/${slug}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		}));

		const staticRoutes: MetadataRoute.Sitemap = [
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
				lastModified: new Date(),
				changeFrequency: 'daily',
				priority: 1,
			},
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/om-oss`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.8,
			},
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/vilka-vi-ar`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.8,
			},
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/nyheter`,
				lastModified: new Date(),
				changeFrequency: 'weekly',
				priority: 0.8,
			},
		];
		return [...staticRoutes, ...whatsRoutes] as MetadataRoute.Sitemap;
	},
	robots: async () => {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
			},
		};
	},
} satisfies DatoCmsConfig;
