import firebase from 'firebase'

export const firebaseConfig = {
  apiKey: 'AIzaSyDAAWHMJUuZpTljqS4zmYmSRmDGWGp5g6M',
  authDomain: 'reduxtagram-updated.firebaseapp.com',
  databaseURL: 'https://reduxtagram-updated.firebaseio.com',
  projectId: 'reduxtagram-updated',
  storageBucket: 'reduxtagram-updated.appspot.com',
  messagingSenderId: '605857204949'
}

firebase.initializeApp(firebaseConfig)

export function getDb() {
  return firebase.database
}
export function getAuth() {
  return firebase.auth
}
