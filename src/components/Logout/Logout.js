import React from 'react';
import { firebaseAuth } from '../../fire';
import './Logout.css';

const Logout = props => {
  const logout = () => firebaseAuth.signOut();
  return (
  <div className="logout-button">
    {props.user.email}
    <button className="primary-button" onClick={logout}>
      Logout
    </button>
  </div>
)};

export default Logout;

