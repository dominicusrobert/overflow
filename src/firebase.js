import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyCdSXibjFh66hZz8N8SNy1wv8TvEnUmPug',
  authDomain: 'overflow-e7205.firebaseapp.com',
  databaseURL: 'https://overflow-e7205.firebaseio.com',
  projectId: 'overflow-e7205',
  storageBucket: '',
  messagingSenderId: '815127249286'
})

export const db = app.database()
export const auth = app.auth()
