import React from 'react'
import PropTypes from 'prop-types'

import Photo from './Photo'

export default class PhotoGrid extends React.Component {
  static propTypes = {
    posts: PropTypes.object,
    loadPosts: PropTypes.func
  }

  componentWillMount() {
    this.props.loadPosts()
  }

  render() {
    const { posts, incrementLikes } = this.props
    return (
      <div className="photo-grid">
        {Object.keys(posts).map(key =>
          <Photo
            key={key}
            id={key}
            post={posts[key]}
            incrementLikes={incrementLikes}
          />
        )}
      </div>
    )
  }
}
