const startCard = document.querySelector(".start-card");
const startQuizButton = document.querySelector("#start-quiz-btn");
const transitionCard = document.querySelector(".transition-card");
const questionCard = document.querySelector(".question-card");
const resultsCard = document.querySelector(".results-card");
const leaderboardCard = document.querySelector(".leaderboard-card");
const menuCards = [startCard, transitionCard, questionCard, resultsCard, leaderboardCard];

const mainCard = document.querySelector("#main-card");
const headerCard = document.querySelector("h1");

const submitInitials = document.querySelector("#submit-initials");
const playAgainButton = document.querySelector("#back-to-home");

// starts game
function startGame() {
  console.log("start");
  startCard.removeAttribute("id", "appear");
  transitionCard.setAttribute("id", "appear");
  countDown();
};


// at the moment i will be making individual "nextCard" functions that change to the next card
// however by the end of the project these should all be in one single function
// (utilizing a for loop and conditional statements most likely)

// Closes menu card, opens next card
function nextCard() {
  console.log("ran nextCard");
  menuCards[0].removeAttribute("id", "appear");
  menuCards[1].setAttribute("id", "appear");
}

//Closes countdown menu, opens question card
function nextCard2() {
  console.log("ran nextCard");
  menuCards[1].removeAttribute("id", "appear");
  menuCards[2].setAttribute("id", "appear");
  gameTime();
}

//closes quiz menu, opens results card
function nextCard3() {
  menuCards[2].removeAttribute("id", "appear");
  menuCards[3].setAttribute("id", "appear");
}

//closes results card, opens leaderboard card
function nextCard4() {
  menuCards[3].removeAttribute("id", "appear");
  menuCards[4].setAttribute("id", "appear");
}

function backToMenuCard() {
  for (let i = 0; i < 5; i++) {
    if (menuCards[i].id === ("appear")) {
      menuCards[i].removeAttribute("id", "appear");
    }
    startCard.setAttribute("id", "appear");
  }
}

// pre-game timer

function countDown() {
  let preCountDown = 4;

  let timeEl = document.querySelector("#start-countdown");

  let timeInterval = setInterval(function() {
    preCountDown--;
    timeEl.textContent = preCountDown;

    if(preCountDown === 0) {
      clearInterval(timeInterval);
      preCountDown = 4;
      timeEl.textContent = "";
      nextCard2();
    }
  }, 1000);
}

// timer for questions in game
function gameTime() {
  let secondsLeftInGame = 91;
  let gameTimer = document.querySelector("#seconds-left");
  let timeInterval = setInterval(function() {
    secondsLeftInGame--;
    gameTimer.textContent = secondsLeftInGame + ": seconds remaining.";

    if(secondsLeftInGame === 0) {
      clearInterval(timeInterval);
      secondsLeftInGame = 91;
      gameTimer.textContent = "";
      nextCard3();
    }

  }, 1000);
}




// clicking on start button starts game
startQuizButton.addEventListener("click", startGame);

submitInitials.addEventListener("click", nextCard4);

playAgainButton.addEventListener("click", backToMenuCard);

function placeHolder() {
  //default card colors
  mainCard.style.cssText = "filter: drop-shadow(2px 4px 10px black); border: white 1px dashed;) ";
  headerCard.style.cssText = "filter: drop-shadow(2px 4px 10px black); border: white 1px dashed;) ";

  //turns cards green
  mainCard.style.cssText = "filter: drop-shadow(2px 4px 10px #349e00); border: #4be300 1px dashed;) ";
  headerCard.style.cssText = "filter: drop-shadow(2px 4px 10px #349e00); border: #4be300 1px dashed;) ";

  //turns cards red
  mainCard.style.cssText = "filter: drop-shadow(2px 4px 10px #b31313); border: #ff0000 1px dashed;) ";
  headerCard.style.cssText = "filter: drop-shadow(2px 4px 10px #b31313); border: #ff0000 1px dashed;) ";
}