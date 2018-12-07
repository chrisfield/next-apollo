import { actionTypes } from './actions'

const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SESSION_LOAD:
      return {
        ...state,
        ...action.session
      }

    case actionTypes.USER_LOAD_SUCCESS:
      return {
        ...state,
        user: action.user
      }

    case actionTypes.USER_LOGOUT:
      return {}

    default:
      return state
  }
}

export default reducer
