import { AppProps } from 'next/app' 
import Head from 'next/head'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.png" type="/image/png"/>
        <title>Mapeamento do Ambiente</title>
      </Head>
      <Component {...pageProps}/>
    </>
  )
}

export default MyApp
