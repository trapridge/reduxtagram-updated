import * as types from './actionTypes'
import { getDb } from '../backendConfig'

////////////////////////////////////////////////////////////////////////////////
//// reducer
////////////////////////////////////////////////////////////////////////////////

export default function reducer(comments = {}, action) {
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

////////////////////////////////////////////////////////////////////////////////
//// action creators
////////////////////////////////////////////////////////////////////////////////

let commentsSubscription
let db = getDb()

// for unit tests
export function _useMockDb(mockDb) {
  db = mockDb
  return db
}

export function startCommentsSync(postId) {
  return dispatch => {
    dispatch({ type: types.START_COMMENTS_SYNC_STARTED })
    commentsSubscription = db().ref(`comments/${postId}`).on(
      'value',
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
      }
    )
  }
}

export function stopCommentsSync(postId) {
  db().ref(`comments/${postId}`).off('value', commentsSubscription)
  return { type: types.STOP_COMMENTS_SYNC }
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
      dispatch({
        type: types.ADD_COMMENT_FAILURE,
        payload: error,
        error: true
      })
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
      dispatch({
        type: types.REMOVE_COMMENT_FAILURE,
        payload: error,
        error: true
      })
    }
  }
}
