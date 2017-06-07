import React from 'react'
import PropTypes from 'prop-types'

import Photo from './Photo'
import Comments from './Comments'

export default class Single extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    posts: PropTypes.object,
    comments: PropTypes.object
  }

  componentWillMount() {
    const postId = this.props.params.postId

    if (!(postId in this.props.posts)) {
      this.props.loadPost(postId)
    }
    this.props.startCommentsSync(postId)
  }

  componentWillUnmount() {
    this.props.stopCommentsSync(this.props.params.postId)
  }

  render() {
    const postId = this.props.params.postId
    const post = this.props.posts[postId]

    // if (postId && post) {
    return (
      <div className="single-photo">
        <Photo {...this.props} id={postId} post={post}/>
        <Comments {...this.props} id={postId}/>
      </div>
    )
    // }
    // else {
    //   return <div></div>
    // }
  }
}
