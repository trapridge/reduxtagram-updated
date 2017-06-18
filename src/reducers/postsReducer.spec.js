import * as types from '../actions/actionTypes'
import { postsReducer } from './postsReducer'

describe('postsReducer', () => {
  it('returns empty object as default state', () => {
    const action = {
      type: '?'
    }

    const state = postsReducer(undefined, action)

    expect(state).toEqual({})
  })

  it('returns current state if no action matches', () => {
    const currentState = {
      this: 'is',
      very: 'interesting'
    }
    const action = {
      type: '?'
    }

    const state = postsReducer(currentState, action)

    expect(state).toEqual(currentState)
  })

  describe(`on ${types.INCREMENT_LIKES_SUCCESS}`, () => {
    it('returns state with new number of likes', () => {
      const action = {
        type: types.INCREMENT_LIKES_SUCCESS,
        payload: 2,
        meta: {
          postId: 'postId1'
        }
      }

      const state = postsReducer(
        {
          postId1: {
            likes: 1
          },
          postId2: {
            likes: 1
          }
        },
        action
      )

      expect(state).toEqual({
        postId1: {
          likes: 2
        },
        postId2: {
          likes: 1
        }
      })
    })
  })

  describe(`on ${types.INCREMENT_COMMENTS_SUCCESS}`, () => {
    it('returns state with new number of comments', () => {
      const action = {
        type: types.INCREMENT_COMMENTS_SUCCESS,
        payload: 2,
        meta: {
          postId: 'postId1'
        }
      }

      const state = postsReducer(
        {
          postId1: {
            comments: 1
          },
          postId2: {
            comments: 1
          }
        },
        action
      )

      expect(state).toEqual({
        postId1: {
          comments: 2
        },
        postId2: {
          comments: 1
        }
      })
    })
  })

  describe(`on ${types.DECREMENT_COMMENTS_SUCCESS}`, () => {
    it('returns state with new number of comments', () => {
      const action = {
        type: types.DECREMENT_COMMENTS_SUCCESS,
        payload: 2,
        meta: {
          postId: 'postId1'
        }
      }

      const state = postsReducer(
        {
          postId1: {
            comments: 1
          },
          postId2: {
            comments: 1
          }
        },
        action
      )

      expect(state).toEqual({
        postId1: {
          comments: 2
        },
        postId2: {
          comments: 1
        }
      })
    })
  })

  describe(`on ${types.LOAD_POST_SUCCESS}`, () => {
    it('returns payload with updated post', () => {
      const action = {
        type: types.LOAD_POST_SUCCESS,
        payload: {
          foo: 'barNew'
        },
        meta: {
          postId: 'postId1'
        }
      }

      const state = postsReducer(
        {
          postId1: {
            foo: 'bar1'
          },
          postId2: {
            foo: 'bar2'
          }
        },
        action
      )

      expect(state).toEqual({
        postId1: {
          foo: 'barNew'
        },
        postId2: {
          foo: 'bar2'
        }
      })
    })
  })

  describe(`on ${types.LOAD_POSTS_SUCCESS}`, () => {
    it('returns payload in state regardless of old state', () => {
      const action = {
        type: types.LOAD_POSTS_SUCCESS,
        payload: {
          foo: 'bar'
        }
      }

      const state = postsReducer(
        {
          what: 'ever'
        },
        action
      )

      expect(state).toEqual({
        foo: 'bar'
      })
    })
  })
})
