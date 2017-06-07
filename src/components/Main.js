import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { auth } from '../base'

export default class Main extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const { login, logout } = this.props
    return (
      <div>
        <h1><Link to="/">Reduxtagram</Link></h1>
        <button onClick={() => login('github')}>
          Log in with Github
        </button>
        <button onClick={() => login('google')}>
          Log in with Google
        </button>
        <button onClick={() => login('twitter')}>
          Log in with Twitter
        </button>
        <button onClick={() => logout()}>
          Log out
        </button>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}
