import React from 'react';

function Question({ question, onAnswerChange, selectedOption }) {
  return (
    <div className="mb-3">
      <h5>{question.text}</h5>
      {question.options.map((option, index) => (
        <div key={index} className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name={`question-${question.id}`}
            id={`question-${question.id}-option-${index}`}
            value={index}
            checked={selectedOption === index}
            onChange={() => onAnswerChange(question.id, index)}
          />
          <label className="form-check-label" htmlFor={`question-${question.id}-option-${index}`}>
            {option.text}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Question;
