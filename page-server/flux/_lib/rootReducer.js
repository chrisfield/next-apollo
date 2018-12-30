import { combineReducers } from 'redux'

import clock from '../clock/reducers'
import count from '../count/reducers'
import env from '../env/reducers'
import section from '../section/reducers'
import placeholder from '../placeholder/reducers'
import session from '../session/reducers'

export default combineReducers({
  clock,
  count,
  section,
  env,
  placeholder,
  session
})
