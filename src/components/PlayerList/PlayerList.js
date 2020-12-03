import React from 'react';
import fire from '../../fire';
import robotImage from '../../images/robot.png';

const currentGameRef = fire.database().ref('current_game_information');

const PlayerList = props => {
  // vote for a player
  const currentVote = props?.currentGameInformation?.players[props?.user?.uid]?.vote;
  const onPlayerButtonClick = (player) => {
    if (props.currentGameInformation.timer.timeRemaining !== '00:00' && props.currentGameInformation.status === 'in progress') {
      const playerVoteRef = currentGameRef.child('players').child(props.user.uid).child('vote');
      if (player.uid === currentVote) {
        playerVoteRef.remove();
      } else {
        playerVoteRef.set(player.uid);
      }
    } else if (props.currentGameInformation.status !== 'in progress') {
      if (window.confirm(`Are you sure you want to remove ${player.name} from the game?`)) {
        currentGameRef
          .child('players')
          .child(player.uid)
          .remove();
      }
    }
  }
  return (<>
    <hr />
    {
      Object.values(props?.currentGameInformation?.players).map(player => {
        return (
          <div key={player.uid} className="selection-board">
            <button onClick={() => onPlayerButtonClick(player)} className="primary-button selection-button">
              {<img src={player.photoURL || robotImage} alt={player.name} className="player-image" />}
              <div className="player-list-container">
                <div className="align-left">
                  {player.name}
                  {player.votesAgainst > 0 && ` - ${player.votesAgainst} Vote${player.votesAgainst > 1 ? 's' : ''} Against`}
                </div>
                {currentVote === player.uid &&
                  <div className="align-right">
                    You voted for this player.
                  </div>
                }
              </div>
            </button>
          </div>
        )
      })
    }
  </>);
};

export default PlayerList;

