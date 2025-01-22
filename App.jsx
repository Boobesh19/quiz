const quizQuestions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Galileo", "Curie"], answer: "Einstein" },
  { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: "Blue Whale" },
  { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
];

let currentQuestionIndex = 0;
let userAnswers = Array(quizQuestions.length).fill(null); // Track user's answers for all questions

const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const navigationElement = document.getElementById('navigation');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const correctAnswersElement = document.getElementById('correct-answers');
const restartButton = document.getElementById('restart-button');

function loadQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = `Question ${currentQuestionIndex + 1} / ${quizQuestions.length}: ${currentQuestion.question}`;
  optionsElement.innerHTML = '';
  currentQuestion.options.forEach((option) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.className = 'option-button';
    button.onclick = () => handleAnswerSelection(option);
    if (userAnswers[currentQuestionIndex] === option) {
      button.classList.add('selected'); // Highlight previously selected answer
    }
    optionsElement.appendChild(button);
  });

  // Show or hide navigation buttons
  navigationElement.innerHTML = '';
  if (currentQuestionIndex > 0) {
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.onclick = () => navigateQuestion(-1);
    navigationElement.appendChild(backButton);
  }
  if (currentQuestionIndex < quizQuestions.length - 1) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.onclick = () => navigateQuestion(1);
    navigationElement.appendChild(nextButton);
  } else {
    const finishButton = document.createElement('button');
    finishButton.textContent = 'Finish';
    finishButton.onclick = finishQuiz;
    navigationElement.appendChild(finishButton);
  }
}

function handleAnswerSelection(selectedOption) {
  userAnswers[currentQuestionIndex] = selectedOption; // Save user's answer
  loadQuestion(); // Reload to update selection highlight
}

function navigateQuestion(direction) {
  currentQuestionIndex += direction;
  loadQuestion();
}

function finishQuiz() {
  const score = userAnswers.filter((answer, index) => answer === quizQuestions[index].answer).length;

  // Display the score
  scoreElement.textContent = `Your Score: ${score} / ${quizQuestions.length}`;

  // Display the correct answers
  correctAnswersElement.innerHTML = quizQuestions
    .map((q, i) => `<li>${q.question} - Correct Answer: ${q.answer}</li>`)
    .join('');

  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = Array(quizQuestions.length).fill(null);
  resultContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  loadQuestion();
}

// Initialize quiz
restartButton.onclick = restartQuiz;
loadQuestion();
