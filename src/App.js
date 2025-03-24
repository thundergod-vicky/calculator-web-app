import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // Load the last displayed number from localStorage on initial render
  useEffect(() => {
    const lastDisplay = localStorage.getItem('lastDisplay');
    if (lastDisplay) {
      setDisplay(lastDisplay);
    }
  }, []);

  // Save the displayed number to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('lastDisplay', display);
  }, [display]);

  const handleDigitClick = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimalClick = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const firstValue = firstOperand;
    const secondValue = parseFloat(display);

    if (operator === '+') {
      return firstValue + secondValue;
    } else if (operator === '-') {
      return firstValue - secondValue;
    } else if (operator === 'x') {
      return firstValue * secondValue;
    } else if (operator === '/') {
      return firstValue / secondValue;
    }
    return secondValue;
  };

  const handleEqualsClick = () => {
    if (operator && !waitingForSecondOperand) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleSquareClick = () => {
    const value = parseFloat(display);
    setDisplay(String(value * value));
  };

  return (
    <div className="calculator">
      <div className="display" style={{ backgroundColor: '#4f4f4f', color: '#ffffff' }}>
        {display}
      </div>
      <div className="keypad">
        <button onClick={handleClearClick} style={{ backgroundColor: '#5b5b5a', color: '#ffffff' }}>AC</button>
        <button onClick={handleSquareClick} style={{ backgroundColor: '#5b5b5a', color: '#ffffff' }}>x²</button>
        <button onClick={handleEqualsClick} style={{ backgroundColor: '#fe9f09', color: '#ffffff' }}>=</button>
        <button onClick={() => handleOperatorClick('/')} style={{ backgroundColor: '#fe9f09', color: '#ffffff' }}>/</button>
        <button onClick={() => handleDigitClick('1')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>1</button>
        <button onClick={() => handleDigitClick('2')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>2</button>
        <button onClick={() => handleDigitClick('3')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>3</button>
        <button onClick={() => handleOperatorClick('x')} style={{ backgroundColor: '#fe9f09', color: '#ffffff' }}>x</button>
        <button onClick={() => handleDigitClick('4')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>4</button>
        <button onClick={() => handleDigitClick('5')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>5</button>
        <button onClick={() => handleDigitClick('6')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>6</button>

        <button onClick={() => handleOperatorClick('-')} style={{ backgroundColor: '#fe9f09', color: '#ffffff' }}>-</button>
        <button onClick={() => handleDigitClick('7')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>7</button>
        <button onClick={() => handleDigitClick('9')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>9</button>
        <button onClick={() => handleDigitClick('8')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>8</button>
        {/* <button onClick={() => handleDigitClick('0')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>0</button> */}
        <button onClick={() => handleOperatorClick('+')} style={{ backgroundColor: '#fe9f09', color: '#ffffff' }}>+</button>
        <button onClick={handleDecimalClick} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>.</button>


        <button onClick={() => handleDigitClick('0')} style={{ backgroundColor: '#737a7b', color: '#ffffff' }}>0</button>
      </div>
    </div>
  );
}

export default App;