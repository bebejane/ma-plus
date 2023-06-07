import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps'
import type { GetStaticProps } from 'next'
import Link from 'next/link';

export type Props = { site: Site }

export default function Home({ }: Props) {

	return (
		<div className={s.container}>
			home
		</div>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
