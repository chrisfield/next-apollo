import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import App from '../components/App'
import Header from '../components/Header'
import { addDynamicPageValues } from '../flux/dynamic-page/actions'

const Index = ({ router: { pathname }, requestPath, pages }) => (
  <App>
    <Header/>
    Hello from: {requestPath}, pages{JSON.stringify(pages)}
    <p>
      pathname: {pathname}
    </p>
  </App>
)

Index.getInitialProps = async ({ ctx: { req, store } }) => {
  const pagesResponse = await fetch(`${req.customProps.apiUrl}pages`)
  const pages = await pagesResponse.json()
  store.dispatch(addDynamicPageValues({ requestPath: req.customProps.requestPath }))
  return { requestPath: req.customProps.requestPath, pages }
}

export default withRouter(connect()(Index))
