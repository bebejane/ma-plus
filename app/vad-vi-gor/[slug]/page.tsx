import s from './page.module.scss';
import cn from 'classnames';
import { apiQuery } from 'next-dato-utils/api';
import { AllWhatTypesDocument, WhatExamplesDocument } from '@/graphql';
import { PageHeader, Reveal } from '@/components';
import { Markdown } from 'next-dato-utils/components';
import { Image } from 'react-datocms';

export type Props = {
	whatExamples: WhatExampleRecord[];
	whatType: WhatRecord;
};

export default async function WhatWeDo({ params }) {
	const { slug } = await params;

	const { allWhats } = await apiQuery(AllWhatTypesDocument, { all: true });
	const whatType = allWhats.find((item) => item.slug === slug);
	const { allWhatExamples } = await apiQuery(WhatExamplesDocument, { all: true, variables: { typeId: whatType.id } });

	return (
		<div className={s.container}>
			<section className={s.header}>
				<header>
					<PageHeader>{whatType.title}</PageHeader>
				</header>
				<div>
					<Markdown className={cn('intro', s.intro)} content={whatType.intro} />
				</div>
			</section>
			<ul>
				{allWhatExamples.map(({ title, image, text, client, collaborators, pdf }, idx) => (
					<li key={idx}>
						<figure>
							{image && (
								<Image
									data={image.responsiveImage}
									className={s.image}
									pictureClassName={s.picture}
									placeholderClassName={s.placeholder}
									intersectionMargin='0px 0px 200% 0px'
								/>
							)}
							{pdf && (
								<a href={pdf.url} className={s.download}>
									PDF
								</a>
							)}
						</figure>
						<Reveal effect='fadeUp' delay={500} duration={300} distance={1}>
							<div className={s.content}>
								<h1>
									<Markdown content={title} />
								</h1>
								<ul className={cn(s.meta, 'small')}>
									{client && (
										<li>
											<span>Uppdragsgivare:</span>
											<span>{client}</span>
										</li>
									)}
									{collaborators && (
										<li>
											<span>Medverkande:</span>
											<span>{collaborators}</span>
										</li>
									)}
								</ul>
								<Markdown className={s.text} content={text} />
							</div>
						</Reveal>
					</li>
				))}
			</ul>
		</div>
	);
}

export async function generateStaticParams() {
	const { allWhats } = await apiQuery(AllWhatTypesDocument, { all: true });
	return allWhats.map(({ slug }) => ({ slug }));
}
