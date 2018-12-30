import { actionTypes } from './actions'

const initialState = {}

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_SECTION:
      return {
        ...state,
        path: action.path
      }

    case actionTypes.LOAD_SECTION_SUCCESS:
      return {
        ...action.section
      }

    default:
      return state
  }
}

export default reducer
