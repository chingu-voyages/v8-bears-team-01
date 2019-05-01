import firebase from "firebase";

let config = {
    apiKey: "AIzaSyD_cY4Wz7rzrC4SbrzVhi2J51XRM3tpPYI",
    authDomain: "timeline-blog.firebaseapp.com",
    databaseURL: "https://timeline-blog.firebaseio.com",
    projectId: "timeline-blog",
    storageBucket: "timeline-blog.appspot.com",
    messagingSenderId: "964075740874"
};

firebase.initializeApp(config);

export default firebase;
