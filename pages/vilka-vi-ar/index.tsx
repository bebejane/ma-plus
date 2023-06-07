import s from './index.module.scss'
import cn from 'classnames'
import withGlobalProps from '/lib/withGlobalProps'
import type { GetStaticProps } from 'next'
import { AllEmployeesDocument } from '/graphql';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import { Image } from 'react-datocms';

export type Props = {
	employees: EmployeeRecord[]
}

export default function WhoWeAre({ employees }: Props) {

	return (
		<div className={s.container}>
			<section className={s.header}>
				<header>
					<h3>Vilka vi är</h3>
				</header>
				<p className={s.intro}>
					MA+ skräddarsyr team för varje enskilt projekt. Vissa personer återkommer i flera projekt och vissa plockas in för enskilda nedslag.
				</p>
			</section>
			<ul>
				{employees.map(({ name, image, text, }, idx) =>
					<li key={idx}>
						<figure>
							{image && <Image data={image.responsiveImage} pictureClassName={s.picture} />}
						</figure>
						<div className={s.content}>
							<h3>{name}</h3>
							<Markdown className={s.text}>{text}</Markdown>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllEmployeesDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
