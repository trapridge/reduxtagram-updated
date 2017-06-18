import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

export default class App extends React.Component {
  render() {
    const { login, logout, userData } = this.props
    const logoutButton = Object.keys(userData).length > 0
      ? <button className="logout-button" onClick={logout}>
          Log out
        </button>
      : ''
    return (
      <div>
        <h1><Link to="/">Reduxtagram</Link></h1>
        <button
          className="github-login-button"
          onClick={login.bind(null, 'github')}
        >
          Log in with Github
        </button>
        <button
          className="google-login-button"
          onClick={login.bind(null, 'google')}
        >
          Log in with Google
        </button>
        <button
          className="twitter-login-button"
          onClick={login.bind(null, 'twitter')}
        >
          Log in with Twitter
        </button>
        {logoutButton}
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}
