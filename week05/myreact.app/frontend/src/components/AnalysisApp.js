import React, { useState, useEffect } from 'react';
import Question from './Question';
import CareerMatch from './CareerMatch';

function AnalysisApp() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex }
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

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
      <h2>Career Analysis</h2>
      {submitted ? (
        <CareerMatch result={result} onRestart={handleRestart} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default AnalysisApp;
