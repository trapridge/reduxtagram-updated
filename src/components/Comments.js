import React from 'react'
import PropTypes from 'prop-types'
import Raven from 'raven-js'  

export default class Comments extends React.Component {
  static propTypes = {
    postComments: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="comments">
        {this.props.postComments.map((comment, i) => {
          return (
            <div className="comment" key={i}>
              <p>
                <strong>{comment.user}</strong>
                {comment.text}
                <button onClick={this.handleCommentRemove.bind(this, i)} 
                  className="remove-comment">&times;</button>
              </p>
            </div>
          )
        })}
        <form onSubmit={this.handleSubmit.bind(this)} ref="commentForm" 
          className="comment-form">
          <input type="text" ref="author" placeholder="Author"/>
          <input type="text" ref="comment" placeholder="Comment"/>
          <input type="submit" hidden/> {/* to enable enter key */}
        </form>
      </div>
    )
  }

  handleCommentRemove(commentId) {
    const { postId } = this.props.params
    this.props.removeComment(postId, commentId)
    Raven.captureMessage('Comment removed')
  }

  handleSubmit(e) {
    e.preventDefault()
    const { postId } = this.props.params
    const author = this.refs.author.value
    const comment = this.refs.comment.value
    this.props.addComment(postId, author, comment)
    this.refs.commentForm.reset()
  }
}