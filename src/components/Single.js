import React from 'react'

import Photo from './Photo'
import Comments from './Comments'

export default class Single extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    posts: React.PropTypes.array,
    comments: React.PropTypes.object
  }

  render() {
    const id = this.props.params.postId
    const index = this.props.posts.findIndex(post => post.code === id)
    const post = this.props.posts[index]
    const postComments = this.props.comments[id] || []
    return (
      <div className="single-photo">
        <Photo {...this.props} i={index} post={post}/>
        <Comments {...this.props} postComments={postComments}/>
      </div>
    )
  }
}
