import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import Player from '../Player/Player';
import RaceTrack from '../RaceTrack/RaceTrack';
import { fetchHorses } from '../../redux/actions/horsesActions';

const mapStateToProps = state => ({
  horses: state.horses,
});

const mapDispatchToProps = dispatch => ({
  fetchHorses: () => dispatch(fetchHorses()),
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchHorses();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Player {...this.props} />}
            />
            <Route
              path="/racetrack"
              render={() => <RaceTrack {...this.props} />}
            />
          </Switch>
          {/* It might make sense for all navigation to be removed for production build
          There really isn't a reason for the user to bounce back and forth
          and having multiple racetracks open could be bad */}
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <p>Navigation only here for development, will be removed in production</p>
          <Navigation {...this.props} />
        </div>
      </BrowserRouter>
    );
  }
}

// export default App;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
