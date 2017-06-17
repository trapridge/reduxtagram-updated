import * as types from '../actions/actionTypes'

export function postsReducer(posts = {}, action) {
  switch (action.type) {
    case types.INCREMENT_LIKES_SUCCESS: {
      const updatedPost = posts[action.postId]
      updatedPost.likes = action.newValue
      return {
        ...posts, [action.postId]: updatedPost 
      }
    }

    case types.INCREMENT_COMMENTS_SUCCESS:
    case types.DECREMENT_COMMENTS_SUCCESS: {
      const updatedPost = posts[action.postId]
      updatedPost.comments = action.newValue
      return {
        ...posts, [action.postId]: updatedPost 
      }
    }

    case types.LOAD_POSTS_SUCCESS: {
      return { ...action.payload }
    }

    case types.LOAD_POST_SUCCESS: {
      return { ...posts, [action.postId]: action.payload }
    }

    default: {
      return posts  
    }
  }
}
