import { mockDb } from '../mockFirebase'
import * as types from './actionTypes'
import {
  useMockDb,
  addComment,
  startCommentsSync,
  stopCommentsSync,
  clearComments,
  removeComment
} from './comments'

const db = useMockDb(mockDb())

describe('comments action creators', () => {
  afterEach(() => {
    db().clearExpectations()
  })

  describe('startCommentsSync() action creator', () => {
    it('should dispatch expected actions if sync succeeds', () => {
      const expectedActions = [
        [{ type: types.START_COMMENTS_SYNC_STARTED }], 
        [{ 
          type: types.START_COMMENTS_SYNC_SUCCESS, 
          payload: 'data',
          meta: { postId: 'a' },
        }], 
      ]

      const dispatch = jest.fn()

      db().expectOnSuccess({ 
        payload: 'data',
        meta: { postId: 'a' }, 
      })

      startCommentsSync('a')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if sync fails', () => {
      const expectedActions = [
        [{ type: types.START_COMMENTS_SYNC_STARTED }], 
        [{ 
          type: types.START_COMMENTS_SYNC_FAILURE, 
          payload: 'problem',
          error: true
        }], 
      ]

      const dispatch = jest.fn()

      db().expectOnFailure({ 
        payload: 'problem',
        error: true 
      })

      startCommentsSync('a')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })

  describe('stopCommentsSync() action creator', () => {
    it('should dispatch expected action', () => {
      const expectedActions = [
        { type: types.STOP_COMMENTS_SYNC }
      ]

      db().expectOff()
      const action = stopCommentsSync()

      expect([action]).toEqual(expectedActions)
    })
  })

  describe('clearComments() action creator', () => {
    it('should dispatch expected action', () => {
      const expectedActions = [
        { type: types.CLEAR_COMMENTS }
      ]

      const action = clearComments()

      expect([action]).toEqual(expectedActions)
    })
  })

  describe('addComment() action creator', () => {
    it('should dispatch expected actions when it succeeds', async () => {
      const expectedActions = [
        [{ type: types.ADD_COMMENT_STARTED }], 
        [{ type: types.ADD_COMMENT_SUCCESS }], 
      ]
      const dispatch = jest.fn()

      db().expectPushResolved()
      db().expectSetResolved()

      await addComment('a', 'b', 'c')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions when set() fails', async () => {
      const expectedActions = [
        [{ type: types.ADD_COMMENT_STARTED }], 
        [{ type: types.ADD_COMMENT_FAILURE, payload: 'problem', error: true }], 
      ]
      const dispatch = jest.fn()

      db().expectPushResolved()
      db().expectSetRejected({ payload: 'problem', error: true })

      await addComment('a', 'b', 'c')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions when push() fails', async () => {
      const expectedActions = [
        [{ type: types.ADD_COMMENT_STARTED }], 
        [{ type: types.ADD_COMMENT_FAILURE, payload: 'problem', error: true }], 
      ]
      const dispatch = jest.fn()

      db().expectPushRejected({ payload: 'problem', error: true })

      await addComment('a', 'b', 'c')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })

  describe('removeComment() action creator', () => {
    it('should dispatch expected actions when it succeeds', async () => {
      const expectedActions = [
        [{ type: types.REMOVE_COMMENT_STARTED }], 
        [{ type: types.REMOVE_COMMENT_SUCCESS }], 
      ]
      const dispatch = jest.fn()

      db().expectRemoveResolved()

      await removeComment('a', 'b')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions when remove() fails', async () => {
      const expectedActions = [
        [{ type: types.REMOVE_COMMENT_STARTED }], 
        [{ 
          type: types.REMOVE_COMMENT_FAILURE, 
          payload: 'problem', 
          error: true 
        }], 
      ]
      const dispatch = jest.fn()

      db().expectRemoveRejected({ payload: 'problem', error: true })

      await removeComment('a', 'b')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })
})
