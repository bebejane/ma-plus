import s from './page.module.scss';
import cn from 'classnames';
import { AboutDocument } from '@/graphql';
import { Markdown } from 'next-dato-utils/components';
import { PageHeader } from '@/components';
import { apiQuery } from 'next-dato-utils/api';

export default async function About() {
	const { about } = await apiQuery(AboutDocument);

	return (
		<div className={s.container}>
			<aside>
				<PageHeader>Om oss</PageHeader>
				<Markdown className={cn(s.quotes, 'small')} content={about.quotes} />
			</aside>
			<article>
				<Markdown className={cn('intro', s.intro)} content={about.intro} />
				<Markdown className={s.text} content={about.text} />
			</article>
		</div>
	);
}
