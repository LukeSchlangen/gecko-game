// Dislays list of all horses
// allows user to select a horse
// user may not select an already selected horse (from another player)
// if user selects a different horse, the initial horse is released
// when all horses are selected, the whip view is displayed

import React, { Component } from 'react';
import fire from '../../fire';
import Background from '../Background/Background';
import './Lobby.css';
import { lowerNumberFirst } from '../../helpers/horseSorting';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.selectHorse = this.selectHorse.bind(this);
    this.setAllEmptyAsComputerPlayers = this.setAllEmptyAsComputerPlayers.bind(this);
  }

  setAllEmptyAsComputerPlayers() {
    this.props.horses.list.forEach((horse) => {
      if (!horse.player) {
        fire.database()
          .ref('horses')
          .child(horse.id)
          .child('player')
          .set({ name: 'computer' });
      }
    });
  }

  selectHorse(selectedHorse) {
    // don't do anything if the selected horse already belongs to a player

    const selectedHorseId = selectedHorse.id;

    if (this.props.horses.selectedHorseId === selectedHorseId) {
      // unselect horse if user just clicked their own previously selected horse
      fire.database()
        .ref('horses')
        .child(selectedHorseId)
        .child('player')
        .set(null);
      return;
    } else if (selectedHorse.player) {
      // if the horse is already taken by another player, do nothing
      return;
    }

    // loop through horses and set player to null if it is this player
    this.props.horses.list.forEach((horse) => {
      if (horse.player && horse.player.email === this.props.user.email) {
        fire.database()
          .ref('horses')
          .child(horse.id)
          .child('player')
          .set(null);
      }
    });

    fire.database()
      .ref('horses')
      .child(selectedHorseId)
      .child('player')
      .set(this.props.user);
  }

  render() {
    return (
      <div>
        <Background />
        {this.props.horses.allHorsesSelected ? <div>All horses have already been selected for this race. the next race should start soon!</div> : ''}
        {
          this.props.horses.list.sort(lowerNumberFirst).map(horse => (
            <div key={horse.id} className="selection-board">
              <button onClick={() => this.selectHorse(horse)} className="selection-button">
                <img src={`assets/horse_profile/horse-${horse.number}.png`} alt={horse.name} className="horse-image" />
                <div className="player-horse-name-container">
                  <div className="horse-name">
                    {horse.name}
                  </div>
                  <div className="player-name">
                    {horse.player ? horse.player.name : ''}
                  </div>
                </div>
                {horse.player ? <img src={horse.player.photoUrl || 'assets/robots/robot-1.png'} alt={horse.player.name} className="player-image" /> : ''}
              </button>
            </div>
          ))
        }
        <div className="selection-board start-game-button">
          <button
            className="selection-button"
            onClick={() => this.setAllEmptyAsComputerPlayers()}
          >
            <span className="start-game">
              Start Game
            </span>
          </button>
        </div>
      </div>
    );
  }
}

Lobby.defaultProps = {
  horses: [],
};

export default Lobby;
