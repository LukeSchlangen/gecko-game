import React from 'react';
import { loginWithGoogle } from '../../fire';
import './Login.css';
import geckoImage from '../../images/gecko.png';

const Login = () => (
  <>
    <div className="container">
      <button
        className="primary-button login-button"
        onClick={loginWithGoogle}
      >
        Login
    </button>
    </div>
  </>
);

export default Login;

