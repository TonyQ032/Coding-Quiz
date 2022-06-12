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
const correctOrNot = document.querySelector("#correct-or-not");
let answerContainer = document.querySelector("#answer-container");
let answerBtn = document.querySelectorAll(".answer-button");

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
  questionsUsed = []

  //Deletes previous answers generated
  answerContainer.replaceChildren();
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

// Returns to menu card from any card (debugging purposes)
// Will be deleted in final version
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
  displayAnswers(questionIndex)
};

// Ends game (not functioning yet)
function gameOver() {

}

// clicking on start button starts game
startQuizButton.addEventListener("click", startGame);

submitInitials.addEventListener("click", nextCard4);

playAgainButton.addEventListener("click", backToMenuCard);

answerContainer.addEventListener("click", (event) => {
  let variable = event.target;

  if (variable.matches("button")) {
    let answer = event.target.classList.contains(true);
    if (answer === true) {
      event.target.classList.add("correct");
      correctOrNot.textContent = "Correct!";
      correctOrNot.setAttribute("class", "correct-text");
      console.log("correct");
    } else {
      event.target.classList.add("incorrect");
      correctOrNot.textContent = "Incorrect!";
      correctOrNot.setAttribute("class", "incorrect-text");
      console.log("incorrect");
    };

    if (questionsUsed.length < questions.length) {
      //clearDisplay();
      displayQuizCard();
    }
    else {
      //gameOver()
      nextCard3()
    };
  }
});

//Will change site colors depending on right or wrong
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