import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import postsReducer from './ducks/posts'
import commentsReducer from './ducks/comments'
import userDataReducer from './ducks/userData'

const getRootReducer = (newReducer = {}) => {
  return combineReducers({
    routing: routerReducer,
    posts: postsReducer,
    comments: commentsReducer,
    userData: userDataReducer,
    ...newReducer
  })
} 

const persistedState = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state'))
  : {}

let middleware = applyMiddleware(thunk, logger)
/*eslint no-undef:0*/
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension())
}

export const store = createStore(getRootReducer(), persistedState, middleware)
export const history = syncHistoryWithStore(browserHistory, store)

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()))
})

if (module.hot) {
  module.hot.accept('./ducks/posts.js', () => {
    const reducer = { posts: require('./ducks/posts.js').default }
    store.replaceReducer(getRootReducer(reducer))
  })

  module.hot.accept('./ducks/comments.js', () => {
    const reducer = { comments: require('./ducks/comments.js').default }
    store.replaceReducer(getRootReducer(reducer))
  })

  module.hot.accept('./ducks/userData.js', () => {
    const reducer = { userData: require('./ducks/userData.js').default }
    store.replaceReducer(getRootReducer(reducer))
  })
}
