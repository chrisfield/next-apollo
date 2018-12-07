export const actionTypes = {
  SET_ENV: 'SET_ENV'
}

export function setEnv (env) {
  return { type: actionTypes.SET_ENV, env }
}
