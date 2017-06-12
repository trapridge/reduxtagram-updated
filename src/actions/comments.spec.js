import { getDb } from '../base'
import * as types from './actionTypes'
import {
  useMockDb,
  addComment,
  startCommentsSync,
  stopCommentsSync,
  clearComments,
  removeComment
} from './comments'

let db = getDb()
db = useMockDb(createMock())

describe('comments action creators', () => {
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
        [{ type: types.ADD_COMMENT_FAILURE, error: 'problem' }], 
      ]
      const dispatch = jest.fn()

      db().expectPushResolved()
      db().expectSetRejected({ error: 'problem' })

      await addComment('a', 'b', 'c')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })

    it('should dispatch expected actions when push() fails', async () => {
      const expectedActions = [
        [{ type: types.ADD_COMMENT_STARTED }], 
        [{ type: types.ADD_COMMENT_FAILURE, error: 'problem' }], 
      ]
      const dispatch = jest.fn()

      db().expectPushRejected({ error: 'problem' })

      await addComment('a', 'b', 'c')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })

  // describe('startCommentsSync() action creator', () => {
  //   it('should dispatch expected actions', async () => {
  //     const expectedActions = [
  //       [{ type: types.START_COMMENTS_SYNC_STARTED }], 
  //       [{ type: types.START_COMMENTS_SYNC_SUCCESS }], 
  //     ]

  //     const dispatch = jest.fn()

  //     const cb = db().expectOnSuccess()
  //     cb('payload')

  //     startCommentsSync('a')(dispatch)

  //     expect(dispatch.mock.calls).toEqual(expectedActions)
  //   })
  // })

  describe('stopCommentsSync() action creator', () => {
    it('should dispatch expected action', async () => {
      const expectedActions = [
        { type: types.STOP_COMMENTS_SYNC }
      ]

      db().expectOff()
      const action = stopCommentsSync()

      expect([action]).toEqual(expectedActions)
    })
  })

  describe('clearComments() action creator', () => {
    it('should dispatch expected action', async () => {
      const expectedActions = [
        { type: types.CLEAR_COMMENTS }
      ]

      const action = clearComments()

      expect([action]).toEqual(expectedActions)
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
        [{ type: types.REMOVE_COMMENT_FAILURE, error: 'problem' }], 
      ]
      const dispatch = jest.fn()

      db().expectRemoveRejected({ error: 'problem' })

      await removeComment('a', 'b')(dispatch)

      expect(dispatch.mock.calls).toEqual(expectedActions)
    })
  })
})

function createMock() {
  const expectations = []

  const hasNextExpectation = type => 
    expectations.length > 0 && expectations[0].type === type

  const consumeExpectation = () => expectations.splice(0, 1)

  const handleCallbacks = (resolve, reject, acceptedExpectations, 
        overrideResolveData = null, overrideRejectData = null) => {
    if (hasNextExpectation(acceptedExpectations[0])) {
      const { type, ...rest } = expectations[0]
      resolve(overrideResolveData || rest)
      consumeExpectation()
    } 
    else if (hasNextExpectation(acceptedExpectations[1])) {
      const { type, ...rest } = expectations[0]
      reject(overrideRejectData || rest.error)
      consumeExpectation()
    }
    else {
      console.error(`Incorrect expectation. Found ${expectations[0]}, 
        but expected one of ${acceptedExpectations}`)
    }
  }

  return () => {
    const obj = {
      expectPushResolved: (data = {}) => {
        expectations.push({ type: 'PUSH_RESOLVE', ...data })
      },
      expectPushRejected: (data = {}) => {
        expectations.push({ type: 'PUSH_REJECT', ...data })
      },
      expectSetResolved: (data = {}) => {
        expectations.push({ type: 'SET_RESOLVE', ...data })
      },
      expectSetRejected: (data = {}) => {
        expectations.push({ type: 'SET_REJECT', ...data })
      },
      expectRemoveResolved: (data = {}) => {
        expectations.push({ type: 'REMOVE_RESOLVE', ...data })
      },
      expectRemoveRejected: (data = {}) => {
        expectations.push({ type: 'REMOVE_REJECT', ...data })
      },
      expectOff: (data = {}) => {
        expectations.push({ type: 'OFF', ...data })
      },
      expectOnSuccess: (callback, data = {}) => {
        expectations.push({ type: 'ON_SUCCESS', callback, ...data })
      },
      expectOnFailure: (callback, data = {}) => {
        expectations.push({ type: 'ON_FAILURE', callback, ...data })
      },
      ref: (path) => {
        return {
          push: () => new Promise((resolve, reject) => {
            const acceptedExpectations = ['PUSH_RESOLVE', 'PUSH_REJECT']
            handleCallbacks(resolve, reject, acceptedExpectations, {
              set: obj.ref(path).set
            })
          }),
          set: () => new Promise((resolve, reject) => {
            const acceptedExpectations = ['SET_RESOLVE', 'SET_REJECT']
            handleCallbacks(resolve, reject, acceptedExpectations)
          }),
          remove: () => new Promise((resolve, reject) => {
            const acceptedExpectations = ['REMOVE_RESOLVE', 'REMOVE_REJECT']
            handleCallbacks(resolve, reject, acceptedExpectations)
          }),
          off: () => {
            if (hasNextExpectation('OFF')) {
              consumeExpectation()
            }
            else {
              console.error(`Incorrect expectation. Found ${expectations[0]}, 
                but expected OFF`)
            }
          },
          on: () => {
            if (hasNextExpectation('ON_SUCCESS') 
                || hasNextExpectation('ON_FAILURE')) {
              consumeExpectation()
              return expectations.callback.bind(null, expectations.data)
            }
            else {
              console.error(`Incorrect expectation. Found ${expectations[0]}, 
                but expected OFF`)
            }
          }
        }
      }
    }
    return obj
  }
}
