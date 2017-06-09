import React from 'react'
import PropTypes from 'prop-types'

import Photo from './Photo'
import Comments from './Comments'

export default class Single extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    posts: PropTypes.object,
    comments: PropTypes.object,
    loadPost: PropTypes.func,
    startCommentsSync: PropTypes.func,
    stopCommentsSync: PropTypes.func,
  }

  componentWillMount() {
    const { postId } = this.props.params
    const { posts, loadPost, startCommentsSync } = this.props

    if (!(postId in posts)) {
      loadPost(postId)
    }
    startCommentsSync(postId)
  }

  componentWillUnmount() {
    const { postId } = this.props.params
    const { stopCommentsSync } = this.props
    stopCommentsSync(postId)
  }

  render() {
    const { postId } = this.props.params
    const { 
      posts, 
      incrementLikes,
      comments,
      userData,
      addComment,
      removeComment,
      incrementComments,
      decrementComments
    } = this.props
    const post = posts[postId]
    
    return (
      <div className="single-photo">
        <Photo 
          id={postId} 
          post={post} 
          incrementLikes={incrementLikes} />
        <Comments 
          id={postId}
          comments={comments}
          userData={userData}
          addComment={addComment}
          removeComment={removeComment}
          incrementComments={incrementComments}
          decrementComments={decrementComments} />
      </div>
    )
  }
}
