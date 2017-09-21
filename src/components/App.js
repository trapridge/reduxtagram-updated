import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FontIcon from 'material-ui/FontIcon'

import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
  appBar: {
    height: 56, // Instead of 64
  },
})

import { browserHistory } from 'react-router'

class Login extends React.Component {
  // static muiName = 'FlatButton'

  render() {
    return <FlatButton {...this.props} label="Login" />
  }
}

export default class App extends React.Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // }

  state = {
    open: false
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  goToMain = () => {
    browserHistory.push('/')
  }

  render() {
    const SignInMenu = props =>
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton>
            <FontIcon className="white fa fa-sign-in" />
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          leftIcon={<FontIcon className="fa fa-github" />}
          primaryText="Login with Github"
          onTouchTap={login.bind(null, 'github')}
        />
        <MenuItem
          leftIcon={<FontIcon className="fa fa-google" />}
          primaryText="Login with Google"
          onTouchTap={login.bind(null, 'google')}
        />
        <MenuItem
          leftIcon={<FontIcon className="fa fa-twitter" />}
          primaryText="Login with Twitter"
          onTouchTap={login.bind(null, 'twitter')}
        />
      </IconMenu>

    const { login, logout, userData } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id="testID">
          <AppBar
            title="Reduxtagram"
            onTitleTouchTap={this.goToMain}
            iconElementRight={
              'user' in this.props.userData
                ? <FlatButton
                    className="logout-button"
                    onTouchTap={logout}
                    label="Log out"
                    secondary={true}
                    icon={<FontIcon className="white fa fa-sign-out" />}
                  />
                : <SignInMenu />
            }
          />
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </MuiThemeProvider>
    )
  }
}
