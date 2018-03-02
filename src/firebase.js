import { initializeApp } from 'firebase'
import 'firebase/firestore'

const app = initializeApp({
  apiKey: 'AIzaSyCdSXibjFh66hZz8N8SNy1wv8TvEnUmPug',
  authDomain: 'overflow-e7205.firebaseapp.com',
  databaseURL: 'https://overflow-e7205.firebaseio.com',
  projectId: 'overflow-e7205',
  storageBucket: 'overflow-e7205.appspot.com',
  messagingSenderId: '815127249286'
})

export const db = app.firestore()
export const questionCollection = db.collection('questions')
export const answerCollection = db.collection('answers')
export const voteCollection = db.collection('votes')
export const auth = app.auth()
