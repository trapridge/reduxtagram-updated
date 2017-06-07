import * as types from '../actions/actionTypes'

export function posts(state = {}, action) {
  switch (action.type) {
    case types.INCREMENT_LIKES_SUCCESS: {
      const updatedPost = state[action.postId]
      updatedPost.likes = action.newValue
      return {
        ...state, [action.postId]: updatedPost 
      }
    }

    case types.INCREMENT_COMMENTS_SUCCESS:
    case types.DECREMENT_COMMENTS_SUCCESS: {
      const updatedPost = state[action.postId]
      updatedPost.comments = action.newValue
      return {
        ...state, [action.postId]: updatedPost 
      }
    }

    case types.LOAD_POSTS_SUCCESS: {
      return { ...action.payload }
    }

    case types.LOAD_POST_SUCCESS: {
      return { ...state, [action.postId]: action.payload }
    }

    default: {
      return state  
    }
  }
}
