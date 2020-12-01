import React from 'react';
import { connect } from 'react-redux';
import Login from '../Login/Login';
import Player from '../Player/Player';
import { fetchUser } from '../../redux/actions/userActions';
import './App.css';
import Logout from '../Logout/Logout';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

const App = (props) => {
  return (
    <div className="App">
      {props.user ? (<>
        <Logout user={props.user} />
        <Player {...props} />
      </>) : <Login />}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
