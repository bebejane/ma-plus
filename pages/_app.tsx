import '/lib/styles/index.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { pathToSectionId } from '/lib/menu';
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';
import { Layout } from '/components';

function MyApp({ Component, pageProps, router }: AppProps) {

  const { asPath } = router
  const { site, menu } = pageProps as any;

  useEffect(() => {

    const r = document.querySelector<HTMLElement>(':root')
    const sectionId = pathToSectionId(asPath)
    r.style.setProperty('--section-color', `var(--${sectionId ?? 'home'}-color)`);

  }, [asPath])

  const errorCode = parseInt(router.pathname.replace('/', ''))
  const isError = (!isNaN(errorCode) && (errorCode > 400 && errorCode < 600)) || router.pathname.replace('/', '') === '_error'

  if (isError) return <Component {...pageProps} />

  return (
    <>
      <DefaultDatoSEO site={site} siteTitle={'MA Plus'} path={asPath} />
      <Layout menu={menu} contact={pageProps.contact} title={'MA Plus'}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
