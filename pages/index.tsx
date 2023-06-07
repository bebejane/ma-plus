import styles from './index.module.scss'
import { withGlobalProps } from 'dato-nextjs-utils/hoc';
import type { GetStaticProps } from 'next'
import Link from 'next/link';

export type Props = { site: Site }

export default function Home({ }: Props) {

	return (
		<div className={styles.container}>
			MA Plus
		</div>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
