import 'bootstrap/dist/css/bootstrap.min.css'

import Head from 'next/head'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Task List</title>
        <link rel="image/ico" href="../public/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp