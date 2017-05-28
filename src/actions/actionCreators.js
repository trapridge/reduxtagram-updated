export function increment(index) {
  return {
    type: 'INCREMENT_LIKES',
    index
  }
}

export function addComment(postId, author, comment) {
  return {
    type: 'ADD_COMMENT',
    postId, author, comment
  }
}

export function removeComment(postId, commentId) {
  return {
    type: 'REMOVE_COMMENT',
    postId, commentId
  }
}

function epicAlert() {
  return {
    type: 'EPIC_ALERT'
  }
}

export function asyncEpicAlert() {
  return dispatch => {
    setTimeout(() => {
      dispatch(epicAlert())
    }, 2000)
  }
}
