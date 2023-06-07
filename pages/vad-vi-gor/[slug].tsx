import s from './[slug].module.scss'
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllWhatTypesDocument, WhatExamplesDocument } from "/graphql";
import { } from '/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useScrollInfo } from 'dato-nextjs-utils/hooks';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import { Image } from 'react-datocms';

export type Props = {
  whatExamples: WhatExampleRecord[]
  whatType: WhatRecord
}

export default function WhatWeDo({ whatExamples, whatType }: Props) {

  const { asPath } = useRouter()
  const { scrolledPosition, documentHeight, viewportHeight } = useScrollInfo()
  const [showWebPage, setShowWebPage] = useState(true)

  return (
    <div className={s.container}>
      <section className={s.header}>
        <header>
          <h3>{whatType.title}</h3>
          <h3>Exempel på uppdrag</h3>
        </header>
        <Markdown className={s.intro}>{whatType.intro}</Markdown>
      </section>
      <ul>
        {whatExamples.map(({ title, image, text, client, collaborators }, idx) =>
          <li>
            <figure>
              {image && <Image data={image.responsiveImage} pictureClassName={s.picture} />}
            </figure>
            <div className={s.content}>
              <h3>{title}</h3>
              <ul className={s.meta}>
                <li>
                  <span>Uppdragsgivare:</span>
                  <span>{client}</span>
                </li>
                <li>
                  <span>Medverkande:</span>
                  <span>{collaborators}</span>
                </li>
              </ul>
              <Markdown className={s.text}>{text}</Markdown>
            </div>
          </li>
        )}
      </ul>
    </div>
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
  const whatType = whats.find((item) => item.slug === slug)
  const { whatExamples } = await apiQuery(WhatExamplesDocument, { variables: { typeId: whatType.id } })

  return {
    props: {
      ...props,
      whatExamples,
      whatType
    },
    revalidate
  };
});