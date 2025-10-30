import '/lib/styles/index.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { pathToSectionId } from '/lib/menu';
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';
import { useScrollInfo } from 'dato-nextjs-utils/hooks';
import { Layout } from '/components';
import useStore from '/lib/store';

function MyApp({ Component, pageProps, router }: AppProps) {

  const { asPath } = router
  const { site, menu } = pageProps as any;
  const [setScrollInfo] = useStore((state) => [state.setScrollInfo])
  const scrollInfo = useScrollInfo()

  useEffect(() => {
    setScrollInfo(scrollInfo)
  }, [scrollInfo])

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
      <DefaultDatoSEO site={site} siteTitle={'MAA Studio'} path={asPath} />
      <Layout menu={menu} contact={pageProps.contact} title={'MA Studio'}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
