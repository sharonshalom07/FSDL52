import React from 'react';

function Question({ question, onAnswerChange }) {
  const handleChange = (e) => {
    onAnswerChange(question.id, parseInt(e.target.value, 10));
  };

  return (
    <div className="question">
      <h3>{question.text}</h3>
      {question.options.map((option, index) => (
        <div key={index} className="option">
          <label>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              onChange={handleChange}
            />
            {option.text}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Question;
