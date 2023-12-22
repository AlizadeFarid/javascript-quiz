const questions = [
  {
    question: "10 + 2",
    answers: [
      { text: "10", correct: false },
      { text: "8", correct: false },
      { text: "12", correct: true },
      { text: "11", correct: false },
    ],
  },
  {
    question: "22 + 4",
    answers: [
      { text: "13", correct: false },
      { text: "26", correct: true },
      { text: "34", correct: false },
      { text: "16", correct: false },
    ],
  },
  {
    question: "11 + 5",
    answers: [
      { text: "16", correct: true },
      { text: "12", correct: false },
      { text: "12", correct: false },
      { text: "11", correct: false },
    ],
  },
  {
    question: "34 + 4",
    answers: [
      { text: "10", correct: false },
      { text: "27", correct: false },
      { text: "55", correct: false },
      { text: "38", correct: true },
    ],
  },
  {
    question: "19 + 4",
    answers: [
      { text: "44", correct: false },
      { text: "67", correct: false },
      { text: "36", correct: false },
      { text: "23", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answersBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

//Start Game
function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

//Show Questions
function showQuestion() {
  resetGame();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = createButton(answer.text, answer.correct);
    answersBtn.appendChild(button);
  });
}

function createButton(text, correct) {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.classList.add("btn");
  if (correct) {
    button.dataset.correct = true;
  }
  button.addEventListener("click", selectedAnswer);
  return button;
}

//Resat Game
function resetGame() {
  nextBtn.style.display = "none";
  clearChildren(answersBtn);
}

//Select Answer
function selectedAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answersBtn.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  nextBtn.style.display = "block";
}

//Show Score
function showScore() {
  resetGame();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

//Next Button
function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startGame();
  }
});

function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

startGame();
