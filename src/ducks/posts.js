import * as types from './actionTypes'
import { getDb } from '../backendConfig'

////////////////////////////////////////////////////////////////////////////////
//// reducer
////////////////////////////////////////////////////////////////////////////////

export default function reducer(posts = {}, action) {
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

////////////////////////////////////////////////////////////////////////////////
//// action creators
////////////////////////////////////////////////////////////////////////////////

let db = getDb()

export function _useMockDb(mockDb) {
  db = mockDb
  return db
}

export function loadPosts() {
  return dispatch => {
    dispatch({
      type: types.LOAD_POSTS_STARTED
    })
    db().ref('posts').once(
      'value',
      snapshot => {
        dispatch({
          type: types.LOAD_POSTS_SUCCESS,
          payload: snapshot.val()
        })
      },
      error => {
        dispatch({
          type: types.LOAD_POSTS_FAILURE,
          payload: error,
          error: true
        })
      }
    )
  }
}

export function loadPost(postId) {
  return dispatch => {
    dispatch({
      type: types.LOAD_POST_STARTED
    })
    db().ref(`posts/${postId}`).once(
      'value',
      snapshot => {
        dispatch({
          type: types.LOAD_POST_SUCCESS,
          payload: snapshot.val(),
          meta: {
            postId
          }
        })
      },
      error => {
        dispatch({
          type: types.LOAD_POST_FAILURE,
          payload: error,
          error: true
        })
      }
    )
  }
}

export function incrementLikes(postId) {
  return async dispatch => {
    dispatch({
      type: types.INCREMENT_LIKES_STARTED
    })
    try {
      const transActionResult = await db()
        .ref(`posts/${postId}/likes`)
        .transaction(currentLikes => currentLikes + 1)

      if (transActionResult.committed) {
        dispatch({
          type: types.INCREMENT_LIKES_SUCCESS,
          meta: {
            postId
          },
          payload: transActionResult.snapshot.val()
        })
      } else {
        dispatch({
          type: types.INCREMENT_LIKES_NOT_COMMITTED
        })
      }
    } catch (error) {
      dispatch({
        type: types.INCREMENT_LIKES_FAILURE,
        payload: error,
        error: true
      })
    }
  }
}

export function incrementComments(postId) {
  return async dispatch => {
    dispatch({
      type: types.INCREMENT_COMMENTS_STARTED
    })
    try {
      const transActionResult = await db()
        .ref(`posts/${postId}/comments`)
        .transaction(currentComments => currentComments + 1)

      if (transActionResult.committed) {
        dispatch({
          type: types.INCREMENT_COMMENTS_SUCCESS,
          meta: {
            postId
          },
          payload: transActionResult.snapshot.val()
        })
      } else {
        dispatch({
          type: types.INCREMENT_COMMENTS_NOT_COMMITTED
        })
      }
    } catch (error) {
      dispatch({
        type: types.INCREMENT_COMMENTS_FAILURE,
        payload: error,
        error: true
      })
    }
  }
}

export function decrementComments(postId) {
  return async dispatch => {
    dispatch({
      type: types.DECREMENT_COMMENTS_STARTED
    })
    try {
      const transActionResult = await db()
        .ref(`posts/${postId}/comments`)
        .transaction(currentComments => currentComments - 1)

      if (transActionResult.committed) {
        dispatch({
          type: types.DECREMENT_COMMENTS_SUCCESS,
          meta: {
            postId
          },
          payload: transActionResult.snapshot.val()
        })
      } else {
        dispatch({
          type: types.DECREMENT_COMMENTS_NOT_COMMITTED
        })
      }
    } catch (error) {
      dispatch({
        type: types.DECREMENT_COMMENTS_FAILURE,
        payload: error,
        error: true
      })
    }
  }
}
