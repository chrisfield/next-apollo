import { put, takeLatest, all } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import fetch from 'isomorphic-unfetch'

import { actionTypes, userLoadSuccess, failure } from './actions'

es6promise.polyfill()

function * sessionLoadSaga ({ token }) {
  try {
    yield put(userLoadSuccess({ username: 'freddy loady', token }))
  } catch (err) {
    yield put(failure(err))
  }
}

export default takeLatest(actionTypes.SESSION_LOAD, sessionLoadSaga)
  
