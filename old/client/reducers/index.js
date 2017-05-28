import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { posts } from './posts'
import { comments } from './comments'
import { epic } from './epic'

export const rootReducer = combineReducers({
  routing: routerReducer, posts, comments, epic
})
