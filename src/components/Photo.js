import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const Photo = ({ post, id, incrementLikes }) => {
  return (
    <figure className="grid-figure">
      <div className="grid-photo-wrap">
        <Link to={`/view/${id}`}>
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
        <button className="likes" onClick={() => incrementLikes(id)} >
          &hearts; {post.likes}
        </button>
        <Link className="button" to={`/view/${id}`}>
          <span className="comment-count">
            <span className="speech-bubble">
            </span> {post.comments}
          </span>
        </Link>
      </div>””
    </figure>
  )
}

Photo.propTypes = {
  post: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  incrementLikes: PropTypes.func.isRequired
}

export default Photo