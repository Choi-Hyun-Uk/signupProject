import React from 'react';
import Head from 'next/head';
import '../styles.css';
import wrapper from '../store/configureStore';

const App = ({ Component, pageProps }: any) => {
  console.log({ ...pageProps });
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>React LogIn</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
