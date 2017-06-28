import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const Photo = ({ post, id, incrementLikes }) => {
  return (
    <figure className="grid-figure">
      <div className="grid-photo-wrap">
        <Link to={`/view/${id}`} className="image-link">
          <img
            className="grid-photo"
            src={post.img_url}
            alt={post.caption}
          />
        </Link>
        <CSSTransitionGroup
          transitionName="like"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <span key={post.likes} className="likes-heart">
            {post.likes}
          </span>
        </CSSTransitionGroup>
      </div>

      <figcaption>
        <p>{post.caption}</p>
      </figcaption>

      <div className="control-buttons">
        <button className="likes" onClick={incrementLikes.bind(null, id)}>
          &hearts; {post.likes}
        </button>
        <Link className="button" to={`/view/${id}`}>
          <span className="comment-count">
            <span className="speech-bubble" /> {post.comments}
          </span>
        </Link>
      </div>
    </figure>
  )
}

Photo.propTypes = {
  post: PropTypes.object,
  id: PropTypes.string,
  incrementLikes: PropTypes.func
}

export default Photo
