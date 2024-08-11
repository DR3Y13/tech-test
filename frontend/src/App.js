import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./components/Question";
import QuestionProgressBar from "./components/QuestionProgressBar";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/questions")
      .then((response) => setQuestions(response.data.questions))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const completedQuestions = Object.keys(answers).filter(
    (key) => answers[key] !== ""
  ).length;

  return (
    <div>
      <nav className="customised-navbar">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/images/ctm.png"
              alt="Avatar Logo"
              style={{ width: 40 }}
              className="rounded-pill"
            />
            <span className="brand-name">UI Tech Test</span>
          </a>
        </div>
      </nav>
      <div className="container">
        <QuestionProgressBar
          totalQuestions={questions.length}
          completedQuestions={completedQuestions}
        />

        {questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
