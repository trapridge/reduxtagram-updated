import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import Raven from 'raven-js'
import injectTapEventPlugin from 'react-tap-event-plugin'

import './styles/style.css'

import { sentry_url } from './ravenConfig'
import { store, history } from './store'

import ConnectedApp from './components/ConnectedApp'
import Single from './components/Single'
import PhotoGrid from './components/PhotoGrid'

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

injectTapEventPlugin()
render(routes, document.getElementById('root'))

Raven.config(sentry_url).install()
