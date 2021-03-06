import App, { Container } from 'next/app'
import withApolloClient from '../graph-ql/withApolloClient'
import { ApolloProvider } from 'react-apollo'

import { Provider as ReduxProvider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import createStore from '../flux/_lib/store'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, apolloClient, store } = this.props
    return <Container>
      <ApolloProvider client={apolloClient}>
        <ReduxProvider store={store}>
          <Component {...pageProps} />
        </ReduxProvider>
      </ApolloProvider>
    </Container>
  }
}

export default withApolloClient(withRedux(createStore)(
  withReduxSaga({ async: true })(
    MyApp
  )
))
