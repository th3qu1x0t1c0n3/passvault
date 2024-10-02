import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React a
        </a>
      </header>
    </div>
  );
}

export default App;

export const PwdmanagerServerInstance = axios.create({
  baseURL: 'https://passvault.quixotic.date/api/v1',
  // baseURL: 'http://localhost:8087/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  params: {}
});
