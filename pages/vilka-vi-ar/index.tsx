import s from './index.module.scss'
import cn from 'classnames'
import withGlobalProps from '/lib/withGlobalProps'
import type { GetStaticProps } from 'next'
import { AllEmployeesDocument } from '/graphql';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import { Image } from 'react-datocms';
import { Reveal } from '/components'

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
				<p className={cn("intro", s.intro)}>
					MA+ skräddarsyr team för varje enskilt projekt. Vissa personer återkommer i flera projekt och vissa plockas in för enskilda nedslag.
				</p>
			</section>
			<ul>
				{employees.map(({ name, image, text, }, idx) =>
					<li key={idx}>
						<figure>
							{image && <Image data={image.responsiveImage} className={s.image} pictureClassName={s.picture} />}
						</figure>
						<Reveal effect="fade" delay={300} duration={300}>
							<div className={s.content}>
								<h1>{name}</h1>
								<Markdown className={s.text}>{text}</Markdown>
							</div>
						</Reveal>
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
