import App, {Container} from 'next/app';
import React from 'react';
import withApolloClient from '../lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';


import { Provider as ReduxProvider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';


class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  render () {
    const {Component, pageProps, apolloClient, store} = this.props
    return <Container>
      <ReduxProvider store={store}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ReduxProvider>
    </Container>
  }
}

export default withRedux(createStore)(
  withReduxSaga({ async: true })(
    withApolloClient(MyApp)
  )
);
