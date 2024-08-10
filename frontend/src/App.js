import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./components/Question";
import QuestionProgressBar from "./components/QuestionProgressBar";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/questions")
      .then((response) => setQuestions(JSON.parse(response.data).questions))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = () => {
    const completedCount = questions.filter((question, qIndex) => {
      return question.fields.every((field, fIndex) => {
        const fieldElement = document.querySelector(
          `#field-${question.id}-${fIndex}`
        );
        return fieldElement && fieldElement.value.trim() !== "";
      });
    }).length;

    setCompletedQuestions(completedCount);
  };

  return (
    <div className="container">
      <h1 className="App-Header">UI Tech Test</h1>

      <QuestionProgressBar
        totalQuestions={questions.length}
        completedQuestions={completedQuestions}
      />
      {questions.map((question, index) => (
        <Question
          key={question.id}
          question={question}
          onChange={handleInputChange}
        />
      ))}
    </div>
  );
}

export default App;
