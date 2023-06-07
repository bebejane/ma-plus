import { apiQuery } from 'dato-nextjs-utils/api';
import { MenuDocument } from "/graphql";

const base: Menu = [
  { id: 'about-us', label: 'Om oss', slug: '/om-oss', sub: null },
  { id: 'what-we-do', label: 'Vad vi gör', slug: '/vad-vi-gor', sub: [] },
  { id: 'who-we-are', label: 'Vilka vi är', slug: '/vilka-vi-ar', sub: null },
  { id: 'contact', label: 'Kontakt', slug: '/kontakt', sub: null },
]

export const buildMenu = async (): Promise<Menu> => {
  const { whats }: { whats: WhatRecord[] } = await apiQuery(MenuDocument)

  return base.map(item => {

    switch (item.id) {
      case 'what-we-do':
        return { ...item, sub: whats.map(({ title, slug }) => ({ id: 'what-we-do', label: title, slug: `/vad-vi-gor/${slug}` })) }
      default:
        break;
    }
    return item
  })
}

export type Menu = MenuItem[]
export type SectionId = 'about-us' | 'what-we-do' | 'who-we-are' | 'contact'
export type MenuItem = {
  id: SectionId
  label: string
  slug?: string
  sub?: MenuItem[]
}
