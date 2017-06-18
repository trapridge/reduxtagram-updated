import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import Raven from 'raven-js'

import './styles/style.css'

import ConnectedApp from './components/ConnectedApp'
import Single from './components/Single'
import PhotoGrid from './components/PhotoGrid'
import { sentry_url } from './data/config'

import { store, history } from './store'

const routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={ConnectedApp}>
        <IndexRoute component={PhotoGrid} />
        <Route path="/view/:postId" component={Single} />
      </Route>
    </Router>
  </Provider>
)

render(routes, document.getElementById('root'))

Raven.config(sentry_url).install()
