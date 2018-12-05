import { actionTypes as userActionTypes } from '../user/actions'

const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case userActionTypes.USER_LOAD:
      return action.request

    default:
      return state
  }
}

export default reducer
