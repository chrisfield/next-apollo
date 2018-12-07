import { actionTypes } from './actions'

const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ENV:
      return action.env

    default:
      return state
  }
}

export default reducer
