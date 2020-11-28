import React from 'react';
import { connect } from 'react-redux';
import './Logout.css';

import {
  logoutUser,
} from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => { dispatch(logoutUser()); },
});

const Logout = props => (
  <div className="logout-button">
    {props.user.email}
    <button onClick={() => { props.logoutUser(); }}>
      Logout
    </button>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

