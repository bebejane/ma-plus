'use client';

import s from './Menu.module.scss';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import type { Menu, MenuItem } from '@/lib/menu';
import { pathToSectionId } from '@/lib/menu';
import Link from 'next/link';
import useStore from '@/lib/store';
import useDevice from '@/lib/hooks/useDevice';
import { useScrollInfo } from 'next-dato-utils/hooks';

type MenuProps = { items: Menu; contact: ContactQuery['contact'] };

export default function Menu({ items, contact }: MenuProps) {
	const pathname = usePathname();
	const menuRef = useRef<HTMLUListElement | null>(null);

	const [showMenu, setShowMenu, scrollInfo] = useStore((state) => [
		state.showMenu,
		state.setShowMenu,
		state.scrollInfo,
	]);
	const [hovering, setHovering] = useState(false);
	const [selected, setSelected] = useState<MenuItem | undefined>();
	const [selectedSub, setSelectedSub] = useState<MenuItem | undefined>();
	const { scrolledPosition, isScrolledUp } = useScrollInfo();
	const { isMobile, isDesktop } = useDevice();
	const whatWeDoSection = selected?.id === 'what-we-do';
	const blurBackground = scrolledPosition > 0 && (isScrolledUp || hovering || selectedSub);
	const hideInactiveMenuItems = scrolledPosition > 0 && isDesktop && !isScrolledUp && selected && !selectedSub;

	const handleClick = (ev) => {
		const item = items.find((item) => item.id === ev.currentTarget.id);
		const sSub = selectedSub?.id === item.id ? undefined : item;
		const r = document.querySelector<HTMLElement>(':root');
		const sectionId = pathToSectionId(pathname);
		r.style.setProperty('--section-color', `var(--${sSub ? item.id : (sectionId ?? 'home')}-color)`);

		if ((ev.target as HTMLElement).tagName === 'SPAN') setSelectedSub(sSub);
	};

	useEffect(() => {
		if (!whatWeDoSection) setSelectedSub(undefined);
		setShowMenu(false);
	}, [whatWeDoSection, pathname]);

	useEffect(() => {
		const r = document.querySelector<HTMLElement>(':root');
		const sectionId = pathToSectionId(pathname);
		r.style.setProperty('--section-color', `var(--${sectionId ?? 'home'}-color)`);
	}, [pathname]);

	useEffect(() => {
		const selected = items.find((item) => item.id === pathToSectionId(pathname));
		setSelected(selected);
		if (whatWeDoSection) setSelectedSub(selected?.sub?.find((item) => item.slug === pathname));
	}, [whatWeDoSection, pathname]);

	useEffect(() => {
		if (hideInactiveMenuItems) setSelectedSub(undefined);
	}, [hideInactiveMenuItems]);

	useEffect(() => {
		if (showMenu) return;
		const r = document.querySelector<HTMLElement>(':root');
		const sectionId = pathToSectionId(pathname);
		r.style.setProperty('--section-color', `var(--${sectionId}-color)`);
	}, [showMenu]);

	return (
		<>
			<nav
				className={cn(s.menu, showMenu && s.hide, blurBackground && s.background, pathname === '/' && s.home)}
				onMouseEnter={() => setHovering(true)}
				onMouseLeave={() => setHovering(false)}
			>
				<div id='logo' className={s.logo}>
					<Link href={'/'}>
						<span className='logo'>MAA Studio</span>
					</Link>
				</div>

				<div className={s.burger} onClick={() => setShowMenu(!showMenu)}>
					{!showMenu ? 'Menu' : 'Stäng'}
				</div>

				<ul ref={menuRef} className={cn(showMenu && s.show)}>
					{items.map((item, idx) => {
						const isSelected = selected?.id === item.id;
						const isSubSelected = selectedSub?.id === item.id;

						return (
							<li
								id={item.id}
								key={idx}
								onClick={handleClick}
								data-type={item.id}
								className={cn(
									isSelected && !selectedSub && s.selected,
									selectedSub && isSelected && s.inactive,
									isSubSelected && s[item.id],
									hideInactiveMenuItems && !isSelected && s.hidden
								)}
							>
								{item.slug ? (
									<Link href={item.slug} data-type={item.id}>
										{item.label}
									</Link>
								) : (
									<span data-type={item.id}>{item.label}</span>
								)}
								{((isMobile && isSubSelected) || isDesktop) && selectedSub?.id === item.id && (
									<div className={cn(s.sub, selectedSub && s.show)}>
										{selectedSub?.id === 'contact' && (
											<ul data-type={selectedSub.id}>
												<li>
													<a href={`mailto:${contact.email}`}>{contact.email}</a>
												</li>
												<li>
													<a href={`tel:${contact.phone}`}>{contact.phone}</a>
												</li>
												<li>
													<a href={contact.instagram}>Instagram</a>
												</li>
											</ul>
										)}
										{selectedSub?.id === 'what-we-do' && (
											<ul data-type={selectedSub.id}>
												{items
													.find((item) => item.id === 'what-we-do')
													?.sub.map((item, idx) => (
														<li key={idx} className={cn(pathname === item.slug && s.selected)}>
															<Link href={item.slug} data-type={selectedSub.id}>
																{item.label}
															</Link>
														</li>
													))}
											</ul>
										)}
									</div>
								)}
							</li>
						);
					})}
				</ul>
			</nav>

			<div className={cn(s.desktopSub, selectedSub && s.show, 'mid')}>
				{selectedSub?.id === 'contact' && (
					<ul>
						<li>
							<a data-type={selectedSub.id} href={`mailto:${contact.email}`}>
								{contact.email}
							</a>
						</li>
						<li>
							<a data-type={selectedSub.id} href={`tel:${contact.phone}`}>
								{contact.phone}
							</a>
						</li>
						<li>
							<a data-type={selectedSub.id} href={contact.instagram}>
								Instagram
							</a>
						</li>
					</ul>
				)}
				{selectedSub?.id === 'what-we-do' && (
					<ul data-type={selectedSub.id}>
						{items
							.find((item) => item.id === 'what-we-do')
							?.sub.map((item, idx) => (
								<li key={idx} className={cn(pathname === item.slug && s.selected)}>
									<Link href={item.slug} data-type={selectedSub.id}>
										{item.label}
									</Link>
								</li>
							))}
					</ul>
				)}
			</div>
		</>
	);
}
