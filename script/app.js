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
const rollDiceAudio = new Audio("./sounds/dice-sound.mp3");
const newGameAudio = new Audio("./sounds/new-game.mp3");
const cashOutAudio = new Audio("./sounds/cash-out.mp3");
const winningAudio = new Audio("./sounds/winning-sound.mp3");

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

/////////////////////// FUNCTION SORTING HIGH SCORES ////////////////////
const highScore = function () {
  //   debugger;
  const numbersArr = [];
  let sortedArr;

  for (let v of Object.values(localStorage)) {
    numbersArr.push(+v);
  }

  sortedArr = numbersArr.sort(function (a, b) {
    return a - b < 0 ? 1 : -1;
  });
  return sortedArr;
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
      rollDiceAudio.play();
      // Retrieve the value inside of the input box

      if (winningScore === undefined) {
        winningScore = 100;
        const html = `<p>Final Score is: <span class="final-score">${winningScore}</span></p>`;
        winningScoreDiv.innerHTML = "";
        winningScoreDiv.innerHTML = html;
      }

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
    if (
      document.querySelector(`.player-${activePlayer}-current-score`)
        .textContent !==
      0 + ""
    ) {
      if (e.target.classList.contains("btn-hold")) {
        cashOutAudio.play();
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
          // winningAudio.play();
          diceContainer.classList.add("hide");
          winningPlayerId = document.querySelector(`.player-${activePlayer}`)
            .dataset.player;
          document.querySelector(`#${winningPlayerId}`).classList.add("winner");
          const winner = document.querySelector(`.player-${activePlayer}`)
            .children[0].textContent;
          const winnerScore = document.querySelector(
            `.player-${activePlayer}-final-score`
          ).textContent;
          if (!localStorage.key(`${winner}`)) {
            localStorage.setItem(`${winner}`, `${+winnerScore}`);
          } else if (localStorage.key(`${winner}`)) {
            console.log(localStorage.key(`${winner}`));
            if (`${+winnerScore}` > +localStorage.getItem(`${winner}`)) {
              localStorage.setItem(`${winner}`, `${+winnerScore}`);
            }
          } else {
            console.log("not enough");
          }
          // localStorage.setItem(`${winner}`, `${+winnerScore}`);
          for (let i = 0; i < highScore().length; i++) {
            for (k of Object.keys(localStorage)) {
              if (+localStorage.getItem(k) === highScore()[i]) {
                document
                  .querySelector(".high-score")
                  .insertAdjacentHTML(
                    "beforeend",
                    `${k} ........... ${localStorage.getItem(k)} <br/>`
                  );
              }
            }
          }
          // CHANGE THE STATE OF THE GAME
          isGameOn = false;
        }
      }
    }
    // Guard Clause
    if (e.target.classList.contains("functionality-buttons")) return;
  }
};

//////// NEW GAME FUNCTIONALITY ////////
const restartGame = function (e) {
  if (e.target.classList.contains("btn-new-game")) {
    newGameAudio.play();
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
    document.querySelector(".high-score").innerHTML = "";
    document.querySelector(".high-score").innerHTML = "<h2>High Score</h2>";
    rightSide.classList.remove("active-player");
    leftSide.classList.add("active-player");
    rightDot.classList.add("hide");
    leftDot.classList.remove("hide");
    isGameOn = true;
    activePlayer = 1;
    winningScore === undefined;
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

/////////////////////// FUNCTION FOR SETTING UP PLAYERS ////////////////////
const whoIsPlaying = function () {
  const overlay = document.createElement("div");
  const playerSelection = document.createElement("div");
  const closeBtn = document.createElement("button");
  const title = document.createElement("h2");
  const player1Label = document.createElement("label");
  const player1Insert = document.createElement("input");
  const player2Label = document.createElement("label");
  const player2Insert = document.createElement("input");
  const playBtn = document.createElement("button");
  playBtn.classList.add("btn-play");
  playBtn.textContent = `Let's Play!`;
  player1Label.textContent = "Player 1";
  player1Insert.type = "text";
  player1Insert.id = "player-one";
  player2Label.textContent = "Player 2";
  player2Insert.type = "text";
  player2Insert.id = "player-two";

  title.textContent = "Who is playing?";
  closeBtn.classList.add("close-modal");
  // playerSelection.classList.add("rules");
  playerSelection.classList.add("player-selection");
  playerSelection.appendChild(title);
  playerSelection.appendChild(closeBtn);
  playerSelection.appendChild(player1Label);
  playerSelection.appendChild(player1Insert);
  playerSelection.appendChild(player2Label);
  playerSelection.appendChild(player2Insert);
  playerSelection.appendChild(playBtn);
  overlay.appendChild(playerSelection);
  overlay.classList.add("overlay");
  body.append(overlay);

  document.querySelector(".btn-play").addEventListener("click", function () {
    document.querySelector(".player-1").children[0].textContent =
      player1Insert.value;
    document.querySelector(".player-2").children[0].textContent =
      player2Insert.value;
    overlay.classList.add("hide");
  });
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

window.addEventListener("load", whoIsPlaying);
