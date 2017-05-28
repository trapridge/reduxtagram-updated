import React from 'react'
import PropTypes from 'prop-types'

import Photo from './Photo'

export default class PhotoGrid extends React.Component {
  static propTypes = {
    posts: PropTypes.array
  }

  render() {
    return (
      <div className="photo-grid">
      {this.props.posts.map((post, i) => {
        return <Photo {...this.props} key={i} i={i} post={post}/> 
      })}
      </div>
    )
  }
}
