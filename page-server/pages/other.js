import React from 'react'
import {connect} from 'react-redux'

import {startClock, tickClock} from '../flux/clock/actions'
import {loadData} from '../flux/placeholder/actions'
import Page from '../components/Page'
import withPage from './_withPage';

class Other extends React.Component {
  static async getInitialProps (props) {
    const { store, isServer } = props.ctx
    store.dispatch(tickClock(isServer))
    store.dispatch(loadData())
    return { isServer }
  }

  componentDidMount () {
    this.props.dispatch(startClock())
  }

  render () {
    return <Page title='Other Page' linkTo='/' NavigateTo='Index Page' />
  }
}

export default connect()(withPage(Other));
