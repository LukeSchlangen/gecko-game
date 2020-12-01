import React from 'react';
import fire from '../../fire';

const currentGameRef = fire.database().ref('current_game_information');

const PlayerList = props => {
  // vote for a player
  const currentVote = props?.currentGameInformation?.players[props?.user?.uid]?.vote;
  const onPlayerButtonClick = (player) => {
    if (player.uid === currentVote || props.currentGameInformation.status !== 'in progress') {
      currentGameRef.child('players').child(props.user.uid).child('vote').remove();
    } else {
      currentGameRef.child('players').child(props.user.uid).child('vote').set(player.uid);
    }
  }
  return (<>
    <hr />
    {
      Object.values(props?.currentGameInformation?.players).map(player => {
        const votesAgainst = player.votesAgainst || 0;
        return (
        <div key={player.uid} className="selection-board">
          <button onClick={() => onPlayerButtonClick(player)} className="selection-button">
            {<img src={player.photoUrl || 'assets/robots/robot-1.png'} alt={player.name} className="player-image" />}
            <div className="player-horse-name-container">
              <div className="horse-name">
                {player.name}
                {votesAgainst > 0 && ` - ${votesAgainst} Votes Against`}
              </div>
              {currentVote === player.uid &&
              <div className="player-name">
                You voted for this player.
              </div>
              }
            </div>
          </button>
        </div>
      )})
    }
  </>);
};

export default PlayerList;

