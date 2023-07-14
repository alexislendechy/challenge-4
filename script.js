// Global variables
var currentQuestionIndex = 0;
var timeLeft = 10;
var timerInterval;
var score = 0;

// Quiz questions and answers
var questions = [
  {
    question: "Commonly used data types DO NOT include: __________.",
    answers: [
        "Strings", 
        "Booleans", 
        "Alerts", 
        "Numbers"],
    correctAnswer: 2
  },
  {
    question: "The conditions in a if/else statement is enclosed within __________.",
    answers: [
        "Quote", 
        "Curly brackets", 
        "Parentheses", 
        "Square brackets"],
    correctAnswer: 2
  },
  {
    question: "Arrays in Java can be used to store __________.",
    answers: ["Numbers and strings", "Other arrays", "Booleans", "All the above"],
    correctAnswer: 3
  },
  {
    question: "String values must be enclosed within __________ when being assigned to variables.",
    answers: ["Commas", "Curly brackets","Quotes","Parentheses"],
    correctAnswer: 2
  },
  
];

// Function to start the quiz
function startQuiz() {
  var startScreen = document.querySelector(".start-screen");
  var displayContainer = document.getElementById("display-container");
  
  startScreen.style.display = "none";
  displayContainer.style.display = "block";
  
  displayQuestion();
  startTimer();
}

// Function to display a question and its answers
function displayQuestion() {
  var questionContainer = document.getElementById("container");
  var question = questions[currentQuestionIndex];
  
  questionContainer.innerHTML = "";
  questionContainer.innerHTML += "<h2>" + question.question + "</h2>";
  
  for (var i = 0; i < question.answers.length; i++) {
    questionContainer.innerHTML += "<button onclick='checkAnswer(" + i + ")'>" + question.answers[i] + "</button>";
  }
  
  updateQuestionCounter();
}

// Function to check the selected answer
function checkAnswer(answerIndex) {
  var question = questions[currentQuestionIndex];
  
  if (answerIndex === question.correctAnswer) {
    score++;
  }
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to update the question counter
function updateQuestionCounter() {
  var questionCounter = document.querySelector(".number-of-question");
  questionCounter.textContent = (currentQuestionIndex + 1) + " of " + questions.length + " questions";
}

// Function to start the timer
function startTimer() {
  var timeLeftElement = document.querySelector(".time-left");
  
  timeLeft = 10;
  timeLeftElement.textContent = timeLeft + "s";
  
  timerInterval = setInterval(function() {
    timeLeft--;
    timeLeftElement.textContent = timeLeft + "s";
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  
  var displayContainer = document.getElementById("display-container");
  var scoreContainer = document.querySelector(".score-container");
  var userScore = document.getElementById("user-score");
  
  displayContainer.style.display = "none";
  scoreContainer.style.display = "block";
  
  userScore.textContent = "Score: " + score + " out of " + questions.length;
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  
  var scoreContainer = document.querySelector(".score-container");
  var displayContainer = document.getElementById("display-container");
  
  scoreContainer.style.display = "none";
  displayContainer.style.display = "block";
  
  displayQuestion();
  startTimer();
}

// Event listeners
document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("next-button").addEventListener("click", function() {
  currentQuestionIndex++;
  displayQuestion();
});
document.getElementById("restart").addEventListener("click", restartQuiz);
