export function epic(state = [], action) {
  switch (action.type) {
  case 'EPIC_ALERT':
    alert('epic')
    return state
  default:
    return state
  }
}