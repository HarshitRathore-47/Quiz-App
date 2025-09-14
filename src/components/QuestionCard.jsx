import React from "react";
const QuestionCard = ({ data, onAnswer, showFeedback, selected, current, total }) => {
  // Destructure the data object
  const { question, options, correctAnswer } = data;

  // Function to determine button style based on state (feedback/correct/wrong/default)
  const getButtonStyle = (option) => {
    if (!showFeedback) {
      // Default style before answer is selected
      return "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-[1.02]";
    }
    if (option === correctAnswer) return "bg-gradient-to-r from-teal-500 to-green-500"; // Correct answer (highlighted green)
    if (option === selected) return "bg-gradient-to-r from-red-500 to-pink-600"; // Wrong answer (highlighted red)
    return "bg-slate-700"; // Other options (gray)
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-6 rounded-2xl shadow-2xl w-full max-w-xl border border-slate-700">
      {/* Question Header (Question number + progress %) */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-cyan-300">
          Question {current + 1} of {total}
        </h2>

        {/* Progress percentage based on current question and answer state */}
        <span className="text-sm bg-slate-800 px-3 py-1 rounded-full text-blue-300 shadow-md">
          {selected
            ? Math.round(((current + 1) / total) * 100) + "% Complete" // If answered
            : Math.round((current / total) * 100) + "% Complete"} {/* If not answered */}
        </span>
      </div>

      {/* Question Text */}
      <p className="text-2xl font-bold mb-6 text-white drop-shadow">{question}</p>

      {/* Options Grid */}
      <div className="grid gap-3">
        {options.map((option, index) => (
          <button
            className={`${getButtonStyle(option)} text-left px-4 py-3 cursor-pointer rounded-xl text-white font-medium shadow-md transition-all`}
            key={index}
            onClick={() => onAnswer(option)} // Pass selected option back to parent
            disabled={showFeedback} // Disable buttons after answer selected
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
