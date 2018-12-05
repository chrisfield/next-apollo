import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import App from '../components/App'
import Header from '../components/Header'
import { addDynamicPageValues } from '../flux/dynamic-page/actions'
import Widget from '../components/widgets/lib/loader'
import Head from 'next/head'
import withSession from './_with-session'

const Index = ({ requestPath, pages }) => (
  <App>
    <Head><title>{pages['pages'][0].title}</title></Head>
    <Header />
    <Widget widgetPath={requestPath}>
      <div> little one</div> 
    </Widget>
    {pages['pages'][0].title}
    Hello from: {requestPath}, pages{JSON.stringify(pages)}eee
  </App>
)

Index.getInitialProps = async ({ ctx: { req, store } }) => {
  const pagesResponse = await fetch(`${req.customProps.apiUrl}pages`)
  const pages = await pagesResponse.json()
  store.dispatch(addDynamicPageValues({ requestPath: req.customProps.requestPath }))
  return { requestPath: req.customProps.requestPath, pages }
}

export default withSession(withRouter(connect()(Index)))
