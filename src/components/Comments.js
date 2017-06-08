import React from 'react'
import PropTypes from 'prop-types'
import Raven from 'raven-js'  

export default class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.object,
    userData: PropTypes.object,
    addComment: PropTypes.func,
    removeComment: PropTypes.func,
    incrementComments: PropTypes.func,
    decrementComments: PropTypes.func,
  }

  handleCommentRemove(commentId, postId) {
    this.props.removeComment(commentId, postId)
    this.props.decrementComments(postId)
    // Raven.captureMessage('Comment removed')
  }

  handleSubmit(e, postId) {
    e.preventDefault()
    const { author, comment } = this.refs
    this.props.addComment(postId, author.value, comment.value)
    this.props.incrementComments(postId)
    this.refs.commentForm.reset()
  }

  render() {
    let { comments, id, userData } = this.props
    const postComments = comments[id] || {}

    const addForm = 'user' in userData ? 
      <form onSubmit={(e) => this.handleSubmit(e, id)} ref="commentForm" 
        className="comment-form">
        <input type="text" ref="author" placeholder="Author"/>
        <input type="text" ref="comment" placeholder="Comment"/>
        <input type="submit" hidden/>
      </form> : ''

    return (
      <div className="comments">
        {Object.keys(postComments).map((key, i) => {
          const comment = postComments[key]
          return (
            <div className="comment" key={i}>
              <p>
                <strong>{comment.user}</strong>
                {comment.text}
                <button onClick={() => this.handleCommentRemove(key, id)} 
                  className="remove-comment">&times;</button>
              </p>
            </div>
          )
        })}
        {addForm}
      </div>
    )
  }


}