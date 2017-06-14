import { mockDb } from '../mockFirebase'
import * as types from './actionTypes'
import {
  useMockDb,
  loadPosts,
  loadPost,
  incrementLikes
} from './posts'

const db = useMockDb(mockDb())

describe('posts action creators', () => {
  afterEach(() => {
    db().clearExpectations()
  })

  describe('loadPosts() action creator', () => {
    it('should dispatch expected actions if loading succeeds', () => {
      const expectedActions = [
        [{ type: types.LOAD_POSTS_STARTED }], 
        [{ type: types.LOAD_POSTS_SUCCESS, payload: 'data' }], 
      ]

      const dispatch = jest.fn()

      db().expectOnceSuccess({ payload: 'data' })

      loadPosts()(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if loading fails', () => {
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

  describe('loadPost() action creator', () => {
    it('should dispatch expected actions if loading succeeds', () => {
      const expectedActions = [
        [{ type: types.LOAD_POST_STARTED }], 
        [{ 
          type: types.LOAD_POST_SUCCESS, 
          payload: 'data', 
          meta: { postId: 'id'} 
        }], 
      ]

      const dispatch = jest.fn()

      db().expectOnceSuccess({ payload: 'data', meta: { postId: 'id'} })

      loadPost('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if loading fails', () => {
      const expectedActions = [
        [{ type: types.LOAD_POST_STARTED }], 
        [{ 
          type: types.LOAD_POST_FAILURE, 
          payload: 'data', 
          error: true
        }], 
      ]

      const dispatch = jest.fn()

      db().expectOnceFailure({ payload: 'data', error: true })

      loadPost('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })

  describe('incrementLikes() action creator', () => {
    it('should dispatch expected actions if op succeeds', async () => {
      const expectedActions = [
        [{ type: types.INCREMENT_LIKES_STARTED }], 
        [{ 
          type: types.INCREMENT_LIKES_SUCCESS, 
          payload: 'data', 
          meta: { postId: 'id'} 
        }], 
      ]

      const dispatch = jest.fn()

      db().expectTransactionSuccessAndCommitted({ 
        payload: 'data', 
        meta: { postId: 'id'}
      })

      await incrementLikes('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it(`should dispatch expected actions if op succeeds but fails 
        to commit`, async () => {
      const expectedActions = [
        [{ type: types.INCREMENT_LIKES_STARTED }], 
        [{ type: types.INCREMENT_LIKES_NOT_COMMITTED }], 
      ]

      const dispatch = jest.fn()

      db().expectTransactionSuccessAndNotCommitted()

      await incrementLikes('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })

  // describe('addComment() action creator', () => {
  //   it('should dispatch expected actions when it succeeds', () => {
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

  //   it('should dispatch expected actions when set() fails', () => {
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

  //   it('should dispatch expected actions when push() fails', () => {
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
  //   it('should dispatch expected actions when it succeeds', () => {
  //     const expectedActions = [
  //       [{ type: types.REMOVE_COMMENT_STARTED }], 
  //       [{ type: types.REMOVE_COMMENT_SUCCESS }], 
  //     ]
  //     const dispatch = jest.fn()

  //     db().expectRemoveResolved()

  //     await removeComment('a', 'b')(dispatch)

  //     expect(dispatch.mock.calls).toEqual(expectedActions)
  //   })

  //   it('should dispatch expected actions when remove() fails', () => {
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
