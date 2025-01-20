const quizQuestions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Galileo", "Curie"], answer: "Einstein" },
  { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: "Blue Whale" },
  { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
  { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], answer: "Da Vinci" },
  { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: "Au" },
  { question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: "Diamond" },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Hemingway", "Dickens", "Orwell"], answer: "Shakespeare" },
  { question: "What is the tallest mountain in the world?", options: ["K2", "Everest", "Kangchenjunga", "Lhotse"], answer: "Everest" },
  { question: "Which gas do plants primarily use for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
];

let currentQuestionIndex = 0;
let userAnswers = [];

const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
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
    optionsElement.appendChild(button);
  });
}

function handleAnswerSelection(selectedOption) {
  const isCorrect = selectedOption === quizQuestions[currentQuestionIndex].answer;
  feedbackElement.textContent = isCorrect ? 'Correct!' : 'Wrong!';
  userAnswers.push({ question: quizQuestions[currentQuestionIndex].question, answer: selectedOption });

  setTimeout(() => {
    feedbackElement.textContent = '';
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      finishQuiz();
    }
  }, 1000);
}

function finishQuiz() {
  const score = userAnswers.filter((answer, index) => answer.answer === quizQuestions[index].answer).length;
  scoreElement.textContent = `Your Score: ${score} / ${quizQuestions.length}`;
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  resultContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  loadQuestion();
}

restartButton.onclick = restartQuiz;

// Initialize quiz
loadQuestion();
