import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

    const firebaseConfig = {
        apiKey: "AIzaSyAXuuA6825gUQ8yQk8bnK3gkt29vzCDLJw",
        authDomain: "pic-pal.firebaseapp.com",
        projectId: "pic-pal",
        storageBucket: "pic-pal.appspot.com",
        messagingSenderId: "631214086040",
        appId: "1:631214086040:web:45f7c9bf61e1b356057ded",
        measurementId: "G-J5BTPVZDXE"
      };
  

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();


export { db, auth};