import React from 'react';
import Lobby from '../Lobby/Lobby';
import Whip from '../Whip/Whip';
import Logout from '../Logout/Logout';

const Player = props => (
  <div>
    {
      props.horses.selectedHorseId && props.horses.allHorsesSelected
      ? <Whip {...props} />
      : <span><Logout user={props.user} /><Lobby {...props} /></span>
    }
  </div>
);

export default Player;
