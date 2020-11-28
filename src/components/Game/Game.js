import React, { Component } from 'react';
import Background from '../Background/Background';
import Horse from '../Horse/Horse';
import fire from '../../fire';
import firebaseObjectToArray from '../../helpers/firebaseObjectToArray';
import './Game.css';
import { lowerNumberFirst, lowerPlaceFirst } from '../../helpers/horseSorting';

const determineFinishPlace = (horse, horsesList) => {
  const addToNumberFinished = (numberFinished, horseToCheck) => {
    const horseFinished = horseToCheck.finishPlace ? 1 : 0;
    return numberFinished + horseFinished;
  };
  const placeIfFinishedNow = horsesList.reduce(addToNumberFinished, 1);
  const place = horse.finishPlace || (horse.percentLeft > 100 && placeIfFinishedNow);
  return place;
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horses: [],
      gameEnded: false,
      backgroundPosition: 0,
    };
    this.runGame = this.runGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    const horsesRef = fire.database().ref('horses');
    horsesRef
      .once('value')
      .then(snapshot => firebaseObjectToArray(snapshot))
      .then((horsesList) => {
        horsesList.forEach((horseVal) => {
          this.setState({
            horses: [...this.state.horses, {
              ...horseVal,
              id: horseVal.id,
              percentLeft: 0,
              speed: 0.1,
              whip: 0,
            }],
          });
          const whipRef = fire.database().ref('horses').child(horseVal.id).child('whips');
          whipRef.on('child_added', (whipVal) => {
            this.setState({
              horses: this.state.horses.map(horse => (
                {
                  ...horse,
                  whip: horseVal.id === horse.id ? whipVal.val() : horse.whip,
                }
              )),
            });
          });
        });
      });
  }

  componentDidMount() {
    this.runGame();
  }

  runGame() {
    this.setState({
      horses: this.state.horses.map(horse => (
        {
          ...horse,
          percentLeft: horse.percentLeft + (horse.speed) + (horse.whip * 0.001 * Math.random()),
          whip: Math.max(horse.whip - 1, 0),
          finishPlace: determineFinishPlace(horse, this.state.horses),
        }
      )),
    });

    const everyHorseFinished = this.state.horses.every(horse => horse.finishPlace);
    const thereAreHorses = this.state.horses.length > 0;
    if (thereAreHorses && everyHorseFinished && !this.state.gameEnded) {
      this.endGame();
    }
    this.setState({
      backgroundPosition: this.state.backgroundPosition + 1,
    });
    setTimeout(this.runGame, 30);
  }

  endGame() {
    this.setState({
      gameEnded: true,
    });
    setTimeout(this.resetGame, 10000);
  }

  resetGame() {
    fire.database().ref('race_history').push(this.state.horses);
    const horsesRef = fire.database().ref('horses');
    horsesRef.on('child_added', (horsesVal) => {
      const horseRef = horsesRef.child(horsesVal.key);
      horseRef.child('whips').set(null);
      horseRef.child('player').set(null);
    });
  }

  render() {
    return (
      <div>
        <Background left={this.state.horses.length > 0 ? `${(0 - this.state.backgroundPosition) % 95}vw` : '0px'} />
        <Background left={this.state.horses.length > 0 ? `${((0 - this.state.backgroundPosition) % 95) + 95}vw` : '100vw'} />
        { this.state.horses.sort(lowerNumberFirst).map((horse, lane) => (
          <div key={horse.id}>
            <Horse
              percentLeft={horse.percentLeft}
              lane={lane + 1}
              number={horse.number}
              frame={horse.frame}
            />
          </div>
        ))}
        { this.state.horses.sort(lowerPlaceFirst).map(horse => (
          <div key={horse.id} className="white-background-tint">
            { this.state.gameEnded ?
              <div>
                <h2>{horse.finishPlace} | {horse.player.name} | {horse.name}</h2>
                <span style={{ display: 'inline-block' }}>
                  <img src={`assets/horse_profile/horse-${horse.number}.png`} alt={horse.name} height="40px" />
                </span>
                <span style={{ display: 'inline-block' }}>
                  <div align="right">
                    {horse.player ? ` selected by ${horse.player.name}` : ''}
                  </div>
                  <div align="left">
                    {horse.name}
                  </div>
                </span>
                <span style={{ display: 'inline-block' }}>
                  {horse.player ? <img src={horse.player.photoUrl || 'assets/robots/robot-1.png'} alt={horse.player.name} height="40px" /> : ''}
                </span>
              </div>
          : ''}
          </div>
        ))}
        {/* <iframe title="call to post" width="0" height="0" src="https://www.youtube.com/embed/MI8dg02lNyA?rel=0&amp;controls=0&amp;showinfo=0&amp;start=5&autoplay=1" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen /> */}
      </div>

    );
  }
}
