import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useCallback } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabeld] = useState(false);
  const handleOnOffButton = useCallback(() => {
    setDisabeld(prev => prev = !prev);
  }, [])
  const handleDecrement = useCallback(() => {
    setCounter(prev => prev - 1)
  }, [])
  const handleIncrement = useCallback(() => {
    setCounter(prev => prev + 1)
  }, [])
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <h3 data-testid="counter">{counter}</h3>
      <button data-testid="minus-button" disabled={disabled} onClick={handleDecrement}>-</button>
      <button data-testid="plus-button" disabled={disabled} onClick={handleIncrement}>+</button>
      <button data-testid="on/off-button" style={{ backgroundColor: 'blue' }} onClick={handleOnOffButton}>on/off</button>
    </div>
  );
}

export default App;
