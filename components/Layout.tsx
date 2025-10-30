'use client';

import s from './Layout.module.scss';
import React, { useEffect, useState } from 'react';
import type { MenuItem } from '@/lib/menu';
import { buildMenu } from '@/lib/menu';
import { pathToSectionId } from '@/lib/menu';
import { useRouter } from 'next/router';
import { Menu, Content, Line, Intro, Footer } from '@/components';
import useStore from '@/lib/store';

export type LayoutProps = {
	children: React.ReactNode;
	menu: MenuItem[];
	contact: ContactRecord;
	title: string;
};

export default function Layout({ children, menu, contact }: LayoutProps) {
	return (
		<>
			<Menu items={menu} contact={contact} />
			<Content>{children}</Content>
			<Footer contact={contact} />
			<Line />
			<Intro />
		</>
	);
}
