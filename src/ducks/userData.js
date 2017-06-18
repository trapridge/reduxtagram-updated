import * as types from './actionTypes'
import { getAuth } from '../backendConfig'

////////////////////////////////////////////////////////////////////////////////
//// reducer
////////////////////////////////////////////////////////////////////////////////

export default function reducer(userData = {}, action) {
  switch (action.type) {
    case types.AUTHENTICATE_USER_SUCCESS: {
      return { ...action.payload }
    }

    case types.LOGOUT_USER_SUCCESS:
    case types.LOGOUT_USER_FAILURE: {
      return {}
    }

    default: {
      return userData
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
//// action creators
////////////////////////////////////////////////////////////////////////////////

let auth = getAuth()

export function _useMockAuth(mockAuth) {
  auth = mockAuth
  return auth
}

export function login(providerName) {
  return async dispatch => {
    dispatch({ type: types.AUTHENTICATE_USER_STARTED })
    let provider
    switch (providerName) {
      case 'github':
        provider = new auth.GithubAuthProvider()
        break
      case 'google':
        provider = new auth.GoogleAuthProvider()
        break
      case 'twitter':
        provider = new auth.TwitterAuthProvider()
        break
      default:
        dispatch({
          type: types.AUTHENTICATE_USER_FAILURE,
          payload: new Error(`Provider with name "${providerName}" incorrect`),
          error: true
        })
        return
    }
    try {
      const authData = await auth().signInWithPopup(provider)
      dispatch({
        type: types.AUTHENTICATE_USER_SUCCESS,
        payload: authData
      })
    } catch (error) {
      dispatch({
        type: types.AUTHENTICATE_USER_FAILURE,
        payload: error,
        error: true
      })
    }
  }
}

export function logout() {
  return async dispatch => {
    dispatch({ type: types.LOGOUT_USER_STARTED })
    try {
      await auth().signOut()
      dispatch({ type: types.LOGOUT_USER_SUCCESS })
    } catch (error) {
      dispatch({
        type: types.LOGOUT_USER_FAILURE,
        payload: error,
        error: true
      })
    }
  }
}
