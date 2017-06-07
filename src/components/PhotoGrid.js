import React from 'react'
import PropTypes from 'prop-types'

import Photo from './Photo'

export default class PhotoGrid extends React.Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    loadPosts: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadPosts()
  }

  render() {
    return (
      <div className="photo-grid">
        {Object.keys(this.props.posts).map((key, i) => 
          <Photo {...this.props} key={key} id={key} 
            post={this.props.posts[key]}/>
        )}
      </div>
    )
  }
}
