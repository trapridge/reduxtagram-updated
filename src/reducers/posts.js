export function posts(state = [], action) {
  switch (action.type) {
    case 'INCREMENT_LIKES_SUCCESS': {
      const updatedPost = state[action.postId]
      updatedPost.likes = action.newLikes
      return {
        ...state, [action.postId]: updatedPost 
      }
    }
    case 'LOAD_POSTS_SUCCESS': {
      return { ...state, ...action.payload }
    }
    case 'LOAD_POST_SUCCESS': {
      return { ...state, [action.postId]: action.payload }
    }
    default: {
      return state  
    }
  }
}
