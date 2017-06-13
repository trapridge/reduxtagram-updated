import { mockDb } from '../mockFirebase'
import * as types from './actionTypes'
import {
  useMockDb,
  loadPosts
} from './posts'

const db = useMockDb(mockDb())

describe('posts action creators', () => {
  afterEach(() => {
    db().clearExpectations()
  })

  describe('startCommentsSync() action creator', () => {
    it('should dispatch expected actions if loading succeeds', async () => {
      const expectedActions = [
        [{ type: types.LOAD_POSTS_STARTED }], 
        [{ type: types.LOAD_POSTS_SUCCESS, payload: 'data' }], 
      ]

      const dispatch = jest.fn()

      db().expectOnceSuccess({ payload: 'data' })

      loadPosts()(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if loading fails', async () => {
      const expectedActions = [
        [{ type: types.LOAD_POSTS_STARTED }], 
        [{ type: types.LOAD_POSTS_FAILURE, payload: 'problem', error: true }], 
      ]

      const dispatch = jest.fn()

      db().expectOnceFailure({ payload: 'problem', error: true })

      loadPosts()(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })

  // describe('stopCommentsSync() action creator', () => {
  //   it('should dispatch expected action', async () => {
  //     const expectedActions = [
  //       { type: types.STOP_COMMENTS_SYNC }
  //     ]

  //     db().expectOff()
  //     const action = stopCommentsSync()

  //     expect([action]).toEqual(expectedActions)
  //   })
  // })

  // describe('clearComments() action creator', () => {
  //   it('should dispatch expected action', async () => {
  //     const expectedActions = [
  //       { type: types.CLEAR_COMMENTS }
  //     ]

  //     const action = clearComments()

  //     expect([action]).toEqual(expectedActions)
  //   })
  // })

  // describe('addComment() action creator', () => {
  //   it('should dispatch expected actions when it succeeds', async () => {
  //     const expectedActions = [
  //       [{ type: types.ADD_COMMENT_STARTED }], 
  //       [{ type: types.ADD_COMMENT_SUCCESS }], 
  //     ]
  //     const dispatch = jest.fn()

  //     db().expectPushResolved()
  //     db().expectSetResolved()

  //     await addComment('a', 'b', 'c')(dispatch)

  //     expect(dispatch.mock.calls).toEqual(expectedActions)
  //   })

  //   it('should dispatch expected actions when set() fails', async () => {
  //     const expectedActions = [
  //       [{ type: types.ADD_COMMENT_STARTED }], 
  //       [{ type: types.ADD_COMMENT_FAILURE, error: 'problem' }], 
  //     ]
  //     const dispatch = jest.fn()

  //     db().expectPushResolved()
  //     db().expectSetRejected({ error: 'problem' })

  //     await addComment('a', 'b', 'c')(dispatch)

  //     expect(dispatch.mock.calls).toEqual(expectedActions)
  //   })

  //   it('should dispatch expected actions when push() fails', async () => {
  //     const expectedActions = [
  //       [{ type: types.ADD_COMMENT_STARTED }], 
  //       [{ type: types.ADD_COMMENT_FAILURE, error: 'problem' }], 
  //     ]
  //     const dispatch = jest.fn()

  //     db().expectPushRejected({ error: 'problem' })

  //     await addComment('a', 'b', 'c')(dispatch)

  //     expect(dispatch.mock.calls).toEqual(expectedActions)
  //   })
  // })

  // describe('removeComment() action creator', () => {
  //   it('should dispatch expected actions when it succeeds', async () => {
  //     const expectedActions = [
  //       [{ type: types.REMOVE_COMMENT_STARTED }], 
  //       [{ type: types.REMOVE_COMMENT_SUCCESS }], 
  //     ]
  //     const dispatch = jest.fn()

  //     db().expectRemoveResolved()

  //     await removeComment('a', 'b')(dispatch)

  //     expect(dispatch.mock.calls).toEqual(expectedActions)
  //   })

  //   it('should dispatch expected actions when remove() fails', async () => {
  //     const expectedActions = [
  //       [{ type: types.REMOVE_COMMENT_STARTED }], 
  //       [{ type: types.REMOVE_COMMENT_FAILURE, error: 'problem' }], 
  //     ]
  //     const dispatch = jest.fn()

  //     db().expectRemoveRejected({ error: 'problem' })

  //     await removeComment('a', 'b')(dispatch)

  //     expect(dispatch.mock.calls).toEqual(expectedActions)
  //   })
  // })
})
