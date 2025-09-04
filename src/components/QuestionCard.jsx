import React from "react";

const QuestionCard = ({ data, onAnswer, showFeedback, selected, current, total }) => {
  const { question, options, correctAnswer } = data;

  const getButtonStyle = (option) => {
    if (!showFeedback) {
      return "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-[1.02]";
    }
    if (option === correctAnswer) return "bg-gradient-to-r from-teal-500 to-green-500";
    if (option === selected) return "bg-gradient-to-r from-red-500 to-pink-600";
    return "bg-slate-700";
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-6 rounded-2xl shadow-2xl w-full max-w-xl border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-cyan-300">
          Question {current + 1} of {total}
        </h2>
        <span className="text-sm bg-slate-800 px-3 py-1 rounded-full text-blue-300 shadow-md">
          {selected
            ? Math.round(((current + 1) / total) * 100) + "% Complete"
            : Math.round((current / total) * 100) + "% Complete"}
        </span>
      </div>

      <p className="text-2xl font-bold mb-6 text-white drop-shadow">{question}</p>
      <div className="grid gap-3">
        {options.map((option, index) => (
          <button
            className={`${getButtonStyle(option)} text-left px-4 py-3 cursor-pointer rounded-xl text-white font-medium shadow-md transition-all`}
            key={index}
            onClick={() => onAnswer(option)}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
