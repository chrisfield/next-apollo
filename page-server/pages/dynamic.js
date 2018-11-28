import fetch from 'isomorphic-unfetch'

const Index = ({ requestPath, pages }) => (
  <div>Hello from: {requestPath}, pages{JSON.stringify(pages)}</div>
)

Index.getInitialProps = async ({ ctx: { req } }) => {
  const pagesResponse = await fetch(`${req.customProps.apiUrl}pages`)
  const pages = await pagesResponse.json()
  return { requestPath: req.customProps.requestPath, pages }
}

export default Index
