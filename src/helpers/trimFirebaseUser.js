const trimFirebaseUser = (firebaseUser) => {
  let user = null;
  if (firebaseUser) {
    user = {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photoUrl: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      uid: firebaseUser.uid,
    };
  }
  return user;
};

export default trimFirebaseUser;
