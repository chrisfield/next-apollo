import React from 'react'
import { connect } from 'react-redux'

import { startClock, tickClock } from '../flux/clock/actions'
import { loadData } from '../flux/placeholder/actions'
import Page from '../components/Page'
import withSession from './_with-session'

class Other extends React.Component {
  static async getInitialProps (props) {
    const { store, isServer } = props.ctx
    store.dispatch(tickClock(isServer))
    store.dispatch(loadData())
    return { isServer }
  }

  componentDidMount () {
    this.props.startClockSoon();
  }

  render () {
    return <Page title='Other Page' linkTo='/' NavigateTo='Index Page' />
  }
}

const mapDispatchToProps = (dispatch) => {
  // TODO investigate why this timeout workaround is needed

  const startClockSoon = () => { 
    setTimeout(dispatchStartClock, 100) 
  }

  const dispatchStartClock = () => {
    try {
      dispatch(startClock()) 
    } catch (ex) {
      console.log('retry startClock (workaround)', ex)
      startClockSoon()
    }
  }

  return { startClockSoon }
}

export default connect(undefined, mapDispatchToProps)(withSession(Other))
