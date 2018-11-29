import { actionTypes } from './actions'

const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_DYNAMIC_PAGE_VALUES:
      return {
        ...state,
        ...action.values
      }

    default:
      return state
  }
}

export default reducer
