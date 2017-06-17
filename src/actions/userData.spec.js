import { mockAuth } from '../mockFirebase'
import * as types from './actionTypes'
import {
  useMockAuth,
  login,
  logout
} from './userData'

const auth = useMockAuth(mockAuth())

describe('userData action creators', () => {
  afterEach(() => {
    auth().clearExpectations()
  })

  describe('login() action creator', () => {
    it('should dispatch expected actions if login succeeds', async () => {
      const expectedActions = [
        [{ type: types.AUTHENTICATE_USER_STARTED }], 
        [{ 
          type: types.AUTHENTICATE_USER_SUCCESS, 
          payload: 'data', 
        }], 
      ]

      const dispatch = jest.fn()

      auth().expectSignInWithPopupResolved({ payload: 'data' })

      await login('google')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if provider is unsupported', async () => {
      const expectedActions = [
        [{ type: types.AUTHENTICATE_USER_STARTED }], 
        [{ 
          type: types.AUTHENTICATE_USER_FAILURE, 
          payload: new Error('Provider with name "unsupported" not available'), 
          error: true
        }], 
      ]

      const dispatch = jest.fn()

      await login('unsupported')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if provider login fails', async () => {
      const expectedActions = [
        [{ type: types.AUTHENTICATE_USER_STARTED }], 
        [{ 
          type: types.AUTHENTICATE_USER_FAILURE, 
          payload: 'problem', 
          error: true
        }], 
      ]

      const dispatch = jest.fn()

      auth().expectSignInWithPopupRejected({
        payload: 'problem', 
        error: true
      })

      await login('google')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })

  describe('logout() action creator', () => {
    it('should dispatch expected actions if logout succeeds', async () => {
      const expectedActions = [
        [{ type: types.LOGOUT_USER_STARTED }], 
        [{ type: types.LOGOUT_USER_SUCCESS }], 
      ]

      const dispatch = jest.fn()

      auth().expectSignOutResolved()

      await logout()(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions if provider logout fails', async () => {
      const expectedActions = [
        [{ type: types.LOGOUT_USER_STARTED }], 
        [{ 
          type: types.LOGOUT_USER_FAILURE, 
          payload: 'problem', 
          error: true
        }], 
      ]

      const dispatch = jest.fn()

      auth().expectSignOutRejected({
        payload: 'problem', 
        error: true
      })

      await logout()(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })

})
