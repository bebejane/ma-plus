import s from './index.module.scss'
import cn from 'classnames'
import withGlobalProps from '/lib/withGlobalProps'
import type { GetStaticProps } from 'next'
import { AllEmployeesDocument, WeDocument } from '/graphql';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import { Image } from 'react-datocms';
import { PageHeader, Reveal } from '/components'

export type Props = {
	employees: EmployeeRecord[]
	we: WeRecord
}

export default function WhoWeAre({ employees, we }: Props) {

	return (
		<div className={s.container}>
			<section className={s.header}>
				<header>
					<PageHeader>
						{we.title}
					</PageHeader>
				</header>
				<p className={cn("intro", s.intro)}>
					{we.intro}
				</p>
			</section>
			<ul>
				{employees.map(({ name, image, text }, idx) =>
					<>
						{idx === 1 &&
							<li key={`divider-${idx}`} className={s.divider}>
								<h1>{we.headlineEmployee}</h1>
							</li>
						}
						<li key={idx}>
							<figure>
								{image && <Image data={image.responsiveImage} className={s.image} pictureClassName={s.picture} />}
							</figure>
							<Reveal effect="fadeUp" delay={500} duration={300} distance={1}>
								<div className={s.content}>
									<h1>{name}</h1>
									<Markdown className={s.text}>{text}</Markdown>
								</div>
							</Reveal>
						</li>
					</>
				)}
			</ul>
		</div>
	);
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllEmployeesDocument, WeDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
