import React from 'react'

import Photo from './Photo'

export default class PhotoGrid extends React.Component {
  static propTypes = {
    posts: React.PropTypes.array
  }

  render() {
    return (
      <div className="photo-grid">
      {this.props.posts.map((post, i) => {
        return <Photo {...this.props} key={i} i={i} post={post}/> 
      })}
      </div>
    )
  }
}
