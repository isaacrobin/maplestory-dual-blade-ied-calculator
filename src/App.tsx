import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserInputs from './components/UserInputs';

function App() {
  return (
    <div className="App">
      <header>
        DB IED calc
      </header>
      <body>
        <UserInputs />
      </body>
    </div>
  );
}

export default App;
