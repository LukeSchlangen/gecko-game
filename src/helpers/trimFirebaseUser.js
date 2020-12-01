const trimFirebaseUser = (firebaseUser) => firebaseUser ? ({
  name: firebaseUser.displayName,
  email: firebaseUser.email,
  photoUrl: firebaseUser.photoURL,
  uid: firebaseUser.uid,
}) : null;

export default trimFirebaseUser;
