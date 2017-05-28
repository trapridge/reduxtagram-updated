import React from 'react'
import { Link } from 'react-router'
import CSSTransitionGroup from 'react-addons-css-transition-group'

export default class Photo extends React.Component {
  static propTypes = {
    i: React.PropTypes.number.isRequired,
    post: React.PropTypes.object.isRequired,
    comments: React.PropTypes.object.isRequired,
    increment: React.PropTypes.func.isRequired
  }

  render() {
    const { post, comments, i } = this.props
    return (
      <figure className="grid-figure">

        <div className="grid-photo-wrap">
          <Link to={`/view/${post.code}`}>
            <img className="grid-photo" src={post.display_src} 
              alt={post.caption}/>
          </Link>
          <CSSTransitionGroup transitionName="like" 
            transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <span key={post.likes} className="likes-heart">
              {post.likes}
            </span>
          </CSSTransitionGroup>
        </div>

        <figcaption>
          <p>{post.caption}</p>
        </figcaption>

        <div className="control-buttons">
          <button className="likes" onClick={this.props.increment.bind(null, i)} >
            &hearts; {post.likes}
          </button>
          <Link className="button" to={`/view/${post.code}`}>
            <span className="comment-count">
              <span className="speech-bubble">
              </span> {comments[post.code] ? comments[post.code].length: 0}
            </span>
          </Link>
        </div>

      </figure>
    )
  }
}
