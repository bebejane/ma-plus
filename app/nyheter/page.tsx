import s from './page.module.scss';
import cn from 'classnames';
import { apiQuery } from 'next-dato-utils/api';
import { AllNewsDocument } from '@/graphql';
import { Reveal } from '@/components';
import { Markdown } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { format } from 'date-fns';

export default async function NewsPage() {
	const { allNews } = await apiQuery(AllNewsDocument, { all: true });

	return (
		<div className={s.container}>
			<ul>
				{allNews.map(({ id, title, image, text, pdf, link, _createdAt }, idx) => (
					<li key={id}>
						<figure>
							{image && (
								<Image
									data={image.responsiveImage}
									className={s.image}
									pictureClassName={s.picture}
									placeholderClassName={s.placeholder}
									intersectionMargin='0px 0px 1000px 0px'
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
								<h4 className='small'>{format(new Date(_createdAt), 'yyyy-MM-dd')}</h4>
								<h1>
									<Markdown content={title} />
								</h1>
								<Markdown className={s.text} content={text} />
								{link && (
									<a href={link} className={cn(s.link, 'small')}>
										Läs mer
									</a>
								)}
							</div>
						</Reveal>
					</li>
				))}
			</ul>
		</div>
	);
}
