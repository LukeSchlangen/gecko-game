import React, { Component } from 'react';
import Background from '../Background/Background';
import Horse from '../Horse/Horse';
import fire from '../../fire';
import firebaseObjectToArray from '../../helpers/firebaseObjectToArray';
import './Game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      gameEnded: false,
      backgroundPosition: 0,
    };
    this.runGame = this.runGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    const playersRef = fire.database().ref('players');
    playersRef
      .once('value')
      .then(snapshot => firebaseObjectToArray(snapshot))
      .then((playersList) => {
          this.setState({
            players: playersList,
          });
      });
  }

  componentDidMount() {
    this.runGame();
  }

  runGame() {
    // TODO: game logic
  }

  endGame() {
    this.setState({
      gameEnded: true,
    });
    setTimeout(this.resetGame, 10000);
  }

  resetGame() {
    fire.database().ref('game_history').push(this.state.players);
    const playersRef = fire.database().ref('players');
  }

  render() {
    return 'Game component';
  }
}
