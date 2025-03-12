import React from 'react';
import AnalysisContent from './AnalysisContent';
import './AnalysisApp.css';

function AnalysisApp() {
  return (
    <div className="analysis-app">
      <section className="analysis-hero">
        <div className="analysis-hero-content">
          <h1 className="analysis-hero-title">Career Analysis</h1>
          <p className="analysis-hero-subtitle">
            Uncover your strengths and find the path that truly suits you.
          </p>
        </div>
        <div className="analysis-wave" />
      </section>

      <div className="analysis-container container">
        <AnalysisContent />
      </div>
    </div>
  );
}

export default AnalysisApp;
