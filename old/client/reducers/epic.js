export function epic(state = [], action) {
  switch (action.type) {
    case 'EPIC_ALERT':
      console.log('epic')
      alert('epic')
      return state
    default:
      return state
  }
}