import * as types from '../actions/actionTypes'

export function comments(state = {}, action) {
  switch (action.type) {
    case types.CLEAR_COMMENTS: {
      return {}  
    }
    case types.START_COMMENTS_SYNC_SUCCESS: {
      return {
        ...action.payload
      }  
    }
    default: {
      return state      
    }
  }
}