import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCCWObqWcRU_otdRmGGwjAZ0eH8rmbh-9s',
  authDomain: 'derby-day.firebaseapp.com',
  databaseURL: 'https://derby-day.firebaseio.com',
  projectId: 'derby-day',
  storageBucket: 'derby-day.appspot.com',
  messagingSenderId: '254615289198',
};
const fire = firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const loginWithGoogle = () => firebaseAuth.signInWithPopup(googleAuthProvider);

export default fire;
