import { getDb } from '../base'
import * as types from './actionTypes'

let db = getDb()

export function useMockDb(mockDb) {
  db = mockDb
  return db
}

export function loadPosts() {
  return dispatch => {
    dispatch({ type: types.LOAD_POSTS_STARTED })
    db().ref('posts').once('value', snapshot => {
      dispatch({ type: types.LOAD_POSTS_SUCCESS, payload: snapshot.val() })
    }, error => {
      dispatch({ type: types.LOAD_POSTS_FAILURE, payload: error, error: true })
    })
  }
}

export function loadPost(postId) {
  return dispatch => {
    dispatch({ type: types.LOAD_POST_STARTED })
    db().ref(`posts/${postId}`).once('value', snapshot => {
      dispatch({ 
        type: types.LOAD_POST_SUCCESS, 
        payload: snapshot.val(),
        postId
      })
    }, error => {
      dispatch({ type: types.LOAD_POST_FAILURE, error })
    })
  }
}

export function incrementLikes(postId) {
  return async (dispatch) => {
    dispatch({ type: types.INCREMENT_LIKES_STARTED}) 
    try {
      const transActionResult = await db().ref(`posts/${postId}/likes`)
        .transaction(currentLikes => currentLikes + 1)

      if (transActionResult.committed) {
        dispatch({ 
          type: types.INCREMENT_LIKES_SUCCESS, 
          postId,
          newValue: transActionResult.snapshot.val()
        })
      }
      else {
        dispatch({ type: types.INCREMENT_LIKES_NOT_COMMITTED })
      }
    } catch (error) {
      dispatch({ type: types.INCREMENT_LIKES_FAILURE, error }) 
    }
  }
}

export function incrementComments(postId) {
  return async (dispatch) => {
    dispatch({ type: types.INCREMENT_COMMENTS_STARTED }) 
    try {
      const transActionResult = await db().ref(`posts/${postId}/comments`)
        .transaction(currentComments => currentComments + 1)

      if (transActionResult.committed) {
        dispatch({ 
          type: types.INCREMENT_COMMENTS_SUCCESS, 
          postId,
          newValue: transActionResult.snapshot.val()
        })
      }
      else {
        dispatch({ type: types.INCREMENT_COMMENTS_NOT_COMMITTED }) 
      }
    } catch (error) {
      dispatch({ 
        type: types.INCREMENT_COMMENTS_FAILURE,
        payload: error
      }) 
    }
  }
}

export function decrementComments(postId) {
  return async (dispatch) => {
    dispatch({ type: types.DECREMENT_COMMENTS_STARTED}) 
    try {
      const transActionResult = await db.ref(`posts/${postId}/comments`)
        .transaction(currentComments => currentComments - 1)

      if (transActionResult.committed) {
        dispatch({ 
          type: types.DECREMENT_COMMENTS_SUCCESS, 
          postId,
          newValue: transActionResult.snapshot.val()
        })
      }
      else {
        dispatch({ type: types.DECREMENT_COMMENTS_NOT_COMMITTED }) 
      }
    } catch (error) {
      dispatch({ 
        type: types.DECREMENT_COMMENTS_FAILURE,
        payload: error
      }) 
    }
  }
}