import '/lib/styles/index.scss'
import type { AppProps } from 'next/app'
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';

function MyApp({ Component, pageProps, router }: AppProps) {

  const { asPath } = router
  const { site, seo } = pageProps as any;

  return (
    <>
      <DefaultDatoSEO site={site} siteTitle={'MA Plus'} path={asPath} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
