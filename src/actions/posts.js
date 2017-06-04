import { db } from '../base'

export function loadPosts() {
  return dispatch => {
    db.ref('posts').once('value', snapshot => {
      dispatch({ type: 'LOAD_POSTS_SUCCESS', payload: snapshot.val() })
    }, error => {
      dispatch({ type: '', payload: error })
    })
  }
}

export function loadPost(postId) {
  return dispatch => {
    db.ref(`posts/${postId}`).once('value', snapshot => {
      dispatch({ 
        type: 'LOAD_POST_SUCCESS', 
        payload: snapshot.val(),
        postId
      })
    }, error => {
      dispatch({ type: '', payload: error })
    })
  }
}

export function increment(postId) {
  return async (dispatch) => {
    dispatch({ type: 'INCREMENT_LIKES_STARTED'}) 
    try {
      const transActionResult = await db.ref(`posts/${postId}/likes`)
        .transaction(currentLikes => currentLikes + 1)

      if (transActionResult.committed) {
        dispatch({ 
          type: 'INCREMENT_LIKES_SUCCESS', 
          postId,
          newLikes: transActionResult.snapshot.val()
        })
      }
      else {
        dispatch({ type: 'INCREMENT_LIKES_NOT_COMMITTED'}) 
      }
    } catch (error) {
      dispatch({ 
        type: 'INCREMENT_LIKES_ERROR',
        payload: error
      }) 
    }
  }
}
