import React from 'react'
import PropTypes from 'prop-types'
import Raven from 'raven-js'  

export default class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.startCommentsSync(this.props.params.postId)
  }

  componentWillUnmount() {
    this.props.stopCommentsSync(this.props.params.postId)
  }

  render() {
    const { comments, id } = this.props

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
        <form onSubmit={this.handleSubmit.bind(this)} ref="commentForm" 
          className="comment-form">
          <input type="text" ref="author" placeholder="Author"/>
          <input type="text" ref="comment" placeholder="Comment"/>
          <input type="submit" hidden/> {/* to enable enter key */}
        </form>
      </div>
    )
  }

  handleGetComments() {
    console.log('yey')
    console.log(this.props.getComments())
  }

  handleCommentRemove(commentId) {
    const { postId } = this.props.params
    this.props.removeComment(commentId, postId)
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