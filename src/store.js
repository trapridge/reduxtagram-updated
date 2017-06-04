import { applyMiddleware, createStore, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { rootReducer } from './reducers/index'

import posts from './data/posts'
import comments from './data/comments'

// const defaultState = { posts, comments }
const defaultState = { posts: {}, comments: {}}

let middleware = applyMiddleware(thunk, logger)

/*eslint no-undef:0*/
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension())
}

export const store = createStore(rootReducer, defaultState, middleware)
export const history = syncHistoryWithStore(browserHistory, store)

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index.js').rootReducer
    store.replaceReducer(nextRootReducer)
  })
}

// if (module.hot) {
//   module.hot.accept('./actions/', () => {
//     const nextRootReducer = require('./actions/actionCreators.js').
//     store.replaceReducer(nextRootReducer)
//   })
// }