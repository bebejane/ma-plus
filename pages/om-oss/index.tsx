import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps'
import type { GetStaticProps } from 'next'
import { AboutDocument } from '/graphql';
import Link from 'next/link';

export type Props = {
	about: AboutRecord
}

export default function About({ about }: Props) {

	return (
		<div className={s.container}>
			About us
		</div>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AboutDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
