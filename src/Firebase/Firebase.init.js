import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBT4os5xcOsRw6kgLF0mzlWGO5A5GQ821k',
    authDomain: 'tech-geeks-firebase-c640c.firebaseapp.com',
    projectId: 'tech-geeks-firebase-c640c',
    storageBucket: 'tech-geeks-firebase-c640c.appspot.com',
    messagingSenderId: '526770707985',
    appId: '1:526770707985:web:f9d2a83da44ba090589bb0',
}

const app = initializeApp(firebaseConfig)
export default app
export const auth = getAuth(app)
