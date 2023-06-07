import s from './[...project].module.scss'
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllWhatTypesDocument, WhatExamplesDocument } from "/graphql";
import { } from '/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useScrollInfo } from 'dato-nextjs-utils/hooks';

export type Props = {
  whatExamples: WhatExampleRecord[]
}

export default function WhatWeDo({ whatExamples }: Props) {

  const { asPath } = useRouter()
  const { scrolledPosition, documentHeight, viewportHeight } = useScrollInfo()
  const [showWebPage, setShowWebPage] = useState(true)

  return (
    <ul>
      {whatExamples.map(({ title }, idx) =>
        <li>{title}</li>
      )}
    </ul>
  );
}

export async function getStaticPaths() {

  const { whats } = await apiQuery(AllWhatTypesDocument)
  const paths = whats.map(({ slug }) => ({ params: { slug: slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const { slug } = context.params

  const { whats } = await apiQuery(AllWhatTypesDocument)
  const typeId = whats.find((item) => item.slug === slug)?.id
  const { whatExamples } = await apiQuery(WhatExamplesDocument, { variables: { typeId } })

  return {
    props: {
      ...props,
      whatExamples
    },
    revalidate
  };
});