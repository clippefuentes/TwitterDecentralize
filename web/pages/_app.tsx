import type { AppProps } from 'next/app'

import GlobalContext from '../context'

import Layout from '../component/layout'

import '../styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContext>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </GlobalContext>
  )
}

export default MyApp
