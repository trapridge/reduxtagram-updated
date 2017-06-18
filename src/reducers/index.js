import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { postsReducer } from './postsReducer'
import { commentsReducer } from './commentsReducer'
import { userDataReducer } from './userDataReducer'

export const rootReducer = combineReducers({
  routing: routerReducer,
  posts: postsReducer,
  comments: commentsReducer,
  userData: userDataReducer
})
