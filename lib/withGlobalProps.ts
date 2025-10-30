import { apiQuery, SEOQuery } from 'next-dato-utils/api';
import { GetStaticProps, GetServerSideProps, GetStaticPropsContext } from 'next';
import { GlobalDocument, ContactDocument } from '/graphql';
import type { TypedDocumentNode } from '@apollo/client/core/types.js';
import { buildMenu } from '/lib/menu';

export default function withGlobalProps(opt: any, callback: Function): GetStaticProps | GetServerSideProps {
	const revalidate: number = parseInt(process.env.REVALIDATE_TIME);
	const queries: TypedDocumentNode[] = [GlobalDocument, ContactDocument];

	if (opt.query) queries.push(opt.query);
	if (opt.queries) queries.push.apply(queries, opt.queries);
	if (opt.seo) queries.push(SEOQuery(opt.seo));

	return async (context: GetStaticPropsContext) => {
		const props = await apiQuery(queries, { preview: context.preview });
		props.menu = await buildMenu();

		if (callback) return await callback({ context, props: { ...props }, revalidate });
		else return { props: { ...props }, context, revalidate };
	};
}
