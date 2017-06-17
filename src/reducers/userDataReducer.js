import * as types from '../actions/actionTypes'

export function userDataReducer(userData = {}, action) {
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
