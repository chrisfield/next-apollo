import fetch from 'isomorphic-unfetch'
import App from '../components/App'
import Header from '../components/Header'
import { loadSection } from '../flux/section/actions'
import Widget from '../components/widgets/lib/loader'
import Section from '../components/section'
import Head from 'next/head'
import withSession from './_with-session'

const Index = ({ requestPath, pages }) => (
  <App>
    <Head><title>{pages['pages'][0].title}</title></Head>
    <Header />
    <Section path={requestPath}>
      <div> little one</div> 
    </Section>
    {pages['pages'][0].title}
    Hello from: {requestPath}, pages{JSON.stringify(pages)}eee
  </App>
)

Index.getInitialProps = async (props) => {
  const { ctx: { store } } = props
  const apiUrl = store.getState().env.apiUrl
  const { requestPath } = store.getState().session
  const pagesResponse = await fetch(`${apiUrl}pages`)
  const pages = await pagesResponse.json()
  store.dispatch(loadSection(requestPath))
  return { requestPath, pages }
}

export default withSession(Index)
