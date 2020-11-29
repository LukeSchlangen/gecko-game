import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../Home/Home';
import Player from '../Player/Player';
import { fetchUser } from '../../redux/actions/userActions';
import './App.css';

const mapStateToProps = state => ({
  user: state.user,
  players: state.players,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

const App = (props) => {
  return (
    <div className="App">
      {props.user ? <Player {...props} /> : <Home {...props} />}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
