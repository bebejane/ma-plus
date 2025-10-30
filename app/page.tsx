import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, Markdown } from 'next-dato-utils/components';
import { AllWhatTypesDocument, StartDocument } from '@/graphql';
import Link from 'next/link';
import HomeGallery from '@/components/HomeGallery';

export default async function HomePage() {
	const { start, draftUrl } = await apiQuery(StartDocument);
	const { allWhats } = await apiQuery(AllWhatTypesDocument);

	return (
		<>
			<div className={s.container}>
				<HomeGallery whats={allWhats} start={start} />
				<div className={s.about}>
					<h3>Om oss</h3>
					<div className='intro'>
						<Markdown content={start.text} />
					</div>
					<Link className='mid' href='/om-oss'>
						Läs mer
					</Link>
				</div>
			</div>
			<DraftMode url={draftUrl} tag={start?.id} />
		</>
	);
}
