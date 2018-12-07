import React from 'react'
import { connect } from 'react-redux'
import dynamic from 'next/dynamic'

const Card = dynamic(import('../card'))
const PageOne = dynamic(import('../page-one'))

const Loader = ({ requestPath }) => {
  switch (requestPath) {
    case '/page-one.html': {
      return <PageOne />
    }
    default: {
      return  <p> no widget for {requestPath}</p>
    }
  }
}

const mapStateToProps = state => ({
  requestPath: state.session.requestPath
})
export default connect(mapStateToProps)(Loader)