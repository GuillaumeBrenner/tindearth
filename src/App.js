import logo from './logo.svg';
import './App.css';

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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
