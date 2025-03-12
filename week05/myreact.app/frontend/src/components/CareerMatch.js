import React from 'react';

function CareerMatch({ result, onRestart }) {
  if (!result || !result.matchedCareer) {
    return <p>No career match found. Please try again.</p>;
  }

  return (
    <div className="career-match">
      <h2>Your Career Match</h2>
      <p><strong>{result.matchedCareer.name}</strong></p>
      <p>{result.matchedCareer.description}</p>
      <button className="btn btn-secondary" onClick={onRestart}>Restart</button>
    </div>
  );
}

export default CareerMatch;
