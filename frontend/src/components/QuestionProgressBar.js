import React from "react";
import { ProgressBar } from "react-bootstrap";
import PropTypes from "prop-types";

const QuestionProgressBar = ({
  totalQuestions = 0,
  completedQuestions = 0,
}) => {
  const progress =
    totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
  const roundedProgress = Math.round(progress);

  return (
    <div className="progress-container">
      <span className="progress-label">Completion:</span>
      <ProgressBar
        now={progress}
        label={`${roundedProgress}%`}
        className="styled-progress-bar"
        data-live-search="true"
      />
    </div>
  );
};

QuestionProgressBar.propTypes = {
  totalQuestions: PropTypes.number,
  completedQuestions: PropTypes.number,
};

export default QuestionProgressBar;
