// app.js
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const displayInput = document.getElementById('displayInput');
  
  // Initialize calculator components
  const display = new Display(displayInput);
  const calculator = new Calculator(displayInput);
  
  // Set up event listeners for calculator buttons
  setupNumberButtons(calculator);
  setupOperationButtons(calculator);
  setupMemoryButtons(calculator, display);
  setupFunctionButtons(calculator, display);
  setupConversionButtons(calculator, display);
  
  // Set up keyboard support
  setupKeyboardSupport(calculator);
  
  // Adjust UI for mobile devices
  adjustUIForMobile();

  // Handle calculator errors
  handleCalculatorErrors();
});

function setupNumberButtons(calculator) {
  // Number buttons 0-9
  for (let i = 0; i <= 9; i++) {
    document.getElementById(`btn${i}`).addEventListener('click', () => {
      calculator.inputDigit(i);
    });
  }
  
  // Decimal point
  document.getElementById('btnDecimal').addEventListener('click', () => {
    calculator.inputDecimal();
  });
}

function setupOperationButtons(calculator) {
  // Basic operations
  document.getElementById('btnAdd').addEventListener('click', () => {
    calculator.handleOperation('add');
  });
  
  document.getElementById('btnSubtract').addEventListener('click', () => {
    calculator.handleOperation('subtract');
  });
  
  document.getElementById('btnMultiply').addEventListener('click', () => {
    calculator.handleOperation('multiply');
  });
  
  document.getElementById('btnDivide').addEventListener('click', () => {
    calculator.handleOperation('divide');
  });
  
  document.getElementById('btnEquals').addEventListener('click', () => {
    calculator.handleEquals();
  });
  
  document.getElementById('btnClear').addEventListener('click', () => {
    calculator.clear();
  });
  
  document.getElementById('btnSign').addEventListener('click', () => {
    calculator.invertSign();
  });
  
  document.getElementById('btnPercent').addEventListener('click', () => {
    calculator.percentage();
  });
}

function setupMemoryButtons(calculator, display) {
  document.getElementById('btnMemoryStore').addEventListener('click', () => {
    const value = parseFloat(calculator.currentValue);
    calculator.memoryManager.store(value);
    display.showMemoryStatus(
      calculator.memoryManager.getActiveMemory(), 
      value
    );
  });
  
  document.getElementById('btnMemoryRecall').addEventListener('click', () => {
    const memoryValue = calculator.memoryManager.recall();
    calculator.currentValue = String(memoryValue);
    calculator.updateDisplay();
    display.showMemoryStatus(
      calculator.memoryManager.getActiveMemory(), 
      memoryValue
    );
  });
  
  document.getElementById('btnMemoryClear').addEventListener('click', () => {
    calculator.memoryManager.clear();
    display.showMemoryStatus(
      calculator.memoryManager.getActiveMemory(), 
      0
    );
  });
  
  // You'll need to add this button to your HTML
  if (document.getElementById('btnMemorySwitch')) {
    document.getElementById('btnMemorySwitch').addEventListener('click', () => {
      const newMemory = calculator.memoryManager.switchMemory();
      display.showMemoryStatus(
        newMemory,
        calculator.memoryManager.getMemoryValue(newMemory)
      );
    });
  }
}

function setupFunctionButtons(calculator, display) {
  // Square root
  document.getElementById('btnSquareRoot').addEventListener('click', () => {
    try {
      const value = parseFloat(calculator.currentValue);
      const result = squareRoot(value);
      calculator.currentValue = String(result);
      calculator.updateDisplay();
    } catch (error) {
      display.showError(error.message);
    }
  });
  
  // Exponent
  document.getElementById('btnExponent').addEventListener('click', () => {
    calculator.handleOperation('exponent');
  });
  
  // Pi
  document.getElementById('btnPi').addEventListener('click', () => {
    calculator.currentValue = String(getPi());
    calculator.updateDisplay();
  });
  
  // Trigonometric functions
  document.getElementById('btnSin').addEventListener('click', () => {
    try {
      const value = parseFloat(calculator.currentValue);
      const result = sine(value);
      calculator.currentValue = String(result);
      calculator.updateDisplay();
    } catch (error) {
      display.showError(error.message);
    }
  });
  
  document.getElementById('btnCos').addEventListener('click', () => {
    try {
      const value = parseFloat(calculator.currentValue);
      const result = cosine(value);
      calculator.currentValue = String(result);
      calculator.updateDisplay();
    } catch (error) {
      display.showError(error.message);
    }
  });
  
  document.getElementById('btnTan').addEventListener('click', () => {
    try {
      const value = parseFloat(calculator.currentValue);
      const result = tangent(value);
      calculator.currentValue = String(result);
      calculator.updateDisplay();
    } catch (error) {
      display.showError(error.message);
    }
  });
  
  document.getElementById('btnHyp').addEventListener('click', () => {
    // This would need to be implemented to toggle hyperbolic functions
    // For simplicity, we'll just set up direct hyperbolic function calls
  });
  
  // Logarithmic functions
  document.getElementById('btnLog').addEventListener('click', () => {
    try {
      const value = parseFloat(calculator.currentValue);
      const result = log10(value);
      calculator.currentValue = String(result);
      calculator.updateDisplay();
    } catch (error) {
      display.showError(error.message);
    }
  });
  
  document.getElementById('btnLn').addEventListener('click', () => {
    try {
      const value = parseFloat(calculator.currentValue);
      const result = ln(value);
      calculator.currentValue = String(result);
      calculator.updateDisplay();
    } catch (error) {
      display.showError(error.message);
    }
  });
}

function setupConversionButtons(calculator, display) {
  // Number system conversion
  document.getElementById('btnBinary').addEventListener('click', () => {
    try {
      calculator.numberSystem = 'binary';
      const value = parseFloat(calculator.currentValue);
      const binaryValue = formatForNumberSystem(value, 'binary');
      calculator.currentValue = binaryValue;
      calculator.updateDisplay();
    } catch (error) {
      display.showError(error.message);
    }
  });
  
  document.getElementById('btnDecimalMode').addEventListener('click', () => {
    calculator.numberSystem = 'decimal';
    // If not in decimal, convert back
    if (calculator.numberSystem !== 'decimal') {
      try {
        const value = parseFloat(calculator.currentValue);
        calculator.currentValue = String(value);
        calculator.updateDisplay();
      } catch (error) {
        display.showError(error.message);
      }
    }
  });
  
  document.getElementById('btnHexadecimal').addEventListener('click', () => {
    try {
      calculator.numberSystem = 'hexadecimal';
      const value = parseFloat(calculator.currentValue);
      const hexValue = formatForNumberSystem(value, 'hexadecimal');
      calculator.currentValue = hexValue;
      calculator.updateDisplay();
    } catch (error) {
      display.showError(error.message);
    }
  });
}

// Add this to app.js
function handleCalculatorErrors() {
  window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
    alert('Something went wrong. Please refresh the page and try again.');
    return false;
  });
}