import s from './page.module.scss';
import cn from 'classnames';
import { AllEmployeesDocument, WeDocument } from '@/graphql';
import { Markdown } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { PageHeader, Reveal } from '@/components';
import React from 'react';
import { apiQuery } from 'next-dato-utils/api';

export type Props = {
	employees: EmployeeRecord[];
	we: WeRecord;
};

export default async function WhoWeAre() {
	const { employees } = await apiQuery(AllEmployeesDocument);
	const { we } = await apiQuery(WeDocument);

	return (
		<div className={s.container}>
			<section className={s.header}>
				<header>
					<PageHeader>{we.title}</PageHeader>
				</header>
				<p className={cn('intro', s.intro)}>{we.intro}</p>
			</section>
			<ul>
				{employees.map(({ name, image, text }, idx) => (
					<React.Fragment key={idx}>
						{idx === 1 && (
							<li className={s.divider}>
								<h1>{we.headlineEmployee}</h1>
							</li>
						)}
						<li>
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
							</figure>
							<Reveal effect='fadeUp' delay={500} duration={300} distance={1}>
								<div className={s.content}>
									<h1>{name}</h1>
									<Markdown className={s.text} content={text} />
								</div>
							</Reveal>
						</li>
					</React.Fragment>
				))}
			</ul>
		</div>
	);
}
