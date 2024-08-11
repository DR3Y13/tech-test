import React from "react";
import { ProgressBar } from "react-bootstrap";
// import "./QuestionProgressBar.css"; // Import a CSS file for custom styling

const QuestionProgressBar = ({ totalQuestions, completedQuestions }) => {
  const progress =
    totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;

  return (
    <div className="progress-container">
      <span className="progress-label">Completion:</span>
      <ProgressBar
        now={progress}
        label={`${Math.round(progress)}%`}
        className="styled-progress-bar"
        data-live-search="true"
      />
    </div>
  );
};

export default QuestionProgressBar;
