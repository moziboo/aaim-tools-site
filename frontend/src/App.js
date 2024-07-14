import logo from './logo.svg';
import './App.css';
import * as React from 'react'
import axios from 'axios';

function App() {
  const [message, setMessage] = React.useState('')

  React.useEffect(() => {
    axios.get('http://localhost:8080/test', {
      headers: {
        'Api-Key': 'testeotesteo'
      }
    })
    .then(response => {
      setMessage(response.data.message);
    })
    .catch(error => {
      console.error('There was an error fetching the data:', error);
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>sourse/App.js</code> and save to reload.
        </p>
        <p>{message}</p>
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
