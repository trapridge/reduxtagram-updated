import React from 'react'
import PropTypes from 'prop-types'

import Photo from './Photo'
import Comments from './Comments'

export default class Single extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    // posts: PropTypes.array,
    // comments: PropTypes.object
  }

  componentWillMount() {
    const postId = this.props.params.postId
    // this.props.loadComments(postId)

    if (Object.keys(this.props.posts).length === 0) {
      this.props.loadPost(postId)
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   return Object.keys(nextProps.posts).length > 0 && 
  //     Object.keys(nextProps.comments).length > 0
  // }

  render() {
    const postId = this.props.params.postId
    // const index = this.props.posts.findIndex(post => post.code === id)
    const post = this.props.posts[postId]
    // const postComments = this.props.comments[id] || []

    if (postId && post) {
      return (
        <div className="single-photo">
          <Photo {...this.props} id={postId} post={post}/>
          <Comments {...this.props} id={postId}/>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}
