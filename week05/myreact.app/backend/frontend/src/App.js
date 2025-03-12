import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import CareerMatch from './components/CareerMatch';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex }
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Fetch questions from the backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched questions:", data); // Debug log
        setQuestions(data);
      })
      .catch(err => console.error('Error fetching questions:', err));
  }, []);
  
  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  
  
  const handleSubmit = () => {
    // Prepare answers as an array for the backend
    const answerArray = Object.keys(answers).map((key) => ({
      questionId: parseInt(key, 10),
      selectedOption: answers[key]
    }));

    fetch('http://localhost:5000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: answerArray })
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setSubmitted(true);
      })
      .catch((err) => console.error('Error analyzing answers:', err));
  };

  const handleRestart = () => {
    setAnswers({});
    setResult(null);
    setSubmitted(false);
  };

  return (
    <div className="app-container">
      <h1>Career Analysis App</h1>
      {!submitted ? (
        <div>
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              onAnswerChange={handleAnswerChange}
            />
          ))}
          <button onClick={handleSubmit} className="submit-button">
            Submit Answers
          </button>
        </div>
      ) : (
        <CareerMatch result={result} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
