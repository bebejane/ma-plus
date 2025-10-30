'use server';

import s from './page.module.scss';
import cn from 'classnames';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { StartDocument } from '@/graphql';

export default async function Home() {
	const { start, draftUrl } = await apiQuery(StartDocument);

	return (
		<>
			<div className={s.start}>hej</div>
			<DraftMode url={draftUrl} tag={start?.id} />
		</>
	);
}
