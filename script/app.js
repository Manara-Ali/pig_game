"use scrict";
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
let activePlayer;
let winningScore;
let winningPlayerId;
let isGameOn = true;
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
const newGameBtn = document.querySelector(".btn-new-game");
const inputData = document.getElementById("winning-score-input");
const addBtn = document.querySelector(".add-winning-number");
const winningScoreDiv = document.querySelector("#winning-score");

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
const currentPlayer = function () {
  return leftSide.classList.contains("active-player") ? 1 : 2;
};

activePlayer = currentPlayer() + "";

//////// FUNCTION TO TRACK CURRENT SCORE ////////
const trackCurrentScore = function () {
  return +document.querySelector(`.player-${activePlayer}-final-score`)
    .textContent;
};

//////// RANDOM FUNCTION BETWEEN 1 AND 6 ////////
const randomDiceNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//////// FUNCTIONALITY BUTTON DELEGATION FOR 'ROLL DICE' AND 'HOLD' BUTTONS ////////
const functionalities = function (e) {
  // Keep track of the score
  diceNumber = randomDiceNumber(1, 6);

  // Identify which button was clicked

  // CONTROLLING THE GAME STATE
  if (isGameOn) {
    // Assuming the 'roll dice' was clicked
    if (e.target.classList.contains("btn-roll-dice")) {
      diceContainer.classList.remove("hide");
      // Retrieve the corresponding image of the dice
      diceImage.src = `./images/dice-${diceNumber}.png`;

      ///////// EDGE CASES, USER ROLLS A 1
      if (diceNumber === 1) {
        rollingScorePlayer = 0;
        switchTurn();
        // Reset the player's rolling score back to zero
        rollingScorePlayer = 0;
        // Update the DOM to reflect the resetted score
        document.querySelector(
          `.player-${activePlayer}-current-score`
        ).textContent = rollingScorePlayer;
        activePlayer = currentPlayer();
        activePlayerScore = trackCurrentScore();
      } else {
        // Update player rolling score
        rollingScorePlayer += diceNumber;
        // Update the rolling score on the DOM
        document.querySelector(
          `.player-${activePlayer}-current-score`
        ).textContent = rollingScorePlayer;
      }
    }
    // Assuming the 'hold' button was clicked
    if (e.target.classList.contains("btn-hold")) {
      // Transfer the rolling score to the player's current score
      activePlayerScore += rollingScorePlayer;
      // Update the DOM to reflect that score
      document.querySelector(
        `.player-${activePlayer}-final-score`
      ).textContent = activePlayerScore;
      // Reset the player's rolling score back to zero
      rollingScorePlayer = 0;
      // Update the DOM to reflect the resetted score
      document.querySelector(
        `.player-${activePlayer}-current-score`
      ).textContent = rollingScorePlayer;
      ////// BEFORE WE SWICTH PLAYERS, I NEED TO VERIFY IF THE CURRENT PLAYER WON THE GAME OR NOT
      if (
        +document.querySelector(`.player-${activePlayer}-final-score`)
          .textContent < winningScore
      ) {
        switchTurn();
        activePlayer = currentPlayer();
        activePlayerScore = trackCurrentScore();
      } else {
        // document
        //   .querySelector(`.player-${activePlayer}-layout`)
        //   .classList.add("winner");

        winningPlayerId = document.querySelector(`.player-${activePlayer}`)
          .dataset.player;
        document.querySelector(`#${winningPlayerId}`).classList.add("winner");
        console.log(`.player-${activePlayer} won!`);
        // CHANGE THE STATE OF THE GAME
        isGameOn = false;
      }
    }
    // Guard Clause
    if (e.target.classList.contains("functionality-buttons")) return;
  }
  // // Assuming the 'roll dice' was clicked
  // if (e.target.classList.contains("btn-roll-dice")) {
  //   diceContainer.classList.remove("hide");
  //   // Retrieve the corresponding image of the dice
  //   diceImage.src = `./images/dice-${diceNumber}.png`;

  //   ///////// EDGE CASES, USER ROLLS A 1
  //   if (diceNumber === 1) {
  //     rollingScorePlayer = 0;
  //     switchTurn();
  //     // Reset the player's rolling score back to zero
  //     rollingScorePlayer = 0;
  //     // Update the DOM to reflect the resetted score
  //     document.querySelector(
  //       `.player-${activePlayer}-current-score`
  //     ).textContent = rollingScorePlayer;
  //     activePlayer = currentPlayer();
  //     activePlayerScore = trackCurrentScore();
  //   } else {
  //     // Update player rolling score
  //     rollingScorePlayer += diceNumber;
  //     // Update the rolling score on the DOM
  //     document.querySelector(
  //       `.player-${activePlayer}-current-score`
  //     ).textContent = rollingScorePlayer;
  //   }
  // }
  // // Assuming the 'hold' button was clicked
  // if (e.target.classList.contains("btn-hold")) {
  //   // Transfer the rolling score to the player's current score
  //   activePlayerScore += rollingScorePlayer;
  //   // Update the DOM to reflect that score
  //   document.querySelector(
  //     `.player-${activePlayer}-final-score`
  //   ).textContent = activePlayerScore;
  //   // Reset the player's rolling score back to zero
  //   rollingScorePlayer = 0;
  //   // Update the DOM to reflect the resetted score
  //   document.querySelector(
  //     `.player-${activePlayer}-current-score`
  //   ).textContent = rollingScorePlayer;
  //   ////// BEFORE WE SWICTH PLAYERS, I NEED TO VERIFY IF THE CURRENT PLAYER WON THE GAME OR NOT
  //   if (
  //     +document.querySelector(`.player-${activePlayer}-final-score`)
  //       .textContent < winningScore
  //   ) {
  //     switchTurn();
  //     activePlayer = currentPlayer();
  //     activePlayerScore = trackCurrentScore();
  //   } else {
  //     // document
  //     //   .querySelector(`.player-${activePlayer}-layout`)
  //     //   .classList.add("winner");

  //     const winningPlayerId = document.querySelector(`.player-${activePlayer}`)
  //       .dataset.player;
  //     document.querySelector(`#${winningPlayerId}`).classList.add("winner");
  //     console.log(`.player-${activePlayer} won!`);
  //   }
  // }
  // // Guard Clause
  // if (e.target.classList.contains("functionality-buttons")) return;
};

//////// NEW GAME FUNCTIONALITY ////////
const restartGame = function (e) {
  //   if (e.target.classList.contains("btn-new-game")) {
  //     diceContainer.classList.add("hide");
  //     const html = `<input
  //     type="text"
  //     name="winning-score-input"
  //     id="winning-score-input"
  //     class="winning-score-box"
  //     placeholder="Enter Winning Score"
  //   />
  //   <button class="add-winning-number">
  //     <i class="fas fa-plus-square"></i>
  //   </button>`;
  //     winningScoreDiv.innerHTML = "";
  //     winningScoreDiv.insertAdjacentHTML("afterbegin", html);
  //     rollingScorePlayer = 0;
  //     activePlayerScore = 0;
  //     if (winningPlayerId) {
  //       document.querySelector(`#${winningPlayerId}`).classList.remove("winner");
  //     }
  //     document.querySelector(".player-1-current-score").textContent = 0;
  //     document.querySelector(".player-2-current-score").textContent = 0;
  //     document.querySelector(".player-1-final-score").textContent = 0;
  //     document.querySelector(".player-2-final-score").textContent = 0;
  //     rightSide.classList.remove("active-player");
  //     leftSide.classList.add("active-player");
  //     rightDot.classList.add("hide");
  //     leftDot.classList.remove("hide");
  //     isGameOn = true;
  //     activePlayer = 1;
  //   }
  if (e.target.classList.contains("btn-new-game")) {
    diceContainer.classList.add("hide");

    // Clear inner div
    winningScoreDiv.innerHTML = "";
    // Build the input button
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.placeholder = "Enter Winning Score";
    inputEl.id = "new-winning-score-input";
    inputEl.classList.add("winning-score-box");

    // Rebuild button
    const newBtn = document.createElement("button");
    newBtn.classList.add("add-winning-number");

    // Append font awesome to the button
    const fontAwesome = document.createElement("i");
    fontAwesome.classList.add("fas");
    fontAwesome.classList.add("fa-plus-square");

    newBtn.appendChild(fontAwesome);

    // Append all to winning div
    winningScoreDiv.appendChild(inputEl);
    winningScoreDiv.appendChild(newBtn);
    document.getElementById("wrapper").append(winningScoreDiv);

    rollingScorePlayer = 0;
    activePlayerScore = 0;
    if (winningPlayerId) {
      document.querySelector(`#${winningPlayerId}`).classList.remove("winner");
    }
    document.querySelector(".player-1-current-score").textContent = 0;
    document.querySelector(".player-2-current-score").textContent = 0;
    document.querySelector(".player-1-final-score").textContent = 0;
    document.querySelector(".player-2-final-score").textContent = 0;
    rightSide.classList.remove("active-player");
    leftSide.classList.add("active-player");
    rightDot.classList.add("hide");
    leftDot.classList.remove("hide");
    isGameOn = true;
    activePlayer = 1;
  }
};

const setWinningNumber = function (e) {
  if (e.code === "Enter") {
    if (document.querySelector("#new-winning-score-input")) {
      winningScore = +document.querySelector("#new-winning-score-input").value;
    } else {
      winningScore = +inputData.value;
    }
    const html = `<p>Final Score is: <span class="final-score">${winningScore}</span></p>`;
    winningScoreDiv.innerHTML = "";
    winningScoreDiv.innerHTML = html;
  }
};

const setWinningBtn = function (e) {
  if (document.querySelector("#new-winning-score-input")) {
    winningScore = +document.querySelector("#new-winning-score-input").value;
  } else {
    winningScore = +inputData.value;
  }
  const html = `<p>Final Score is: <span class="final-score">${winningScore}</span></p>`;
  winningScoreDiv.innerHTML = "";
  winningScoreDiv.innerHTML = html;
};

////////////////////////////////////////////////////////////////////  EVENT HANDLERS /////////////////////////////////////////////////////
directions.addEventListener("click", directionFunction);
closeModal.addEventListener("click", hideModalClick);
overlay.addEventListener("click", hideModalClick);
body.addEventListener("keydown", hideModalESC);
functionalityParentElement.addEventListener("click", functionalities);
newGameBtn.addEventListener("click", restartGame);
winningScoreDiv.addEventListener("keypress", setWinningNumber);
winningScoreDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("fas")) {
    setWinningBtn();
  }
});
