import React from 'react';
import fire from '../../fire';
import './PlayerInGameView.css';

const currentGameRef = fire.database().ref('current_game_information');

const PlayerInGameView = (props) => {
  const secretWord = props?.currentGameInformation?.secretWord;
  const isGecko = props?.currentGameInformation?.geckoPlayerID === props.user.uid;
  const timeIsUp = props?.currentGameInformation?.timer?.timeRemaining === '00:00';
  const geckoCardGuess = props?.currentGameInformation?.geckoCardGuess;
  const setGeckoCardGuess = (word) => {
    if (isGecko && !timeIsUp) {
      currentGameRef.child('geckoCardGuess').set(word);
    }
  }

  const determineEndGameMessage = () => {
    const gecko = props?.currentGameInformation?.players[props?.currentGameInformation?.geckoPlayerID];
    if (geckoCardGuess === secretWord) return `The Gecko - ${gecko.name} - wins because they guessed the correct secret word!`
    const geckoCaught = Object.values(props?.currentGameInformation?.players).reduce((currentOutcome, player) => {
      // if another player has as many or more votes, then the gecko was not caught
      if (player.uid !== gecko.uid && player.votesAgainst >= gecko.votesAgainst) return false;
      return currentOutcome;
    }, true)
    if (geckoCaught) return `The group wins! They caught the Gecko - ${gecko.name}!`
    return `The Gecko - ${gecko.name} - wins! The group didn\'t catch them!`
  }

  return (
    <>
      {timeIsUp ? <>
        {determineEndGameMessage()}
      </> : <>
          <div>
            {isGecko ? <>
              You are the Gecko!
        {geckoCardGuess ? ` Your current guess is ${geckoCardGuess}. ` : ' Make sure to guess before time runs out. '}
        You can change your guess any time before time runs out.
        </> : <>You are not the gecko. The secret card is:<br /><h2 className="card" style={{ margin: '10px' }}>{secretWord}</h2></>}
          </div>
          <div>
            The category is: <b>{props?.currentGameInformation?.category}</b>
          </div>
        </>
      }
      <p>
        The cards are:
      </p>
      <div className="cards">
        {props?.currentGameInformation?.allWords.map((word) => (
          <div
            key={word}
            onClick={() => setGeckoCardGuess(word)}
            className={`card${(!isGecko && secretWord === word) ? ' secret-card' : ''}`}
          >
            {word}
          </div>
        ))}
      </div>
    </>
  )
}

export default PlayerInGameView;
