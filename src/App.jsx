import QuestionCard from "./components/QuestionCard";
import Confetti from "react-confetti";
import { questions } from "./data/question";
import { useState } from "react";

function App() {
  // Track the current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Track the answer user selected
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Keep the score count
  const [score, setScore] = useState(0);
  // Whether quiz has finished or not
  const [isFinished, setIsFinished] = useState(false);
  // To show correct/incorrect feedback before moving to next question
  const [showFeedback, setShowFeedback] = useState(false);

  // Handle user selecting an answer
  const handleAnswer = (option) => {
    // Prevent re-answering the same question
    if (showFeedback) return;

    setSelectedAnswer(option);
    setShowFeedback(true);

    // Increase score if the answer is correct
    if (option === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  // Go to next question or finish quiz if last question is reached
  const goToNext = () => {
    if (currentQuestion + 1 < questions.length) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Mark quiz as finished
      setIsFinished(true);
    }
  };

  // Calculate progress bar width
  const calculateProgress = () => {
    if (isFinished) return 100; // Full progress if quiz is finished

    // Progress based on current question index
    const baseProgress = (currentQuestion / questions.length) * 100;
    // Add extra progress if the current question has been answered
    const questionProgress = selectedAnswer ? (1 / questions.length) * 100 : 0;

    return baseProgress + questionProgress;
  };

  // Restart the quiz from scratch
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  // Final percentage score
  const percentage = (score / questions.length) * 100;
  // Show confetti if quiz is finished and score > 50%
  const showConfetti = isFinished && percentage > 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-slate-900 to-blue-900 text-white flex flex-col items-center justify-center p-4">
      {/* Show confetti only if conditions are met */}
      {showConfetti && <Confetti />}

      {/* Quiz header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg mb-2">
          React Quiz
        </h1>
        <p className="text-gray-300">Test your Knowledge</p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xl mb-6">
        <div className="bg-slate-700 h-3 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      {/* Quiz in-progress */}
      {!isFinished ? (
        <>
          {/* Question card with options */}
          <QuestionCard
            showFeedback={showFeedback}
            onAnswer={handleAnswer}
            data={questions[currentQuestion]}
            current={currentQuestion}
            total={questions.length}
            selected={selectedAnswer}
          />

          {/* Continue / See Results button */}
          <div className="mt-6 min-h-[60px]">
            {showFeedback && (
              <button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 py-3 px-6 rounded-xl font-medium shadow-lg cursor-pointer transition-all"
                onClick={goToNext}
              >
                {currentQuestion + 1 < questions.length
                  ? "Continue"
                  : "See Results"}
              </button>
            )}
          </div>
        </>
      ) : (
        // Quiz completed screen
        <div className="text-center font-bold">
          <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Quiz Completed! 
          </h2>

          {/* Show score and percentage */}
          <p className="text-xl mb-6 text-gray-200">
            You Scored{" "}
            <span className="text-cyan-400">{score}</span> out of{" "}
            <span className="text-blue-400">{questions.length}</span> —{" "}
            <span className="text-teal-400">
              {Math.round((score / questions.length) * 100)}%
            </span>
          </p>

          {/* Restart quiz button */}
          <button
            onClick={restartQuiz}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 py-3 px-6 rounded-xl font-medium shadow-lg cursor-pointer transition-all"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
