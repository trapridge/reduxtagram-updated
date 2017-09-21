import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const Photo = ({ post, id, incrementLikes }) => {
  return (
    <Card>
      <CardHeader
        title="URL Avatar"
        subtitle="Subtitle"
        avatar="images/jsa-128.jpg"
      />
      <CardMedia
        overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
      >
        <img src="images/nature-600-337.jpg" alt="" />
      </CardMedia>
      <CardTitle title="Card title" subtitle="Card subtitle" />
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
      <CardActions>
        <FlatButton label="Action1" />
        <FlatButton label="Action2" />
      </CardActions>
    </Card>  
  )
}

Photo.propTypes = {
  post: PropTypes.object,
  id: PropTypes.string,
  incrementLikes: PropTypes.func
}

export default Photo

 // {/*<figure className="grid-figure">
      //   <div className="grid-photo-wrap">
      //     <Link to={`/view/${id}`} className="image-link">
      //       <img
      //         className="grid-photo"
      //         src={post.img_url}
      //         alt={post.caption}
      //       />
      //     </Link>
      //     <CSSTransitionGroup
      //       transitionName="like"
      //       transitionEnterTimeout={500}
      //       transitionLeaveTimeout={500}
      //     >
      //       <span key={post.likes} className="likes-heart">
      //         {post.likes}
      //       </span>
      //     </CSSTransitionGroup>
      //   </div>

      //   <figcaption>
      //     <p>{post.caption}</p>
      //   </figcaption>

      //   <div className="control-buttons">
      //     <button className="likes" onClick={incrementLikes.bind(null, id)}>
      //       &hearts; {post.likes}
      //     </button>
      //     <Link className="button" to={`/view/${id}`}>
      //       <span className="comment-count">
      //         <span className="speech-bubble" /> {post.comments}
      //       </span>
      //     </Link>
      //   </div>
      // </figure>*/}
