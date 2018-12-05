export const actionTypes = {
  USER_LOGOUT: 'USER_LOGOUT',
  SESSION_LOAD: 'SESSION_LOAD',
  USER_LOAD_SUCCESS: 'USER_LOAD_SUCCESS',
  FAILURE: 'USER_ACTION_FAILURE'
}

export function userLogout () {
  return { type: actionTypes.USER_LOGOUT }
}

export function sessionLoad (requestContext) {
  return {
    type: actionTypes.SESSION_LOAD,
    requestContext
  }
}

export function userLoadSuccess (user) {
  return {
    type: actionTypes.USER_LOAD_SUCCESS,
    user
  }
}

export function failure (error) {
  return {
    type: actionTypes.USER_LOAD_FAILURE,
    error
  }
}

