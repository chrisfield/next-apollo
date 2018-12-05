import { all } from 'redux-saga/effects'

import clock from '../clock/sagas'
import placeholder from '../placeholder/sagas'
import session from '../session/sagas'

function * rootSaga () {
  yield all([
    clock,
    placeholder,
    session
  ])
}

export default rootSaga
