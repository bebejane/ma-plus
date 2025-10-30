import s from './index.module.scss';
import cn from 'classnames';
import withGlobalProps from '/lib/withGlobalProps';
import { apiQuery } from 'next-dato-utils/api';
import { AllNewsDocument } from '/graphql';
import { Reveal } from '/components';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import { Image } from 'react-datocms';
import { format } from 'date-fns';

export type Props = {
	news: NewsRecord[];
};

export default function News({ news }: Props) {
	return (
		<div className={s.container}>
			<ul>
				{news.map(({ id, title, image, text, pdf, link, _createdAt }, idx) => (
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
									<Markdown>{title}</Markdown>
								</h1>
								<Markdown className={s.text}>{text}</Markdown>
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

export const getStaticProps = withGlobalProps(
	{ queries: [AllNewsDocument] },
	async ({ props, revalidate, context }: any) => {
		return {
			props: {
				...props,
			},
			revalidate,
		};
	}
);
