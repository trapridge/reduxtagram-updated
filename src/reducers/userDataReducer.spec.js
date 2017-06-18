import * as types from '../actions/actionTypes'
import { userDataReducer } from './userDataReducer'

describe('comments reducer', () => {
  it('returns empty object as default state', () => {
    const action = { type: '?' }

    const state = userDataReducer(undefined, action)

    expect(state).toEqual({})
  })

  it('returns current state if no action matches', () => {
    const currentState = {
      this: 'is',
      very: 'interesting'
    }
    const action = { type: '?' }

    const state = userDataReducer(currentState, action)

    expect(state).toEqual(currentState)
  })

  describe(`on ${types.LOGOUT_USER_SUCCESS}`, () => {
    it('returns empty object', () => {
      const action = {
        type: types.LOGOUT_USER_SUCCESS
      }

      const state = userDataReducer({ what: 'ever' }, action)

      expect(state).toEqual({})
    })
  })

  describe(`on ${types.LOGOUT_USER_FAILURE}`, () => {
    it('returns empty object', () => {
      const action = {
        type: types.LOGOUT_USER_FAILURE
      }

      const state = userDataReducer({ what: 'ever' }, action)

      expect(state).toEqual({})
    })
  })

  describe(`on ${types.AUTHENTICATE_USER_SUCCESS}`, () => {
    it('stores user data payload to state', () => {
      const action = {
        type: types.AUTHENTICATE_USER_SUCCESS,
        payload: { payload: 'user data payload' }
      }

      const state = userDataReducer({ what: 'ever' }, action)

      expect(state).toEqual({
        payload: 'user data payload'
      })
    })
  })
})
