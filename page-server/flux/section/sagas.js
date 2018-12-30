import { put, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import fetch from 'isomorphic-unfetch'

import { select } from 'redux-saga/effects'
import { actionTypes, loadSectionSuccess, failure } from './actions'

es6promise.polyfill()

const getApiUrl = state => state.env.apiUrl

function * loadSectionSaga ({ path }) {
  try {
    const apiUrl = yield select(getApiUrl)
    console.log('apiUrl', apiUrl)
    const pagesResponse = yield fetch(`${apiUrl}pages`)
    const pages = yield pagesResponse.json()
    yield put(loadSectionSuccess({ path, ...pages.pages[0] }))
  } catch (err) {
    yield put(failure(err))
  }
}

export default takeLatest(actionTypes.LOAD_SECTION, loadSectionSaga)
  
