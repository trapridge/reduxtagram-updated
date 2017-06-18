import { applyMiddleware, createStore, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { rootReducer } from './reducers/index'

const persistedState = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state'))
  : {}

let middleware = applyMiddleware(thunk, logger)

/*eslint no-undef:0*/
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension())
}

export const store = createStore(rootReducer, persistedState, middleware)
export const history = syncHistoryWithStore(browserHistory, store)

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()))
})

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index.js').rootReducer
    store.replaceReducer(nextRootReducer)
  })
}
