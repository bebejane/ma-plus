import s from './index.module.scss'
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from "dato-nextjs-utils/api";
import { AllNewsDocument } from "/graphql";
import { Reveal } from '/components';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import { Image } from 'react-datocms';

export type Props = {
  news: NewsRecord[]
}

export default function News({ news }: Props) {

  return (
    <div className={s.container}>
      <ul>
        {news.map(({ id, title, image, text, pdf, link }, idx) =>
          <li key={id}>
            <figure>
              {image &&
                <Image
                  data={image.responsiveImage}
                  className={s.image}
                  pictureClassName={s.picture}
                  placeholderClassName={s.placeholder}
                  intersectionMargin="0px 0px 1000px 0px"
                />
              }
              {pdf && <a href={pdf.url} className={s.download}>PDF</a>}
            </figure>
            <Reveal effect="fadeUp" delay={500} duration={300} distance={1}>
              <div className={s.content}>
                <h1><Markdown>{title}</Markdown></h1>
                <Markdown className={s.text}>{text}</Markdown>
              </div>
            </Reveal>
          </li>
        )}
      </ul>
    </div>
  );
}


export const getStaticProps = withGlobalProps({ queries: [AllNewsDocument] }, async ({ props, revalidate, context }: any) => {

  return {
    props: {
      ...props,
    },
    revalidate
  };
});