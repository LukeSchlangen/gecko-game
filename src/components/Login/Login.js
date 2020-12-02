import React from 'react';
import { loginWithGoogle } from '../../fire';
import './Login.css';

const Login = () => (
  <div className="container">
    <button
      className="login-button"
      onClick={loginWithGoogle}
    >
    Login
    </button>
  </div>
);

export default Login;

