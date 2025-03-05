import React from 'react';

function CareerMatch({ result, onRestart }) {
  const { matchedCareer, scores } = result;

  return (
    <div className="result">
      <h2>Your Best Career Match:</h2>
      {matchedCareer ? (
        <div>
          <h3>{matchedCareer.name}</h3>
          <p>{matchedCareer.description}</p>
        </div>
      ) : (
        <p>No match found.</p>
      )}
      <h4>Score Breakdown:</h4>
      <ul>
        {scores &&
          Object.entries(scores).map(([career, score]) => (
            <li key={career}>
              {career}: {score}
            </li>
          ))}
      </ul>
      <button onClick={onRestart} className="restart-button">
        Restart
      </button>
    </div>
  );
}

export default CareerMatch;
