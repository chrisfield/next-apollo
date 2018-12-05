import { combineReducers } from 'redux'

import clock from '../clock/reducers'
import count from '../count/reducers'
import dynamicPage from '../dynamic-page/reducers'
import placeholder from '../placeholder/reducers'
import session from '../session/reducers'

export default combineReducers({
  clock,
  count,
  dynamicPage,
  placeholder,
  session
})
