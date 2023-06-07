import '/lib/styles/index.scss'
import type { AppProps } from 'next/app'
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';
import { Layout } from '/components';

function MyApp({ Component, pageProps, router }: AppProps) {

  const { asPath } = router
  const { site, seo, menu } = pageProps as any;

  return (
    <>
      <DefaultDatoSEO site={site} siteTitle={'MA Plus'} path={asPath} />
      <Layout menu={menu} title={'MA Plus'}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
