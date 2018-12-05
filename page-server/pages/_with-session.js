import React from 'react'
import { sessionLoad } from '../flux/session/actions'

const requestContext = (req) => {
  return {
    token: 'cookie-val',
    path: req.customProps.requestPath || '/'
  }
}

const withSession = function (Child) {
  return class Higher extends React.Component {
    static async getInitialProps (props) {
      const { ctx: { store, req } } = props
      store.dispatch(sessionLoad(requestContext(req)))
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
}

export default withSession

