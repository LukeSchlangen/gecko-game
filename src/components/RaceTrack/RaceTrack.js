import React from 'react';
import { Redirect } from 'react-router-dom';
import Lobby from '../Lobby/Lobby';
import Game from '../Game/Game';
import Logout from '../Logout/Logout';

const RaceTrack = props => (
  <div>
    {
      !props.horses.selectedHorseId && props.horses.allHorsesSelected
      ? <Game {...props} />
      : <Lobby {...props} />
    }
    {props.horses.selectedHorseId ? <Redirect to="/" /> : ''}
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <Logout user={props.user} />
  </div>
);

export default RaceTrack;
