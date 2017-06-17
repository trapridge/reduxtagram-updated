
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as postsActionCreators from '../actions/posts'
import * as commentsActionCreators from '../actions/comments'
import * as userDataActionCreators from '../actions/userData'

import App from './App'

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
    userData: state.userData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...postsActionCreators, 
    ...commentsActionCreators,
    ...userDataActionCreators 
  }, dispatch)
}
 
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
