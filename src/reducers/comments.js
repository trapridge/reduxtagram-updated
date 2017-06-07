import * as types from '../actions/actionTypes'

export function comments(state = {}, action) {
  switch (action.type) {
    case types.CLEAR_COMMENTS: {
      return {}  
    }

    case types.START_COMMENTS_SYNC_SUCCESS: {
      if (action.payload) {
        return { ...state, [action.postId]: action.payload }  
      }
      return state
    }
    
    default: {
      return state      
    }
  }
}