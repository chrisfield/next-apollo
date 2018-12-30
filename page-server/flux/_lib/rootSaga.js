import { all } from 'redux-saga/effects'

import clock from '../clock/sagas'
import placeholder from '../placeholder/sagas'
import session from '../session/sagas'
import section from '../section/sagas'

function * rootSaga () {
  yield all([
    clock,
    placeholder,
    section,
    session
  ])
}

export default rootSaga
