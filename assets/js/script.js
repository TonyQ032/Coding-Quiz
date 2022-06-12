// All different cards for site
const startCard = document.querySelector(".start-card");
const transitionCard = document.querySelector(".transition-card");
const questionCard = document.querySelector(".question-card");
const resultsCard = document.querySelector(".results-card");
const leaderboardCard = document.querySelector(".leaderboard-card");

const menuCards = [startCard, transitionCard, questionCard, resultsCard, leaderboardCard];

const mainCard = document.querySelector("#main-card");
const headerCard = document.querySelector("h1");

// Quiz variables
const quizQuestion = document.querySelector("#question");
// const answerOne = document.querySelector("#answer-1");
// const answerTwo = document.querySelector("#answer-2");
// const answerThree = document.querySelector("#answer-3");
// const answerFour = document.querySelector("#answer-4");
// const answerButtons = document.querySelector(".answers");
const correctOrNot = document.querySelector("#correct-or-not");
let answerContainer = document.querySelector("#answer-container");


// Non-answer buttons
const startQuizButton = document.querySelector("#start-quiz-btn");
const submitInitials = document.querySelector("#submit-initials");
const playAgainButton = document.querySelector("#back-to-home");

//Function variables
let questionsUsed = [];
let questionIndex;
// -------------------------

// All the quiz questions and answers
let questions = [{
  question: "Which of the following is NOT a semantic HTML element?",
  answers: [{
    text: "<div>", isCorrect: true
  }, {
    text: "<main>", isCorrect: false
  }, {
    text: "<header>", isCorrect: false
  }, {
    text: "<footer>", isCorrect: false
  }]
}, { 
  question: "In CSS, what is the correct way to target an HTML element's ID attribute if the ID has a value of 'wrapper'?",
  answers: [{
    text: ".wrapper", isCorrect: false
  }, {
    text: "#wrapper", isCorrect: true
  }, {
    text: "!wrapper", isCorrect: false
  }, {
    text: "wrapper", isCorrect: false
  }]
}, { 
  question: "According to the CSS Box Model, what is the furthest most outside layer of a box called?",
  answers: [{
    text: "padding", isCorrect: false
  }, {
    text: "border", isCorrect: false
  }, {
    text: "margin", isCorrect: true
  }, {
    text: "content", isCorrect: false
  }]
}, { 
  question: "In web development, what does the 'DOM' stand for?",
  answers: [{
    text: "Digital Orientation Map", isCorrect: false
  }, {
    text: "Data Omission Module", isCorrect: false
  }, {
    text: "Document Object Model", isCorrect: true
  }, {
    text: "Datatype Offload Model", isCorrect: false
  }]
}, { 
  question: "In JavaScript, what does the querySelector method do?",
  answers: [{
    text: "Converts the value of the object into a string", isCorrect: false
  }, {
    text: "Creates different CSS depending on the screen size", isCorrect: false
  }, {
    text: "Returns the data type of the object it is attached to", isCorrect: false
  }, {
    text: "Allows you to select and target an HTML element", isCorrect: true
  }]
}, { 
  question: "In JavaScript, which of the following would accurately assign the Boolean value of 'true' to the variable 'answer'?",
  answers: [{
    text: "var answer = true;", isCorrect: true
  }, {
    text: "var answer = 'true';", isCorrect: false
  }, {
    text: "var answer(true);", isCorrect: false
  }, {
    text: "var answer.true;", isCorrect: false
  }]
}, { 
  question: "In JavaScript, what is the index of the first item in an array?",
  answers: [{
    text: "1", isCorrect: false
  }, {
    text: "0", isCorrect: true
  }, {
    text: "-1", isCorrect: false
  }, {
    text: "null", isCorrect: false
  }]
}, { 
  question: "In JavaScript, which of the following is NOT a valid condition in a conditional statement?",
  answers: [{
    text: "else if", isCorrect: false
  }, {
    text: "if", isCorrect: false
  }, {
    text: "why", isCorrect: true
  }, {
    text: "else", isCorrect: false
  }]
}, { 
  question: "Which HTML attribute, when placed within an <a> element, would open a link in a separate tab when clicked?",
  answers: [{
    text: "style = 'display: flex;'", isCorrect: false
  }, {
    text: "href = './new-tab'", isCorrect: false
  }, {
    text: "src = 'tab+'", isCorrect: false
  }, {
    text: "target = '_blank'", isCorrect: true
  }]
}, { 
  question: "In CSS, what is the proper syntax for writing comments?",
  answers: [{
    text: "/* This is the proper way to comment in CSS */", isCorrect: true
  }, {
    text: "// This is the proper way to comment in CSS ", isCorrect: false
  }, {
    text: "<!-- This is the proper way to comment in CSS -->", isCorrect: false
  }, {
    text: "# This is the proper way  to comment in CSS", isCorrect: false
  }]
}, { 
  question: "What is the MOST specific selector in CSS?",
  answers: [{
    text: "class", isCorrect: false
  }, {
    text: "id", isCorrect: true
  }, {
    text: "universal", isCorrect: false
  }, {
    text: "element", isCorrect: false
  }]
}, { 
  question: "What should be the first line of an HTML document?",
  answers: [{
    text: "<Hello world!>", isCorrect: false
  }, {
    text: "<html>", isCorrect: false
  }, {
    text: "<head>", isCorrect: false
  }, {
    text: "<!DOCTYPE HTML>", isCorrect: true
  }]
}];

// -------------------------

// Starts game
function startGame() {

  //Allows questions to be reused if played again
  questionsUsed = []

  //Deletes previous answers generated
  answerContainer.replaceChildren();
  startCard.removeAttribute("id", "appear");
  transitionCard.setAttribute("id", "appear");

  countDown();
};


// -------------------------

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




// Returns to menu card from any card (debugging purposes)
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
      displayQuizCard();
    }
  }, 1000);
}

// timer for questions in game
function gameTime() {
  let secondsLeftInGame = 61;
  let gameTimer = document.querySelector("#seconds-left");
  let timeInterval = setInterval(function() {
    secondsLeftInGame--;
    gameTimer.textContent = secondsLeftInGame + ": seconds remaining.";

    if(secondsLeftInGame === 0) {
      clearInterval(timeInterval);
      secondsLeftInGame = 61;
      gameTimer.textContent = "";
      nextCard3();
    }

  }, 1000);
}








    















// Displays question on to page when used
function displayQuestions(a) {
  quizQuestion.textContent = questions[a].question;
}

function displayAnswers(a) {
  let answersGenerated = questions[a].answers;
  for (let i = 0; i < answersGenerated.length; i++) {
    let answerButton = document.createElement('li');
    answerButton.setAttribute("class", "answers");
    answerButton.textContent = answersGenerated[i].text;
    answerContainer.appendChild(answerButton);
  }
}

// Checks to see if answer is correct
// a = question index and b = which answer they chose
function rightOrWrong(a, b) {
  return questions[a].answers[b].isCorrect;
}

// determines what question will be asked
function randomNumber() {
  return Math.floor(Math.random() * questions.length);
}

function displayQuizCard() {
  //generates a random number from the questions array
  questionIndex = randomNumber();

  //checks to see if the question has already been used and regenerates a new number
  if (questionsUsed.includes(questionIndex)){
    questionIndex = randomNumber();
  }

  // Displays the current questions and answers
  displayQuestions(questionIndex);
  displayAnswers(questionIndex)

  //Pushes the index of used question to questionsUsed to not be repeated
  questionsUsed.push(questionIndex);

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