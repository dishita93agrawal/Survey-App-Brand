// Your web app's Firebase configuration

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDyUtSdJiFSBpXK4_ED4VFyf6FGOHF2GX4',
  authDomain: 'survey-app-949e3.firebaseapp.com',
  projectId: 'survey-app-949e3',
  storageBucket: 'survey-app-949e3.appspot.com',
  messagingSenderId: '1079085461',
  appId: '1:1079085461:web:9f3c6882e60ab924890e9c',
};

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
