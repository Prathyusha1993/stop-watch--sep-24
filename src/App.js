import './App.css';
import AnotherStopWatch from './components/AnotherStopWatch';
import StopWatch from './components/StopWatch';

function App() {
  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <StopWatch />
      <AnotherStopWatch />
    </div>
  );
}

export default App;
