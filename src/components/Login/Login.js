import React from 'react';
import { connect } from 'react-redux';
import './Login.css';

import {
  loginUserWithGoogle,
} from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loginUserWithGoogle: () => { dispatch(loginUserWithGoogle()); },
});

const Login = props => (
  <div className="container">
    <button
      className="login-button"
      onClick={() => { props.loginUserWithGoogle(); }}
    >
    Login
    </button>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

