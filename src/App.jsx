import React, { useState } from "react";
import "./App.css";

// Sample quiz data
const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Galileo", "Curie"],
    answer: "Einstein",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    answer: "Blue Whale",
  },
];

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleAnswerSelection = (selectedOption) => {
    setUserAnswers([
      ...userAnswers,
      { question: quizQuestions[currentQuestionIndex].question, answer: selectedOption },
    ]);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const calculateScore = () => {
    return userAnswers.filter(
      (answer, index) => answer.answer === quizQuestions[index].answer
    ).length;
  };

  return (
    <div className="quiz-app">
      {!isQuizFinished ? (
        <div>
          <h2>{quizQuestions[currentQuestionIndex].question}</h2>
          <div className="options">
            {quizQuestions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelection(option)}
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="result">
          <h2>Quiz Finished!</h2>
          <p>
            Your Score: {calculateScore()} / {quizQuestions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
