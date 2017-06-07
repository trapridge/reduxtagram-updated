import { auth } from '../base'
import * as types from './actionTypes'

export function login(provider) {
  return async dispatch => {
    switch (provider) {
      case 'github':
        provider = new auth.GithubAuthProvider()
        break
      case 'google':
        provider = new auth.GoogleAuthProvider()
        break
      case 'twitter':
        provider = new auth.TwitterAuthProvider()
        break
    }
    dispatch({ type: types.AUTHENTICATE_USER_STARTED })
    try {
      const authData = await auth().signInWithPopup(provider)
      dispatch({ 
        type: types.AUTHENTICATE_USER_SUCCESS,
        payload: authData
      })
    } catch (error) {
      dispatch({ type: types.AUTHENTICATE_USER_FAILURE })
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
      dispatch({ type: types.LOGOUT_USER_FAILURE, error })
    }
  }
}
