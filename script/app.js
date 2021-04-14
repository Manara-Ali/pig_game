// GAME PLAY

// CHOSES A FINAL SCORE TO BE THE WINNING SCORE

// EACH PLAYER TAKES TURNS ROLLING THE DIE

// IF ACTIVE PLAYER DIE NUMBER IS ADD TO HIS GAME PLAY SCORE UNTIL HE CHOOSES TO:

// HOLD THAT SCORE
// // IF PLAYER CHOOSES TO HOLD THEIR GAME PLAY SCORE THEN, THE GAME PLAY SCORE TRANSFERED TO ITS CURRENT SCORE AND ADDED TO IT AND IT IS NEXT PLAYERS TURN TO GO

// OR HE ROLLS A 1
// // IF PLAYER ROLLS A 1 HE LOSES EVERYTHING AND ITS GAME PLAY SCORE IS RETURNED TO ZERO, NOTHING GETS ADDED TO THEIR CURRENT SCORE AND HE LOSES HIS TURN

// For example, the first player, Donald, begins a turn with a roll of 5. Donald could hold and score 5 points, but chooses to roll again. Donald rolls a 2, and could hold with a turn total of 7 points, but chooses to roll again. Donald rolls a 1, and must end his turn without scoring. The next player, Alexis, rolls the sequence 4-5-3-5-5, after which she chooses to hold, and adds her turn total of 22 points to her score.

//////// GAME STATE VARIABLES ////////
let diceNumber;
let player;
let rollingScorePlayer = 0;
let activePlayerScore = 0;

// ELEMENTS SELECTION
/////////////////////////////////////////////////////////////////////////////////////////////
const body = document.querySelector("body");
const directions = document.querySelector("#directions");
const rules = document.querySelector(".rules");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");
const functionalityParentElement = document.querySelector(
  ".functionality-buttons"
);
const diceImage = document.querySelector(".current-dice");
const leftSide = document.querySelector("#left-side");
const rightSide = document.querySelector("#right-side");
const leftDot = document.querySelector(".dot-1");
const rightDot = document.querySelector(".dot-2");
const diceContainer = document.getElementById("dice");

// FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////
const directionFunction = function (e) {
  // ASSUMING USER CLICKED ON THE RULES BUTTON
  if (e.target.classList.contains("btn-game-rules")) {
    //   Display the rules div containing the rules
    rules.classList.remove("hide");
    //   Display the overlay div to draw attention to the rules
    overlay.classList.remove("hide");
    // ASSUMING USER CLICKED ON THE GAME SELECTION BUTTON
  } else if (e.target.classList.contains("btn-game-selection")) {
    //   We should display all available game options
    console.log(e.target.textContent);
  }

  //   GUARD CLAUSE
  if (directions) return;
};

//////// CLOSE POP-UP MODAL WINDOW ////////
const hideModalClick = function () {
  rules.classList.add("hide");
  overlay.classList.add("hide");
};

const hideModalESC = function (e) {
  if (e.code === "Escape") {
    rules.classList.add("hide");
    overlay.classList.add("hide");
  }
};

//////// FUNCTION TO SWITCH OUT PLAYERS' TURNS ////////
const switchTurn = function () {
  if (leftSide.classList.contains("active-player")) {
    leftSide.classList.remove("active-player");
    rightSide.classList.add("active-player");
    leftDot.classList.add("hide");
    rightDot.classList.remove("hide");
  } else {
    rightSide.classList.remove("active-player");
    leftSide.classList.add("active-player");
    rightDot.classList.add("hide");
    leftDot.classList.remove("hide");
  }
};

//////// FUNCTION TO RETRIEVE PLAYER NUMBER ////////
const activePlayer = function () {
  return leftSide.classList.contains("active-player") ? 1 : 2;
};

player = activePlayer() + "";

//////// FUNCTION TO TRACK CURRENT SCORE ////////
const trackCurrentScore = function () {
  return +document.querySelector(`.player-${player}-score`).textContent;
};

//////// RANDOM FUNCTION BETWEEN 1 AND 6 ////////
const randomDiceNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//////// FUNCTIONALITY BUTTON DELEGATION ////////
const functionalities = function (e) {
  diceContainer.classList.remove("hide");
  // Keep track of the score
  diceNumber = randomDiceNumber(1, 6);

  // Identify which button was clicked

  // Assuming the 'roll dice' was clicked
  if (e.target.classList.contains("btn-roll-dice")) {
    // Retrieve the corresponding image of the dice
    diceImage.src = `./images/dice-${diceNumber}.png`;
    // Update player rolling score
    rollingScorePlayer += diceNumber;
    document.querySelector(
      `.player-${player}-rolling-score`
    ).textContent = rollingScorePlayer;
    // Assuming the 'hold' button was clicked
  } else if (e.target.classList.contains("btn-hold")) {
    // Transfer the rolling score to the player's current score
    activePlayerScore += rollingScorePlayer;
    // Update the DOM to reflect that score
    document.querySelector(
      `.player-${player}-score`
    ).textContent = activePlayerScore;
    // Reset the player's rolling score back to zero
    rollingScorePlayer = 0;
    // Update the DOM to reflect the resetted score
    document.querySelector(
      `.player-${player}-rolling-score`
    ).textContent = rollingScorePlayer;
    switchTurn();
    player = activePlayer();
    activePlayerScore = trackCurrentScore();
  }
  // Guard Clause
  if (e.target.classList.contains("functionality-buttons")) return;
};

//////// EVENT HANDLERS ////////
directions.addEventListener("click", directionFunction);
closeModal.addEventListener("click", hideModalClick);
overlay.addEventListener("click", hideModalClick);
body.addEventListener("keydown", hideModalESC);
functionalityParentElement.addEventListener("click", functionalities);
