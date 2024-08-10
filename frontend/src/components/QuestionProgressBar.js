import React from "react";
import { ProgressBar } from "react-bootstrap";

const QuestionProgressBar = ({ totalQuestions, completedQuestions }) => {
  const progress = (completedQuestions / totalQuestions) * 100;

  return (
    <ProgressBar
      now={progress}
      label={`${Math.round(progress)}%`}
      className="styled-progress-bar mb-4 mt-4"
      data-live-search="true"
    />
  );
};

export default QuestionProgressBar;
