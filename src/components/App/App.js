import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import { fetchUser } from '../../redux/actions/userActions';
import './App.css';

const mapStateToProps = state => ({
  user: state.user,
  horses: state.horses,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App">
        {this.props.user ? <Dashboard {...this.props} /> : <Home {...this.props} />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
