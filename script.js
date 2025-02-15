const questions = [
  {
    question: "How do you apply a class in CSS?",
    answers: [
      { text: "#classname", correct: false },
      { text: "*classname", correct: false },
      { text: ".classname", correct: true },
      { text: "classname", correct: false },
    ],
  },
  {
    question: "What is the default position of an HTML element?",
    answers: [
      { text: "static", correct: true },
      { text: "relative", correct: false },
      { text: "absolute", correct: false },
      { text: "fixed", correct: false },
    ],
  },
  {
    question: "Which CSS property is used to create rounded corners?",
    answers: [
      { text: "corner-radius", correct: false },
      { text: "round-edge", correct: false },
      { text: "border-radius", correct: true },
      { text: "curve-border", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a valid CSS unit?",
    answers: [
      { text: "em", correct: false },
      { text: "px", correct: false },
      { text: "pt", correct: false },
      { text: "pc", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
