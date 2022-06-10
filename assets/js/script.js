const startCard = document.querySelector(".start-card");
const startQuizButton = document.querySelector("#start-quiz-btn");
const transitionCard = document.querySelector(".transition-card");
const questionCard = document.querySelector(".question-card");
const resultsCard = document.querySelector(".results-card");
const leaderboardCard = document.querySelector(".leaderboard-card");
const menuCards = [startCard, transitionCard, questionCard, resultsCard, leaderboardCard];

// 
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

// pre-game timer
let preCountDown = 4;

function countDown() {
  let timeEl = document.querySelector("#start-countdown");
  let timeInterval = setInterval(function() {
    preCountDown--;
    timeEl.textContent = preCountDown;

    if(preCountDown === 0) {
      clearInterval(timeInterval);
      timeEl.textContent = "Go!";
      nextCard2();
    }

  }, 1000);
}


// timer for questions in game
let secondsLeftInGame = 91;

function gameTime() {
  let gameTimer = document.querySelector("#seconds-left");
  let timeInterval = setInterval(function() {
    secondsLeftInGame--;
    gameTimer.textContent = secondsLeftInGame + ": seconds remaining.";

    if(secondsLeftInGame === 0) {
      clearInterval(timeInterval);
    }

  }, 1000);
}

startQuizButton.addEventListener("click", startGame);