import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps'
import type { GetStaticProps } from 'next'
import { AllEmployeesDocument } from '/graphql';

export type Props = {
	employees: EmployeeRecord[]
}

export default function WhoWeAre({ employees }: Props) {

	return (
		<ul className={s.container}>
			{employees.map(({ name, text, image }, idx) =>
				<li key={idx}>{name}</li>
			)}
		</ul>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllEmployeesDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
