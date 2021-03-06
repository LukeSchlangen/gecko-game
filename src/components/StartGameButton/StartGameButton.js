import React, { useState } from 'react';
import fire from '../../fire';

const currentGameRef = fire.database().ref('current_game_information');

const pickRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

const genericCategories = [
  { name: 'Netflix', items: ['Never Have I Ever', 'Too Hot to Handle', 'Warrior Nun', 'Riverdale', 'The Order', 'Sweet Magnolias', 'Unsolved Mysteries', 'The Trials of Gabriel Hernandez', 'Floor is Lava', 'The Office', 'Dead to Me', '13 Reasons Why', 'Space Force', 'Jeffrey Epstein: Filthy Rich', 'All American', 'Love is Blind', 'Avatar: The Last Airbender', 'Outer Banks', 'Ozark', 'Tiger King: Murder, Mayhem and Madness'] },
  { name: 'States', items: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Minor Outlying Islands', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'] },
  { name: 'Colleges', items: ['Bradley', 'University of Minnesota', 'Iowa State University', 'NDSU', 'Benedictine', 'Valparaiso', 'UCLA', 'Pepperdine', 'University of Illinois', 'Harvard', 'Sandford', 'MIT', 'Princeton', 'Yale', 'The University of Chicago', 'University of Michigan', 'Duke', 'University of Washington', 'Northwestern University', 'Vanderbilt', 'Cornell', 'University of Wisconsin Madison', 'University of North Dakota'] },
  { name: 'Musicals', items: ['Grease', 'Sound of Music', 'Hamilton', 'Once on This Island', 'West Side Story', 'Footloose', 'Les Misierable', 'Wicked', 'Jesus Christ Superstar', 'The Music Man', 'Book of Mormon', 'The Lion King', 'Cats', 'Annie', 'The Wizard of Oz', 'Peter Pan', 'Momma Mia', 'Fiddler on the Roof', 'Singing in the Rain', 'Jersey Boys'] },
  { name: 'COVID-19', items: ['6 ft', 'Masks', 'Socially Distanced', 'Quarantine', 'Test', 'Fever', 'Zoom', 'Walks', 'Fauci', 'Virtual Party', 'Drive By Birthday', 'Hand Sanitizer', 'Toilet Paper', 'Lockdown', 'Essential Worker', 'Ventilator'] },
  { name: 'Summer Activities', items: ['Swimming', 'Tubing', 'Skiing', 'Jet Skiing', 'Parasailing', 'Knee boarding', 'Volleyball', 'Baseball', 'Yard Games', 'Porch Drinking', 'Boat Rides', 'Tennis', 'Kayaking', 'Rollerblading', 'Biking', 'Running', 'Walks'] },
  { name: 'Water Sports', items: ['Knee boarding', 'Swivel Skiing', 'Slalom Skiing', 'Tubing', 'Wake Boarding', 'Trick Skiing', 'Shoe Skiing', 'Barefooting', 'Adagio Doubles', 'Hydrofoil', 'Pyramids', 'Conventional Doubles', 'Ballet', 'Jumping', 'Discing', 'Pre-Fabs', 'Trios'] },
  { name: 'Yard Games', items: ['Can Jam', 'Bags', 'Ladder Golf', 'Spike ball', 'Disc Golf', 'Bocce Ball', 'Volleyball', 'Badminton', 'Lawn Darts', 'Kube', 'Soccer', 'Croquet', 'Kick the Can', 'Handball', 'Ring Toss', 'Horse Shoes', 'Kickball'] },
  { name: 'Oktoberfest', items: ['Beer', 'Pretzels', 'Dirndl', 'Lederhosen', 'Flower Crown', 'Stein', 'Tent', 'Hammerschlagen', 'Polka', 'Blue and White', 'Schnitzel', 'Yodeling', 'Bratwurst', 'Sauerkraut', 'Prost', 'Das Boot'] },
  { name: 'Sports', items: ['Soccer', 'Baseball', 'Football', 'Basketball', 'Cricket', 'Volleyball', 'Triathlon', 'Biathlon', 'Swimming', 'Lacrosse', 'Tennis', 'Cross Country Skiing', 'Snowboarding', 'Skateboarding', 'Hockey', 'Golf', 'Dance'] },
  // Schlangen Categories
  { name: 'Lake Minnetonka', items: ['Big Island', 'Maynard\'s', 'Pontoon', 'Al and Alma\'s', 'Mansion', 'Excelsior', 'Lord Fletchers', 'Volleyball', 'Yacht', 'Howard\'s Point', 'Swimming', 'Skiing', 'Tubing', 'Sunsets', 'Prince', 'Cargill Mansion'] },
  { name: 'Drinking Games', items: ['Beer Pong', 'Flip Cup', 'Never Have I Ever', 'Power Hour', 'Kings Cup', 'Jenga', 'Edward 40 Hands', 'Wizard Staff', 'Chandelier', 'Around the World', 'Quarters', 'Thunderstruck', 'Thumper', 'Bags', 'Fuzzy Duck', 'Ring of Fire', 'President'] },
  { name: 'Breweries', items: ['Surly', 'Unmapped', 'Boom Island', 'Goose Island', 'LTD', 'Excelsior', 'Enki', 'Schram', 'Castle Danger', 'Bent Paddle', 'Kona', 'Sam Adams', 'Budweiser', 'Coors', 'Heineken', 'Fat Pants', 'Steel Toe', 'Bauhaus', 'Indeed', 'Inbound', 'Flat Earth', 'Schell\'s'] },
  { name: 'Schlangen-isms', items: ['Sweet baby', 'Cheeetah RRRrRrR', 'It stuck', 'Tofu', 'Moostard', 'Compain compain compain', 'Du aufstehen, sitz weggehen', 'Hop to hop sing', 'Ready sety goey ', 'Super dupe', 'What the heck ', 'Luke got dumped', 'Knucks high five elbow', 'Titans or Bucs', 'Rome', 'Hockey stick', 'I heard your friends left early', 'Their kids will be smart', 'Mike Schlangen pour', 'Bosom', 'Jail', 'You\'d get your hand chopped off...'] },
  // Anderson Categories
  { name: 'The Lake House', items: ['Birdie Bridge', 'Old House', 'New House', 'Paddleboard', 'Fishing', 'Spike Ball', 'Harry Potter', 'Hearts', 'Skiing', 'Tubing', 'Sand Castles', 'Swimming', 'Mormor', 'Beebop', 'Chocolate Chip Cookies', 'Lunch Bell', 'Snack Time', 'Back Bedroom', 'Turtles', 'Buoy', 'Muck', 'Leech'] },
  { name: 'Chicago', items: ['Blackhawks', 'White Sox', 'Cubs', 'Bulls', 'Bears', 'Fire', 'Triathlon', 'Sky', 'Red Stars', 'Hot Dogs', 'Popcorn', 'Windy', 'Sears Tower', 'Navy Pier', 'Deep Dish Pizza', 'Portillo\'s', 'Giordano\'s'] },
];

const schlangenCategories = [
  { name: 'Lake Minnetonka', items: ['Big Island', 'Maynard\'s', 'Pontoon', 'Al and Alma\'s', 'Mansion', 'Excelsior', 'Lord Fletchers', 'Volleyball', 'Yacht', 'Howard\'s Point', 'Swimming', 'Skiing', 'Tubing', 'Sunsets', 'Prince', 'Cargill Mansion'] },
  { name: 'Drinking Games', items: ['Beer Pong', 'Flip Cup', 'Never Have I Ever', 'Power Hour', 'Kings Cup', 'Jenga', 'Edward 40 Hands', 'Wizard Staff', 'Chandelier', 'Around the World', 'Quarters', 'Thunderstruck', 'Thumper', 'Bags', 'Fuzzy Duck', 'Ring of Fire', 'President'] },
  { name: 'Breweries', items: ['Surly', 'Unmapped', 'Boom Island', 'Goose Island', 'LTD', 'Excelsior', 'Enki', 'Schram', 'Castle Danger', 'Bent Paddle', 'Kona', 'Sam Adams', 'Budweiser', 'Coors', 'Heineken', 'Fat Pants', 'Steel Toe', 'Bauhaus', 'Indeed', 'Inbound', 'Flat Earth', 'Schell\'s'] },
  { name: 'Schlangen-isms', items: ['Sweet baby', 'Cheeetah RRRrRrR', 'It stuck', 'Tofu', 'Moostard', 'Compain compain compain', 'Du aufstehen, sitz weggehen', 'Hop to hop sing', 'Ready sety goey ', 'Super dupe', 'What the heck ', 'Luke got dumped', 'Knucks high five elbow', 'Titans or Bucs', 'Rome', 'Hockey stick', 'I heard your friends left early', 'Their kids will be smart', 'Mike Schlangen pour', 'Bosom', 'Jail', 'You\'d get your hand chopped off...'] },
];

const andersonCategories = [
  { name: 'The Lake House', items: ['Birdie Bridge', 'Old House', 'New House', 'Paddleboard', 'Fishing', 'Spike Ball', 'Harry Potter', 'Hearts', 'Skiing', 'Tubing', 'Sand Castles', 'Swimming', 'Mormor', 'Beebop', 'Chocolate Chip Cookies', 'Lunch Bell', 'Snack Time', 'Back Bedroom', 'Turtles', 'Buoy', 'Muck', 'Leech'] },
  { name: 'Chicago', items: ['Blackhawks', 'White Sox', 'Cubs', 'Bulls', 'Bears', 'Fire', 'Triathlon', 'Sky', 'Red Stars', 'Hot Dogs', 'Popcorn', 'Windy', 'Sears Tower', 'Navy Pier', 'Deep Dish Pizza', 'Portillo\'s', 'Giordano\'s'] },
];

const shuffleArray = (array) => array
  .map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value)
  .slice(0, 15);

const StartGameButton = (props) => {
  const [genericCategoriesEnabled, setGenericCategoriesEnabled] = useState(true);
  const [schlangenCategoriesEnabled, setSchlangenCategoriesEnabled] = useState(true);
  const [andersonCategoriesEnabled, setAndersonCategoriesEnabled] = useState(true);
  const startGame = () => {
    const categories = [
      ...(genericCategoriesEnabled ? genericCategories : []),
      ...(schlangenCategoriesEnabled ? schlangenCategories : []),
      ...(andersonCategoriesEnabled ? andersonCategories : []),
    ];
    currentGameRef.child('status').set('in progress');
    currentGameRef.child('geckoPlayerID').set(pickRandom(Object.values(props.currentGameInformation.players)).uid);
    const category = pickRandom(categories);
    currentGameRef.child('category').set(category.name);
    const items = shuffleArray(category.items);
    currentGameRef.child('secretWord').set(pickRandom(items));
    currentGameRef.child('allWords').set(items);
    currentGameRef.child('geckoCardGuess').remove();
    currentGameRef.child('geckoFinalAnswer').remove();
    currentGameRef.child('winner').remove();
    const timerRef = currentGameRef.child('timer');
    timerRef.child('startTime').set(Date.now());
    timerRef.child('timeRemaining').set('10:00');
    timerRef.child('startedBy').set(props.user.uid);
  }

  return (
    <>
      <div className="selection-board start-game-button">
        <button
          className="primary-button selection-button"
          onClick={startGame}
        >
          <span className="start-game">
            Start Game
          </span>
        </button>
      </div>
      <center style={{ margin: '0px 50px' }}>
        <div style={{ textAlign: 'left', margin: 'auto' }}>
          <div>
            <label>
              <input
                name="genericCategories"
                type="checkbox"
                checked={genericCategoriesEnabled}
                onChange={event => setGenericCategoriesEnabled(event.target.checked)}
              />
              Generic Categories
            </label>
          </div>
          <div>
            <label>
              <input
                name="schlangenCategories"
                type="checkbox"
                checked={schlangenCategoriesEnabled}
                onChange={event => setSchlangenCategoriesEnabled(event.target.checked)}
              />
              Schlangen Categories
            </label>
          </div>
          <div>
            <label>
              <input
                name="andersonCategories"
                type="checkbox"
                checked={andersonCategoriesEnabled}
                onChange={event => setAndersonCategoriesEnabled(event.target.checked)}
              />
            Anderson Categories
          </label>
          </div>
        </div>
      </center>
    </>
  );
}

export default StartGameButton;
