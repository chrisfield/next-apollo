import React from 'react'
import { setEnv } from '../flux/env/actions'
import { sessionLoad } from '../flux/session/actions'

const getEnv = () => {
  return {
    apiUrl: process.env.API_URL
  }
}

const sessionContext = (req) => {
  console.log(req.url)
  return {
    token: 'cookie-val',
    requestPath: req.url
  }
}

const withSession = function (Child) {
  class Higher extends React.Component {
    static async getInitialProps (props) {
      console.log('router', props.router)
      const { ctx: { isServer, store, req } } = props
      console.log('withSession isServer: ', isServer)
      if (isServer) {
        store.dispatch(setEnv(getEnv()))
        store.dispatch(sessionLoad(sessionContext(req)))
      }
      let pageProps = {}
      if (Child.getInitialProps) {
        pageProps = Child.getInitialProps(props)
      }
      return pageProps
    }

    render () {
      return <Child {...this.props}/>
    }
  }
  return Higher
}

export default withSession

