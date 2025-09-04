import QuestionCard from "./components/QuestionCard";
import Confetti from "react-confetti";
import { questions } from "./data/question";
import { useState } from "react";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (option) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
    setShowFeedback(true);

    if (option === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const calculateProgress = () => {
    if (isFinished) return 100;
    const baseProgress = (currentQuestion / questions.length) * 100;
    const questionProgress = selectedAnswer ? (1 / questions.length) * 100 : 0;
    return baseProgress + questionProgress;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  const percentage = (score / questions.length) * 100;
  const showConfetti = isFinished && percentage > 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-slate-900 to-blue-900 text-white flex flex-col items-center justify-center p-4">
      {showConfetti && <Confetti />}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg mb-2">
          React Quiz
        </h1>
        <p className="text-gray-300">Test your Knowledge</p>
      </div>

      <div className="w-full max-w-xl mb-6">
        <div className="bg-slate-700 h-3 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      {!isFinished ? (
        <>
          <QuestionCard
            showFeedback={showFeedback}
            onAnswer={handleAnswer}
            data={questions[currentQuestion]}
            current={currentQuestion}
            total={questions.length}
            selected={selectedAnswer}
          />

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
        <div className="text-center font-bold">
          <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-6 text-gray-200">
            You Scored{" "}
            <span className="text-cyan-400">{score}</span> out of{" "}
            <span className="text-blue-400">{questions.length}</span> —{" "}
            <span className="text-teal-400">
              {Math.round((score / questions.length) * 100)}%
            </span>
          </p>
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
