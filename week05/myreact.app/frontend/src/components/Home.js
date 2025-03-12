import React from 'react';
import './Home.css'; // We'll create this file specifically for hero styling

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to the Career Analysis App</h1>
          <p className="hero-subtitle">
            Discover a career path that best fits your interests and strengths.
          </p>
          <a className="hero-button" href="/analysis">
            Get Started
          </a>
        </div>
        <div className="hero-wave" />
      </section>

      <section className="info-section container">
        <h2>Why Use Our Analysis?</h2>
        <p>
          Our scientifically designed questionnaire helps you identify your true calling.
          Dive deep into your interests and skills to uncover the perfect career match!
        </p>
      </section>
    </div>
  );
}

export default Home;
