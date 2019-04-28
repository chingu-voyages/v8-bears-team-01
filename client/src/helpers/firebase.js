import firebase from 'firebase';
import {APIKEY, MESSAGINGSENDERID} from './key'

let config ={
  apiKey: APIKEY,
    authDomain: "timeline-blog.firebaseapp.com",
    databaseURL: "https://timeline-blog.firebaseio.com",
    projectId: "timeline-blog",
    storageBucket: "timeline-blog.appspot.com",
    messagingSenderId: MESSAGINGSENDERID
}

firebase.initializeApp(config)

export default firebase;
