import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import App from './App'
import * as postsActionCreators from '../ducks/posts'
import * as commentsActionCreators from '../ducks/comments'
import * as userDataActionCreators from '../ducks/userData'

function removeHelperFns(fns) {
  for (let prop in fns) {
    if (prop.startsWith('_')) {
      delete fns[prop]
    }
  }
  return fns
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
    userData: state.userData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...removeHelperFns(postsActionCreators),
      ...removeHelperFns(commentsActionCreators),
      ...removeHelperFns(userDataActionCreators)
    },
    dispatch
  )
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
