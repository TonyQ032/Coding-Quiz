// All different cards for site
const startCard = document.querySelector(".start-card");
const transitionCard = document.querySelector(".transition-card");
const questionCard = document.querySelector(".question-card");
const resultsCard = document.querySelector(".results-card");
const leaderboardCard = document.querySelector(".leaderboard-card");
const menuCards = [startCard, transitionCard, questionCard, resultsCard, leaderboardCard];

//Used for dynamic styling
const mainCard = document.querySelector("#main-card");
const headerCard = document.querySelector("h1");

// Quiz card elements
const quizQuestion = document.querySelector("#question");
const correctOrNot = document.querySelector("#correct-or-not");
let answerContainer = document.querySelector("#answer-container");
let answerBtn = document.querySelectorAll(".answer-button");

// Non-answer buttons
const startQuizButton = document.querySelector("#start-quiz-btn");
const submitInitials = document.querySelector("#submit-initials");
const playAgainButton = document.querySelector("#back-to-home");
const resetScoreButton = document.querySelector("#reset-scores");

//Function variables
let questionsUsed = [];
let questionIndex;
let playerScore = 0;

//Misc
const questionsAnswered = document.querySelector("#questions-answered");

// --------------------------------------------

// All the quiz questions and answers
let questions = [{
  question: "Which of the following is NOT a semantic HTML element?",
  answers: [{
    text: "<div>", answer: true
  }, {
    text: "<main>", answer: false
  }, {
    text: "<header>", answer: false
  }, {
    text: "<footer>", answer: false
  }]
}, { 
  question: "In CSS, what is the correct way to target an HTML element's ID attribute if the ID has a value of 'wrapper'?",
  answers: [{
    text: ".wrapper", answer: false
  }, {
    text: "#wrapper", answer: true
  }, {
    text: "!wrapper", answer: false
  }, {
    text: "wrapper", answer: false
  }]
}, { 
  question: "According to the CSS Box Model, what is the furthest most outside layer of a box called?",
  answers: [{
    text: "padding", answer: false
  }, {
    text: "border", answer: false
  }, {
    text: "margin", answer: true
  }, {
    text: "content", answer: false
  }]
}, { 
  question: "In web development, what does the 'DOM' stand for?",
  answers: [{
    text: "Digital Orientation Map", answer: false
  }, {
    text: "Data Omission Module", answer: false
  }, {
    text: "Document Object Model", answer: true
  }, {
    text: "Datatype Offload Model", answer: false
  }]
}, { 
  question: "In JavaScript, what does the querySelector method do?",
  answers: [{
    text: "Converts the value of the object into a string", answer: false
  }, {
    text: "Creates different CSS depending on the screen size", answer: false
  }, {
    text: "Returns the data type of the object it is attached to", answer: false
  }, {
    text: "Allows you to select and target an HTML element", answer: true
  }]
}, { 
  question: "In JavaScript, which of the following would accurately assign the Boolean value of 'true' to the variable 'answer'?",
  answers: [{
    text: "var answer = true;", answer: true
  }, {
    text: "var answer = 'true';", answer: false
  }, {
    text: "var answer(true);", answer: false
  }, {
    text: "var answer.true;", answer: false
  }]
}, { 
  question: "In JavaScript, what is the index of the first item in an array?",
  answers: [{
    text: "1", answer: false
  }, {
    text: "0", answer: true
  }, {
    text: "-1", answer: false
  }, {
    text: "null", answer: false
  }]
}, { 
  question: "In JavaScript, which of the following is NOT a valid condition in a conditional statement?",
  answers: [{
    text: "else if", answer: false
  }, {
    text: "if", answer: false
  }, {
    text: "why", answer: true
  }, {
    text: "else", answer: false
  }]
}, { 
  question: "Which HTML attribute, when placed within an <a> element, would open a link in a separate tab when clicked?",
  answers: [{
    text: "style = 'display: flex;'", answer: false
  }, {
    text: "href = './new-tab'", answer: false
  }, {
    text: "src = 'tab+'", answer: false
  }, {
    text: "target = '_blank'", answer: true
  }]
}, { 
  question: "In CSS, what is the proper syntax for writing comments?",
  answers: [{
    text: "/* This is the proper way to comment in CSS */", answer: true
  }, {
    text: "// This is the proper way to comment in CSS ", answer: false
  }, {
    text: "<!-- This is the proper way to comment in CSS -->", answer: false
  }, {
    text: "# This is the proper way  to comment in CSS", answer: false
  }]
}, { 
  question: "What is the MOST specific selector in CSS?",
  answers: [{
    text: "class", answer: false
  }, {
    text: "id", answer: true
  }, {
    text: "universal", answer: false
  }, {
    text: "element", answer: false
  }]
}, { 
  question: "What should be the first line of an HTML document?",
  answers: [{
    text: "<Hello world!>", answer: false
  }, {
    text: "<html>", answer: false
  }, {
    text: "<head>", answer: false
  }, {
    text: "<!DOCTYPE HTML>", answer: true
  }]
}];

// Starts game
function startGame() {

  //Allows questions to be reused if played again
  questionsUsed = [];

  //Resets player score if replayed
  playerScore = 0;

  //Deletes previous answers generated
  answerContainer.replaceChildren();
  nextCard();
  countDown();
};

// Closes menu card, opens transition card
function nextCard() {
  menuCards[0].removeAttribute("id", "appear");
  menuCards[1].setAttribute("id", "appear");
}

//Closes countdown menu, opens question card
function nextCard2() {
  menuCards[1].removeAttribute("id", "appear");
  menuCards[2].setAttribute("id", "appear");
  gameTime();
}

//closes quiz menu, opens results card
function nextCard3() {
  menuCards[2].removeAttribute("id", "appear");
  menuCards[3].setAttribute("id", "appear");

  //Displays total amount of correct answers player received
  questionsAnswered.textContent = "";
  questionsAnswered.textContent = playerScore;

  //Reverts card colors back to normal if card transitions mid color change
  mainCard.style.cssText = "filter: drop-shadow(2px 4px 10px black); border: white 1px dashed;) ";
  headerCard.style.cssText = "filter: drop-shadow(2px 4px 10px black); border: white 1px dashed;) ";
}

//closes results card, opens leaderboard card
function nextCard4() {
  menuCards[3].removeAttribute("id", "appear");
  menuCards[4].setAttribute("id", "appear");
}

// Returns to menu card from any card
function backToMenuCard() {
  for (let i = 0; i < 5; i++) {
    if (menuCards[i].id === ("appear")) {
      menuCards[i].removeAttribute("id", "appear");
    }
    startCard.setAttribute("id", "appear");
  }
}

// Transitions card from main menu to the countdown menu which displays a countdown 
// timer starting at 3 seconds
function countDown() {
  let preCountDown = 4;

  let timeEl = document.querySelector("#start-countdown");

  let timeInterval = setInterval(function() {
    preCountDown--;
    timeEl.textContent = preCountDown;

    if(preCountDown <= 0) {
      clearInterval(timeInterval);
      preCountDown = 4;
      timeEl.textContent = "";
      nextCard2();
      displayQuizCard();
    }
  }, 1000);
}

// timer for questions in game
let secondsLeftInGame = 61;

function gameTime() {
  let gameTimer = document.querySelector("#seconds-left");
  let timeInterval = setInterval(function() {
    secondsLeftInGame--;
    gameTimer.textContent = secondsLeftInGame + ": seconds remaining.";

    if(secondsLeftInGame <= 0) {
      clearInterval(timeInterval);
      secondsLeftInGame = 61;
      gameTimer.textContent = "";
      nextCard3();
    }
    if (questionsUsed.length === 11) {
      clearInterval(timeInterval);
      secondsLeftInGame = 61;
      gameTimer.textContent = "";
      nextCard3();
      displayQuizCard();
    };
  }, 1000);
}

// Displays question on to page when used
function displayQuestions(a) {
  quizQuestion.textContent = questions[a].question;
}

function displayAnswers(a) {
  let answersGenerated = questions[a].answers;
  for (let i = 0; i < answersGenerated.length; i++) {
    // gives boolean value of answer selected
    let answer = answersGenerated[i].answer;

    let answerButton = document.createElement('button');
    answerButton.classList.add("answer-button", `${answer}`);

    answerButton.textContent = answersGenerated[i].text;
    answerContainer.appendChild(answerButton);
  }
}

// Generates a random number between 0 and 11 (used to decide question order)
function randomNumber() {
  return Math.floor(Math.random() * questions.length);
}

// Main function that generates and displays the questions and answers to the main quiz card
function displayQuizCard() {
  //Deletes previous answer choices if replaying game without refresh
  answerContainer.replaceChildren();

  //Assigns a random number to questionIndex, this will be used to decide which question appears
  questionIndex = randomNumber();

  //Checks to see if the random number generated for questionIndex has been used already,
  //if so, it generates another one that hasn't been used yet
  while (questionsUsed.includes(questionIndex)){
    questionIndex = randomNumber();
  }

  //Pushes the index of used question to questionsUsed. This array is checked by the while loop above
  //to ensure no repeat questions per game
  questionsUsed.push(questionIndex);

  // Displays the current questions and answers using the generated questionIndex
  displayQuestions(questionIndex);
  displayAnswers(questionIndex);
};

//Complex function triggered when user clicks on an answer
//Checks to see if the answer is correct or not and executes various functions depending on that
answerContainer.addEventListener("click", (event) => {
  let variable = event.target;

  if (variable.matches("button")) {
    let answer = event.target.classList.contains(true);

    //If the answer selected is correct, it adds a point to the player score and continues the game
    //(unless the player is on the tenth question)
    if (answer === true && (questionsUsed.length < questions.length)) {
      playerScore++;
      correctAnswer();
      event.target.classList.add("correct");

    } else if (answer === false && (questionsUsed.length < questions.length)) {
      wrongAnswer();
      event.target.classList.add("incorrect");

    } else {
      nextCard3()
    }
  }
});

//Function ran if the user selects the correct answer
function correctAnswer() {
  //Changes display colors to green
  mainCard.style.cssText = "filter: drop-shadow(2px 4px 10px green); border: #4be300 1px dashed;) ";
  headerCard.style.cssText = "filter: drop-shadow(2px 4px 10px green); border: #4be300 1px dashed;) ";

  correctOrNot.textContent = "Correct!";
  correctOrNot.setAttribute("class", "incorrect-text");

  //Allows effects to remain on screen for 1.5 seconds
  let secondsOfResponse = 1;
  let intervalTime = setInterval(function() {
    secondsOfResponse--;

    if(secondsOfResponse === 0) {
      clearInterval(intervalTime);
      secondsOfResponse = 1;
      correctOrNot.textContent = "";

      //Changes display colors back to normal
      mainCard.style.cssText = "filter: drop-shadow(2px 4px 10px black); border: white 1px dashed;) ";
      headerCard.style.cssText = "filter: drop-shadow(2px 4px 10px black); border: white 1px dashed;) ";
      
      //Moves to next question
      displayQuizCard();
    }
  }, 1500);
}

function wrongAnswer() {
  //Changes display colors to red
  mainCard.style.cssText = "filter: drop-shadow(2px 4px 10px #b31313); border: #ff0000 1px dashed;) ";
  headerCard.style.cssText = "filter: drop-shadow(2px 4px 10px #b31313); border: #ff0000 1px dashed;) ";

  correctOrNot.textContent = "Incorrect!";
  correctOrNot.setAttribute("class", "correct-text");

  //Removes ten seconds from timer 
  secondsLeftInGame = secondsLeftInGame - 10;

  //Allows effects to remain on screen for 1.5 seconds
  let secondsOfResponse = 1;
  let intervalTime = setInterval(function() {
    secondsOfResponse--;
    if(secondsOfResponse === 0) {
      clearInterval(intervalTime);
      secondsOfResponse = 1;
      correctOrNot.textContent = "";

      //Changes display colors back to normal
      mainCard.style.cssText = "filter: drop-shadow(2px 4px 10px black); border: white 1px dashed;) ";
      headerCard.style.cssText = "filter: drop-shadow(2px 4px 10px black); border: white 1px dashed;) ";
      
      //Moves to next question
      displayQuizCard();
    }
  }, 1500);
}

//Takes user initials and score, logs it to leaderboard
let scoreInput = document.querySelector("#player-initials");
let leaderboardEl = document.querySelector("#leaderboard");
let scores = [];

function renderLeaderboard() {
  leaderboardEl.innerHTML = "";

  for (let i = 0; i < scores.length; i++) {
    let score = scores[i];

    let liEl = document.createElement("li");
    liEl.textContent = score;

    leaderboardEl.appendChild(liEl);
  }
}

//Checks localStorage for previous scores
function init() {
  let storedScores = JSON.parse(localStorage.getItem("scores"));

  if (storedScores !== null) {
    scores = storedScores;
  }

  renderLeaderboard();
}

//Stores the user scores into localStorage
function storeScores() {
  localStorage.setItem("scores", JSON.stringify(scores))
}

//Submits user initials and score to leaderboard when 'Submit' button is pressed
submitInitials.addEventListener("click", function(event) {
  let scoreText = scoreInput.value.trim();
  if (scoreText === "") {
    return;
  }

  scores.push(playerScore + " - " + scoreText);
  scoreInput.value = "";

  storeScores();
  renderLeaderboard();
})

//Clears scores saved
function resetScores() {
  scores.length = 0;
  storeScores();
  renderLeaderboard();
}

init();

resetScoreButton.addEventListener("click", resetScores);

startQuizButton.addEventListener("click", startGame);

submitInitials.addEventListener("click", nextCard4);

playAgainButton.addEventListener("click", backToMenuCard);