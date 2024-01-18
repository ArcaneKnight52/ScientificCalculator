import React, { useState } from 'react';
import '../styles/Calculator.css';
import * as math from 'mathjs';

import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const pi = Math.PI;
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('rad');
  const [isRadians, setIsRadians] = useState(true);

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleEvaluate = () => {
    try {
      let result;
  
      if (isRadians) {
        result = math.evaluate(input);
      } else {
        result = math.evaluate(
          input.replace(/(sin|cos|tan|asin|atan|acos)\(([^)]+)\)/g, (match, func, arg) => {
            return `${func}(${arg})`;
          })
        );
      }
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  const handleComplex = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleAdvancedFunction = (func) => {
    const trigFunctions = ['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh', 'arcsin', 'arccos', 'arctan'];
    const inverseTrigFunctions = ['arcsin', 'arccos', 'arctan'];
    
    if (trigFunctions.includes(func)) {
      const conversionFactor = isRadians ? '' : '(pi/180)*';
      setInput((prevInput) => prevInput + func + '(' + conversionFactor);
    } else if (inverseTrigFunctions.includes(func)) {
      setInput((prevInput) => prevInput + `a${func.slice(1)}(`);
    } else if (func === 'sqrt') {
      setInput((prevInput) => prevInput + 'sqrt(');
    } else if (func === 'pow') {
      setInput((prevInput) => prevInput + 'pow(');
    } else {
      setInput((prevInput) => prevInput + func + '(');
    }
  };
  
  const handleMemoryStore = () => {
    localStorage.setItem('calculatorMemory', input);
  };

  const handleMemoryRecall = () => {
    const memoryValue = localStorage.getItem('calculatorMemory');
    if (memoryValue) {
      setInput((prevInput) => prevInput + memoryValue);
    }
  };

  const handleMemoryClear = () => {
    localStorage.removeItem('calculatorMemory');
  };

  const handleScientificNotation = () => {
    try {
      const result = math.evaluate(input);
      setInput(result.toExponential());
    } catch (error) {
      setInput('Error');
    }
  };

  const handleBackspace = () => {
    const newInput = input.slice(0, -1);
    setInput(newInput);
  };

  const handleToggleMode = () => {
    setIsRadians((prev) => !prev);
    setMode((prevMode) => (prevMode === 'rad' ? 'deg' : 'rad'));
  };

  const calculateFactorial = () => {
    try {
      const result = math.factorial(Number(input));
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };
  return (
    <div className="calculator-container">
      <Display value={input} />
      <div className="calculator-mode-indicator">{`Mode: ${mode}`}</div>
      <div className="calculator-buttons-container">
        <Button label="7" onClick={() => handleButtonClick('7')} />
        <Button label="8" onClick={() => handleButtonClick('8')} />
        <Button label="9" onClick={() => handleButtonClick('9')} />
        <Button label="/" onClick={() => handleButtonClick('/')} />

        <Button label="4" onClick={() => handleButtonClick('4')} />
        <Button label="5" onClick={() => handleButtonClick('5')} />
        <Button label="6" onClick={() => handleButtonClick('6')} />
        <Button label="*" onClick={() => handleButtonClick('*')} />

        <Button label="1" onClick={() => handleButtonClick('1')} />
        <Button label="2" onClick={() => handleButtonClick('2')} />
        <Button label="3" onClick={() => handleButtonClick('3')} />
        <Button label="-" onClick={() => handleButtonClick('-')} />
        <Button label="0" onClick={() => handleButtonClick('0')} />
        <Button label="." onClick={() => handleButtonClick('.')} />
        <Button label="+" onClick={() => handleButtonClick('+')} />
        <Button label="C" onClick={handleClear} />
        <Button label="sin" onClick={() => handleAdvancedFunction('sin')} />
        <Button label="cos" onClick={() => handleAdvancedFunction('cos')} />
        <Button label="tan" onClick={() => handleAdvancedFunction('tan')} />
        <Button label="log" onClick={() => handleAdvancedFunction('log')} />
        <Button label="(" onClick={() => handleButtonClick('(')} />
        <Button label=")" onClick={() => handleButtonClick(')')} />
        <Button label="MS" onClick={handleMemoryStore} />
        <Button label="MR" onClick={handleMemoryRecall} />
        <Button label="MC" onClick={handleMemoryClear} />
        <Button label="EXP" onClick={handleScientificNotation} />
        <Button label="!" onClick={calculateFactorial} />
        <Button label="pi" onClick={() => handleButtonClick(pi)} />
        <Button label="DEL" onClick={handleBackspace} className='del'/>
        <Button label="Rad/Deg" onClick={handleToggleMode} />
        <Button label="i" onClick={() => handleComplex('i')} />
        <Button label="=" onClick={handleEvaluate} className="equals" />
        <Button label="sqrt" onClick={() => handleAdvancedFunction('sqrt')} />
        <Button label="pow" onClick={() => handleAdvancedFunction('pow')} />
        <Button label="sinh" onClick={() => handleAdvancedFunction('sinh')} />
        <Button label="cosh" onClick={() => handleAdvancedFunction('cosh')} />
        <Button label="tanh" onClick={() => handleAdvancedFunction('tanh')} />
        <Button label="arcsin" onClick={() => handleAdvancedFunction('arcsin')} />
        <Button label="arccos" onClick={() => handleAdvancedFunction('arccos')} />
        <Button label="arctan" onClick={() => handleAdvancedFunction('arctan')} />
        <Button label="comma" onClick={() => handleButtonClick(',')}/>
      </div>
    </div>
  );
};


export default Calculator;