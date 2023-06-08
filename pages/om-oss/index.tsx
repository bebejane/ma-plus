import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps'
import type { GetStaticProps } from 'next'
import { AboutDocument } from '/graphql';
import cn from 'classnames';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export type Props = {
	about: AboutRecord
}

export default function About({ about }: Props) {

	return (
		<div className={s.container}>
			<aside>
				<h3>Om oss</h3>
				<p className={s.quotes}>
					<Markdown className="small">{about.quotes}</Markdown>
				</p>
			</aside>
			<article>
				<Markdown className={cn("intro", s.intro)}>{about.intro}</Markdown>
				<Markdown className={s.text}>{about.text}</Markdown>
			</article>
		</div>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AboutDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
