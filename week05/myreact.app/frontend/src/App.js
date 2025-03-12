import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Question from './components/Question';
import CareerMatch from './components/CareerMatch';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex }
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched questions:", data); // Debug log
        setQuestions(data);
      })
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  console.log("App is rendering", { questions, answers, submitted });

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    const answerArray = Object.keys(answers).map(key => ({
      questionId: parseInt(key, 10),
      selectedOption: answers[key]
    }));

    fetch('http://localhost:5000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: answerArray })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Analysis result:", data); // Debug log
        setResult(data);
        setSubmitted(true);
      })
      .catch(err => console.error('Error analyzing answers:', err));
  };

  const handleRestart = () => {
    setAnswers({});
    setResult(null);
    setSubmitted(false);
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="container my-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <a className="navbar-brand" href="/">Career Analysis App</a>
      </nav>
      <div className="card shadow-sm">
        <div className="card-body">
          {submitted ? (
            <CareerMatch result={result} onRestart={handleRestart} />
          ) : (
            <div>
              {totalQuestions > 0 && (
                <div className="mb-4">
                  <label className="form-label">
                    Progress: {answeredCount} of {totalQuestions} answered
                  </label>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progressPercentage}%` }}
                      aria-valuenow={progressPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {progressPercentage}%
                    </div>
                  </div>
                </div>
              )}
              {questions.map(question => (
                <Question
                  key={question.id}
                  question={question}
                  onAnswerChange={handleAnswerChange}
                  selectedOption={answers[question.id]}
                />
              ))}
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit Answers
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
