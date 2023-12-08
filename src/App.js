import logo from './logo.svg';
import './App.css';
import React,  { useState } from 'react';

function App() {
  const [score, setScore] = useState(75);
  const [maxScore, setMaxScore] = useState(100); 
  const percentage = (score/maxScore) * 100;

  const increaseScore = () => {
    // You can add validation logic or constraints if needed
    setScore(score + 5);
  };

  const decreaseScore = () => {
    // You can add validation logic or constraints if needed
    setScore(score - 5);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Score Percentage Calculator</h2>
          <p>Score: {score}</p>
          <p>Maximum Possible Score: {maxScore}</p>
          <p>Percentage: {percentage}%</p>
        </div>
        <button onClick={increaseScore}>Increase Score</button>
        <button onClick={decreaseScore}>Increase Score</button>
      </header>
    </div>
  );
}

export default App;
