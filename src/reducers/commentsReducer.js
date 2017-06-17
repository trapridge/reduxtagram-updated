import * as types from '../actions/actionTypes'

export function commentsReducer(comments = {}, action) {
  switch (action.type) {
    case types.CLEAR_COMMENTS: {
      return {}
    }

    case types.START_COMMENTS_SYNC_SUCCESS: {
      if (action.payload !== null) {
        return { 
          ...comments, 
          [action.meta.postId]: action.payload 
        }  
      }
      delete comments[action.meta.postId]
      return {
        ...comments
      }
    }
    
    default: {
      return comments      
    }
  }
}
