'use client';

import s from './Line.module.scss';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { pathToSectionId } from '@/lib/menu';

type Props = {};

export default function Line({}: Props) {
	const pathname = usePathname();
	const sectionId = pathToSectionId(pathname);

	return <hr className={cn(s.line, s[sectionId])} />;
}
