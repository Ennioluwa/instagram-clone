// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDJRms9-irAQu05_BwjbUEmM8XZJ6XfMc0',
  authDomain: 'instagram-clone-b8bff.firebaseapp.com',
  projectId: 'instagram-clone-b8bff',
  storageBucket: 'instagram-clone-b8bff.appspot.com',
  messagingSenderId: '261840453381',
  appId: '1:261840453381:web:d969f69f8e2595fb8a416c',
  measurementId: 'G-9RVKJNF2CZ',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
