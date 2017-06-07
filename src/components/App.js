
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as postsActionCreators from '../actions/posts'
import * as commentsActionCreators from '../actions/comments'
import * as userDataActionCreators from '../actions/userData'

import Main from './Main'

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
 
const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App