import { getDb } from '../base'
import * as types from './actionTypes'

let commentsSubscription
let db = getDb()

export function useMockDb(mockDb) {
  db = mockDb
  return db
}

export function startCommentsSync(postId) {
  return dispatch => {
    dispatch({ type: types.START_COMMENTS_SYNC_STARTED })
    commentsSubscription = db().ref(`comments/${postId}`).on('value', 
      snapshot => {
        dispatch({ 
          type: types.START_COMMENTS_SYNC_SUCCESS, 
          payload: snapshot.val(),
          meta: { postId }
        })
      }, 
      error => {
        dispatch({ 
          type: types.START_COMMENTS_SYNC_FAILURE, 
          payload: error, 
          error: true 
        })   
      })
  }
}

export function stopCommentsSync(postId) {
  db().ref(`comments/${postId}`).off('value', commentsSubscription)
  return ({ type: types.STOP_COMMENTS_SYNC })   
}

export function clearComments() {
  return { type: types.CLEAR_COMMENTS }
}

export function addComment(postId, user, text) {
  return async dispatch => {
    try {
      dispatch({ type: types.ADD_COMMENT_STARTED })
      const newComment = await db().ref(`comments/${postId}`).push()
      await newComment.set({ user, text })
      dispatch({ type: types.ADD_COMMENT_SUCCESS })
    } catch (error) {
      dispatch({ type: types.ADD_COMMENT_FAILURE, error })
    }
  }
}

export function removeComment(commentId, postId) {
  return async dispatch => {
    try {
      dispatch({ type: types.REMOVE_COMMENT_STARTED })
      await db().ref(`comments/${postId}/${commentId}`).remove()
      dispatch({ type: types.REMOVE_COMMENT_SUCCESS })
    } catch (error) { 
      dispatch({ type: types.REMOVE_COMMENT_FAILURE, error })
    }
  }
}
