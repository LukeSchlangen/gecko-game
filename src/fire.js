import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/auth';  // If using Firebase storage

const config = {
  apiKey: 'AIzaSyC8voU763E3OhNHBns3ErOjBpgMbXJBF6c',
  authDomain: 'gecko-game.firebaseapp.com',
  databaseURL: 'https://gecko-game.firebaseio.com',
  projectId: 'gecko-game',
  storageBucket: 'gecko-game.appspot.com',
  messagingSenderId: '822268289243',
};
const fire = firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const loginWithGoogle = () => firebaseAuth.signInWithPopup(googleAuthProvider);

export default fire;
