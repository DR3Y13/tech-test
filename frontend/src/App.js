import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./components/Question";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/questions")
      .then((response) => setQuestions(JSON.parse(response.data).questions))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">UI Tech Test</h1>
      {questions.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
}

export default App;
