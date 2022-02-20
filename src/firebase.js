import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDpnWzxI8YtYlmUpngbdcAD8lYP7pR7PzE",
    authDomain: "crudtare.firebaseapp.com",
    projectId: "crudtare",
    storageBucket: "crudtare.appspot.com",
    messagingSenderId: "282291101461",
    appId: "1:282291101461:web:c351164cfa1970c0f4131c"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export {firebase}