import React from 'react'
import PropTypes from 'prop-types'

import Photo from './Photo'
import Comments from './Comments'

export default class Single extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    posts: PropTypes.array,
    comments: PropTypes.object
  }

  render() {
    const id = this.props.params.postId
    const index = this.props.posts.findIndex(post => post.code === id)
    const post = this.props.posts[index]
    const postComments = this.props.comments[id] || []
    return (
      <div className="single-photo">
        <Photo {...this.props} i={index} post={post}/>
        <Comments {...this.props} postComments={postComments}/>
      </div>
    )
  }
}
