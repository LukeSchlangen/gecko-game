import React from 'react';
import fire from '../../fire';

const currentGameRef = fire.database().ref('current_game_information');

const pickRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

const categories = [
  // { name: 'Food', items: ['Taco', 'Potato', 'Burger'] },
  // { name: 'People', items: ['Lindsey', 'Luke', 'Levi'] },
  { name: 'Netflix', items: ['Never Have I Ever', 'Too Hot to Handle', 'Warrior Nun', 'Riverdale', 'The Order', 'Sweet Magnolias', 'Unsolved Mysteries', 'The Trials of Gabriel Hernandez', 'Floor is Lava', 'The Office', 'Dead to Me', '13 Reasons Why', 'Space Force', 'Jeffrey Epstein: Filthy Rich', 'All American', 'Love is Blind', 'Avatar: The Last Airbender', 'Outer Banks', 'Ozark', 'Tiger King: Murder, Mayhem and Madness'] }
]

const StartGameButton = (props) => {
  const startGame = () => {
    currentGameRef.child('status').set('in progress');
    currentGameRef.child('geckoPlayerID').set(pickRandom(Object.values(props.currentGameInformation.players)).uid);
    const category = pickRandom(categories);
    currentGameRef.child('secretWord').set(pickRandom(category.items));
    currentGameRef.child('category').set(category.name);
    currentGameRef.child('allWords').set(category.items);
  }

  return (
    <>
      <div className="selection-board start-game-button">
        <button
          className="selection-button"
          onClick={startGame}
        >
          <span className="start-game">
            Start Game
        </span>
        </button>
      </div>
    </>
  );
}

export default StartGameButton;
