import React from 'react';
import './App.css';
import ParenthesisChecker from './Pages/ParenthesisChecker';
import  CardStackToy  from "./Pages/CardStackToy";
function App() {
  return (
    <div className="App">
      <ParenthesisChecker/>
      <CardStackToy/>
    </div>
  );
}

export default App;
