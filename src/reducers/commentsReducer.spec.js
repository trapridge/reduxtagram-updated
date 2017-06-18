import * as types from '../actions/actionTypes'
import { commentsReducer } from './commentsReducer'

describe('comments reducer', () => {
  it('returns empty object as default state', () => {
    const action = { type: '?' }

    const state = commentsReducer(undefined, action)

    expect(state).toEqual({})
  })

  it('returns current state if no action matches', () => {
    const currentState = {
      this: 'is',
      very: 'interesting'
    }
    const action = { type: '?' }

    const state = commentsReducer(currentState, action)

    expect(state).toEqual(currentState)
  })

  describe(`on ${types.CLEAR_COMMENTS}`, () => {
    it('returns empty object', () => {
      const action = {
        type: types.CLEAR_COMMENTS
      }

      const state = commentsReducer({ what: 'ever' }, action)

      expect(state).toEqual({})
    })
  })

  describe(`on ${types.START_COMMENTS_SYNC_SUCCESS}`, () => {
    it('returns state with new data for a post', () => {
      const currentState = {
        postId1: 'foo',
        postId2: 'bar'
      }
      const action = {
        type: types.START_COMMENTS_SYNC_SUCCESS,
        payload: 'foobar',
        meta: {
          postId: 'postId1'
        }
      }

      const state = commentsReducer(currentState, action)

      expect(state).toEqual({
        postId1: 'foobar',
        postId2: 'bar'
      })
    })

    it('returns state with deleted data for a post', () => {
      const currentState = {
        postId1: 'foo',
        postId2: 'bar'
      }
      const action = {
        type: types.START_COMMENTS_SYNC_SUCCESS,
        payload: null,
        meta: {
          postId: 'postId1'
        }
      }

      const state = commentsReducer(currentState, action)

      expect(state).toEqual({
        postId2: 'bar'
      })
    })
  })
})
