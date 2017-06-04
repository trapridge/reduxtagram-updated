import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// import base from '../base'

export default class Main extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.context.router.listen(location => {
      if (location.pathname === '/') {
        this.props.clearComments()
      }
    })
  }

  render() {
    console.log(this.props.params.postId)
    return (
      <div>
        <h1><Link to="/">Reduxtagram</Link></h1>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}
