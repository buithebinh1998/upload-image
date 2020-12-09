import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyASBbhVG21ouqET-9rJ7hTPQ-xPNsqe7bo",
  authDomain: "testing-image-upload-b1f73.firebaseapp.com",
  projectId: "testing-image-upload-b1f73",
  storageBucket: "testing-image-upload-b1f73.appspot.com",
  messagingSenderId: "211152983287",
  appId: "1:211152983287:web:eb9f0f17b5181880b0eff2"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};