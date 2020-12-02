import React, { useEffect, useState } from 'react';
import Login from '../Login/Login';
import Player from '../Player/Player';
import './App.css';
import Logout from '../Logout/Logout';
import { firebaseAuth } from '../../fire';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(
      (user) => {
        if(user) {
          setUser({
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          });
        } else {
          setUser(null);
        }
      },
      () => { alert('Something went wrong while logging in. Refresh this page and try again.'); setUser(null) },
    );
  }, []);
  return (
    <div className="App">
      {user ? (<>
        <Logout user={user} />
        <Player user={user} />
      </>) : <Login />}
    </div>
  );
}

export default App;
