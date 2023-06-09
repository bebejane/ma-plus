import s from './[slug].module.scss'
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllWhatTypesDocument, WhatExamplesDocument } from "/graphql";
import { PageHeader } from '/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useScrollInfo } from 'dato-nextjs-utils/hooks';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import { Image } from 'react-datocms';
import useStore from '/lib/store';

export type Props = {
  whatExamples: WhatExampleRecord[]
  whatType: WhatRecord
}

export default function WhatWeDo({ whatExamples, whatType }: Props) {

  const [hidePageHeader] = useStore((state) => [state.hidePageHeader])

  return (
    <div className={s.container}>
      <section className={s.header}>
        <header>
          <PageHeader>
            {whatType.title}
          </PageHeader>
        </header>
        <div>
          <Markdown className={cn("intro", s.intro)}>{whatType.intro}</Markdown>
          <h3></h3>
        </div>

      </section>
      <ul>
        {whatExamples.map(({ title, image, text, client, collaborators, pdf }, idx) =>
          <li key={idx}>
            <figure>
              {image &&
                <Image
                  data={image.responsiveImage}
                  className={s.image}
                  pictureClassName={s.picture}
                />
              }
              {pdf && <a href={pdf.url} className={s.download}>PDF</a>}
            </figure>

            <div className={s.content}>
              <h1>{title}</h1>
              <ul className={cn(s.meta, "small")}>
                {client &&
                  <li>
                    <span>Uppdragsgivare:</span>
                    <span>{client}</span>
                  </li>
                }
                {collaborators &&
                  <li>
                    <span>Medverkande:</span>
                    <span>{collaborators}</span>
                  </li>
                }
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