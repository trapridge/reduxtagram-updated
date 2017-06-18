import { mockDb } from '../mockFirebase'
import * as types from './actionTypes'
import {
  _useMockDb,
  loadPosts,
  loadPost,
  incrementLikes,
  incrementComments,
  decrementComments
} from './posts'

const db = _useMockDb(mockDb())

describe('posts action creators', () => {
  afterEach(() => {
    db().clearExpectations()
  })

  describe('loadPosts() action creator', () => {
    it('should dispatch expected actions if loading succeeds', () => {
      const expectedActions = [
        [{ type: types.LOAD_POSTS_STARTED }],
        [{ type: types.LOAD_POSTS_SUCCESS, payload: 'data' }]
      ]

      const dispatch = jest.fn()

      db().expectOnceSuccess({ payload: 'data' })

      loadPosts()(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if loading fails', () => {
      const expectedActions = [
        [{ type: types.LOAD_POSTS_STARTED }],
        [{ type: types.LOAD_POSTS_FAILURE, payload: 'problem', error: true }]
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
        [
          {
            type: types.LOAD_POST_SUCCESS,
            payload: 'data',
            meta: { postId: 'id' }
          }
        ]
      ]

      const dispatch = jest.fn()

      db().expectOnceSuccess({ payload: 'data', meta: { postId: 'id' } })

      loadPost('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if loading fails', () => {
      const expectedActions = [
        [{ type: types.LOAD_POST_STARTED }],
        [
          {
            type: types.LOAD_POST_FAILURE,
            payload: 'data',
            error: true
          }
        ]
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
        [
          {
            type: types.INCREMENT_LIKES_SUCCESS,
            payload: 'data',
            meta: { postId: 'id' }
          }
        ]
      ]

      const dispatch = jest.fn()

      db().expectTransactionSuccessAndCommitted({
        payload: 'data',
        meta: { postId: 'id' }
      })

      await incrementLikes('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it(`should dispatch expected actions if op succeeds but fails 
        to commit`, async () => {
      const expectedActions = [
        [{ type: types.INCREMENT_LIKES_STARTED }],
        [{ type: types.INCREMENT_LIKES_NOT_COMMITTED }]
      ]

      const dispatch = jest.fn()

      db().expectTransactionSuccessAndNotCommitted()

      await incrementLikes('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if op fails', async () => {
      const expectedActions = [
        [{ type: types.INCREMENT_LIKES_STARTED }],
        [
          {
            type: types.INCREMENT_LIKES_FAILURE,
            payload: 'problem',
            error: true
          }
        ]
      ]

      const dispatch = jest.fn()

      db().expectTransactionFailure({
        payload: 'problem',
        error: true
      })

      await incrementLikes('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })

  describe('incrementComments() action creator', () => {
    it('should dispatch expected actions if op succeeds', async () => {
      const expectedActions = [
        [{ type: types.INCREMENT_COMMENTS_STARTED }],
        [
          {
            type: types.INCREMENT_COMMENTS_SUCCESS,
            payload: 'data',
            meta: { postId: 'id' }
          }
        ]
      ]

      const dispatch = jest.fn()

      db().expectTransactionSuccessAndCommitted({
        payload: 'data',
        meta: { postId: 'id' }
      })

      await incrementComments('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it(`should dispatch expected actions if op succeeds but fails 
        to commit`, async () => {
      const expectedActions = [
        [{ type: types.INCREMENT_COMMENTS_STARTED }],
        [{ type: types.INCREMENT_COMMENTS_NOT_COMMITTED }]
      ]

      const dispatch = jest.fn()

      db().expectTransactionSuccessAndNotCommitted()

      await incrementComments('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if op fails', async () => {
      const expectedActions = [
        [{ type: types.INCREMENT_COMMENTS_STARTED }],
        [
          {
            type: types.INCREMENT_COMMENTS_FAILURE,
            payload: 'problem',
            error: true
          }
        ]
      ]

      const dispatch = jest.fn()

      db().expectTransactionFailure({
        payload: 'problem',
        error: true
      })

      await incrementComments('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })

  describe('decrementComments() action creator', () => {
    it('should dispatch expected actions if op succeeds', async () => {
      const expectedActions = [
        [{ type: types.DECREMENT_COMMENTS_STARTED }],
        [
          {
            type: types.DECREMENT_COMMENTS_SUCCESS,
            payload: 'data',
            meta: { postId: 'id' }
          }
        ]
      ]

      const dispatch = jest.fn()

      db().expectTransactionSuccessAndCommitted({
        payload: 'data',
        meta: { postId: 'id' }
      })

      await decrementComments('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it(`should dispatch expected actions if op succeeds but fails 
        to commit`, async () => {
      const expectedActions = [
        [{ type: types.DECREMENT_COMMENTS_STARTED }],
        [{ type: types.DECREMENT_COMMENTS_NOT_COMMITTED }]
      ]

      const dispatch = jest.fn()

      db().expectTransactionSuccessAndNotCommitted()

      await decrementComments('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if op fails', async () => {
      const expectedActions = [
        [{ type: types.DECREMENT_COMMENTS_STARTED }],
        [
          {
            type: types.DECREMENT_COMMENTS_FAILURE,
            payload: 'problem',
            error: true
          }
        ]
      ]

      const dispatch = jest.fn()

      db().expectTransactionFailure({
        payload: 'problem',
        error: true
      })

      await decrementComments('id')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })
})
