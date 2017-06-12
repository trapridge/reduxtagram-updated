import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { auth } from '../base'

export default class Main extends React.Component {
  render() {
    const { login, logout } = this.props
    return (
      <div>
        <h1><Link to="/">Reduxtagram</Link></h1>
        <button className="github-login-button" 
            onClick={() => login('github')}>
          Log in with Github
        </button>
        <button className="google-login-button" 
            onClick={() => login('google')}>
          Log in with Google
        </button>
        <button className="twitter-login-button" 
            onClick={() => login('twitter')}>
          Log in with Twitter
        </button>
        <button className="logout-button" onClick={() => logout()}>
          Log out
        </button>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}
