import React from 'react';

const PlayerList = props => (<>
  <hr />
  {
    Object.values(props?.currentGameInformation?.players || {}).map(player => (
      <div key={player.uid} className="selection-board">
        <button onClick={() => { }} className="selection-button">
          {<img src={player.photoUrl || 'assets/robots/robot-1.png'} alt={player.name} className="player-image" />}
          <div className="player-horse-name-container">
            <div className="horse-name">
              {player.name}
            </div>
          </div>
        </button>
      </div>
    ))
  }
</>);

export default PlayerList;

