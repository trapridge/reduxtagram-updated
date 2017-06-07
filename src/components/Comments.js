import React from 'react'
import PropTypes from 'prop-types'
import Raven from 'raven-js'  

export default class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
    incrementComments: PropTypes.func.isRequired,
    decrementComments: PropTypes.func.isRequired
  }

  render() {
    console.log(this.props)
    let { comments, id, userData } = this.props
    comments = id in comments ? comments[id] : {}

    const addForm = !('user' in userData) ? '' : 
      <form onSubmit={this.handleSubmit.bind(this)} ref="commentForm" 
        className="comment-form">
        <input type="text" ref="author" placeholder="Author"/>
        <input type="text" ref="comment" placeholder="Comment"/>
        <input type="submit" hidden/>
      </form>

    return (
      <div className="comments">
        {Object.keys(comments).map((key, i) => {
          const comment = comments[key]
          return (
            <div className="comment" key={i}>
              <p>
                <strong>{comment.user}</strong>
                {comment.text}
                <button onClick={this.handleCommentRemove.bind(this, key, id)} 
                  className="remove-comment">&times;</button>
              </p>
            </div>
          )
        })}
        {addForm}
      </div>
    )
  }

  handleCommentRemove(commentId) {
    const { postId } = this.props.params
    this.props.removeComment(commentId, postId)
    this.props.decrementComments(postId)
    // Raven.captureMessage('Comment removed')
  }

  handleSubmit(e) {
    e.preventDefault()
    const { postId } = this.props.params
    const { author, comment } = this.refs
    this.props.addComment(postId, author.value, comment.value)
    this.props.incrementComments(postId)
    this.refs.commentForm.reset()
  }
}