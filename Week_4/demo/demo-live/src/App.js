import logo from './logo.svg';
import './App.css';
import DebugButton from './components/DebugButton';
import Button from 'react-bootstrap/Button';

function App() {
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
        <DebugButton text="Click Here for Debug Output"></DebugButton>
      </header>
    </div>
  );
}

export default App;
