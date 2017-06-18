import * as types from '../actions/actionTypes'

export function postsReducer(posts = {}, action) {
  switch (action.type) {
    case types.INCREMENT_LIKES_SUCCESS: {
      const updatedPost = posts[action.meta.postId]
      updatedPost.likes = action.payload
      return {
        ...posts,
        [action.meta.postId]: updatedPost
      }
    }

    case types.INCREMENT_COMMENTS_SUCCESS:
    case types.DECREMENT_COMMENTS_SUCCESS: {
      const updatedPost = posts[action.meta.postId]
      updatedPost.comments = action.payload
      return {
        ...posts,
        [action.meta.postId]: updatedPost
      }
    }

    case types.LOAD_POSTS_SUCCESS: {
      return {
        ...action.payload
      }
    }

    case types.LOAD_POST_SUCCESS: {
      return {
        ...posts,
        [action.meta.postId]: action.payload
      }
    }

    default: {
      return posts
    }
  }
}
