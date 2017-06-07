import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { posts } from './posts'
import { comments } from './comments'
import { userData } from './userData'

export const rootReducer = combineReducers({
  routing: routerReducer, posts, comments, userData
})
