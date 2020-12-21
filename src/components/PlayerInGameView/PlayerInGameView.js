import React, { useState } from 'react';
import fire from '../../fire';
import Confirm from '../Confirm/Confirm';
import './PlayerInGameView.css';

const currentGameRef = fire.database().ref('current_game_information');

const PlayerInGameView = (props) => {
  const [showFinalAnswerOption, setShowFinalAnswerOption] = useState(false);
  const secretWord = props?.currentGameInformation?.secretWord;
  const isGecko = props?.currentGameInformation?.geckoPlayerID === props.user.uid;
  const timeIsUp = props?.currentGameInformation?.timer?.timeRemaining === '00:00';
  const geckoFinalAnswer = props?.currentGameInformation?.geckoFinalAnswer;
  const geckoCardGuess = props?.currentGameInformation?.geckoCardGuess;
  const setGeckoCardGuess = (word) => {
    setShowFinalAnswerOption(false);
    if (isGecko && !timeIsUp) {
      currentGameRef.child('geckoCardGuess').set(word);
    }
  }

  const setFinalAnswer = (word) => {
    if (isGecko && !timeIsUp) {
      currentGameRef.child('geckoFinalAnswer').set(word);
    }
  }

  const determineEndGameMessage = () => {
    const gecko = props?.currentGameInformation?.players[props?.currentGameInformation?.geckoPlayerID];
    if (geckoFinalAnswer && geckoFinalAnswer !== secretWord) {
      currentGameRef.child('winner').set('group');
      return <>
        <h1>The group wins!</h1>
        <div>The Gecko - {gecko.name} - thought that &quot;{geckoCardGuess}&quot; was the secret word, and they ended the game early!</div>
      </>;
    }
    if (geckoCardGuess === secretWord) {
      currentGameRef.child('winner').set(gecko);
      return <>
        <h1>The Gecko - {gecko.name} - wins!</h1>
        {geckoFinalAnswer && <div>They ended the game early, because they knew &quot;{geckoCardGuess}&quot; was the secret word.</div>}
        <div>They guessed the correct secret word!</div>
      </>;
    }
    const geckoCaught = Object.values(props?.currentGameInformation?.players).reduce((currentOutcome, player) => {
      // if another player has as many or more votes, then the gecko was not caught
      if (player.uid !== gecko.uid && player.votesAgainst >= gecko.votesAgainst) return false;
      return currentOutcome;
    }, true)
    if (geckoCaught) {
      currentGameRef.child('winner').set('group');
      return <><h1>The group wins!</h1><div>They caught the Gecko - {gecko.name}!</div></>;
    }
    currentGameRef.child('winner').set(gecko);
    return <><h1>The Gecko - {gecko.name} - wins!</h1><div>The group didn&apos;t catch them!</div></>;
  }

  return (
    <>
      {timeIsUp ? <>
        {determineEndGameMessage()}
      </> : <>
          {showFinalAnswerOption ? <Confirm>
            <button className="primary-button" onClick={() => setShowFinalAnswerOption(false)}>
              Go back. I am not sure that the word is &quot;{geckoCardGuess}&quot;
            </button>
            <br />
            <button  className="primary-button" onClick={() => setFinalAnswer(geckoCardGuess)}>
              I am absolutely certain that the word is &quot;{geckoCardGuess}&quot; and I want to end the game early.
            </button>
          </Confirm> : <>
              <div>
                {isGecko ? (
                  <>
                    <h1>
                      You are the Gecko!
                </h1>
                    {geckoCardGuess ? (
                      <div>
                        Your current guess is:
                        <br />
                        <h2 className="card" style={{ margin: '10px' }}>{geckoCardGuess}</h2>
                        <button class="primary-button" onClick={() => setShowFinalAnswerOption(true)}>
                          End the game by making &quot;{geckoCardGuess}&quot; your final answer
                        </button>
                      </div>
                    ) : (
                        <div>
                          Make sure to guess before time runs out.
                        </div>
                      )}
                    <small>Guess a word by clicking it below. You can change your guess any time before time runs out.</small>
                  </>
                ) : (
                    <div>
                      You are not the gecko. The secret card is:
                      <br />
                      <h2 className="card" style={{ margin: '10px' }}>
                        {secretWord}
                      </h2>
                    </div>
                  )}
              </div>
              <br />
              <div>
                The category is: <b>{props?.currentGameInformation?.category}</b>
              </div>
            </>}
        </>}
      <p>
        The cards are:
      </p>
      <div className="cards">
        {props?.currentGameInformation?.allWords.map((word) => (
          <div
            key={word}
            onClick={() => setGeckoCardGuess(word)}
            className={`card${((!isGecko || timeIsUp) && secretWord === word) ? ' secret-card' : ''}${((isGecko || timeIsUp) && geckoCardGuess === word) ? ' gecko-card-guess' : ''}`}
          >
            {word}
          </div>
        ))}
      </div>
    </>
  )
}

export default PlayerInGameView;
