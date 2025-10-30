'use client';

import s from './Footer.module.scss';
import cn from 'classnames';
import { useRouter, usePathname } from 'next/navigation';
import { pathToSectionId } from '@/lib/menu';

type Props = {
	contact: ContactQuery['contact'];
};

export default function Footer({ contact }: Props) {
	const pathname = usePathname();
	const sectionId = pathToSectionId(pathname);

	return (
		<footer className={cn(s.footer, s[sectionId])}>
			<h3>
				<span>
					<a href={`mailto:${contact.email}`}>{contact.email}</a>
				</span>
				<span>
					<a href={`tel:${contact.phone}`}>{contact.phone}</a>
				</span>
				<span>
					<a href={contact.instagram}>Instagram</a>
				</span>
			</h3>
		</footer>
	);
}
