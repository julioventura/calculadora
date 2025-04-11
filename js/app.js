// app.js
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const displayInput = document.getElementById('displayInput');
  
  // Initialize calculator components
  const display = new Display(displayInput);
  const calculator = new Calculator(displayInput, display); // Passar o display para o calculator
  
  // Set up event listeners for calculator buttons
  setupNumberButtons(calculator);
  setupOperationButtons(calculator);
  setupMemoryButtons(calculator, display);
  setupFunctionButtons(calculator, display);
  setupConversionButtons(calculator, display);
  setupSpecialFeatures(calculator, display);
  
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

  // Parentheses
  document.getElementById('btnParenLeft').addEventListener('click', () => {
    if (calculator.display && typeof calculator.display.addParenthesisToExpression === 'function') {
        calculator.display.addParenthesisToExpression('(');
    }
  });

  document.getElementById('btnParenRight').addEventListener('click', () => {
    if (calculator.display && typeof calculator.display.addParenthesisToExpression === 'function') {
        calculator.display.addParenthesisToExpression(')');
    }
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
  if (document.getElementById('btnSquareRoot')) {
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
  }
  
  // Exponent
  if (document.getElementById('btnExponent')) {
    document.getElementById('btnExponent').addEventListener('click', () => {
      calculator.handleOperation('exponent');
    });
  }
  
  // Pi
  if (document.getElementById('btnPi')) {
    document.getElementById('btnPi').addEventListener('click', () => {
      calculator.currentValue = String(getPi());
      calculator.updateDisplay();
    });
  }
  
  // Trigonometric functions
  if (document.getElementById('btnSin')) {
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
  }
  
  if (document.getElementById('btnCos')) {
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
  }
  
  if (document.getElementById('btnTan')) {
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
  }
  
  // Continue with the rest of the function, adding similar checks...
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

// Generic helper function to safely add event listeners
function addClickListener(elementId, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener('click', callback);
    }
}

function setupSpecialFeatures(calculator, display) {
    // Example usage:
    addClickListener('btnZodiac', () => {
        const sign = prompt("Enter your zodiac sign (e.g., Aries, Taurus):", "");
        if (sign) {
            display.showZodiacInfo(sign);
        }
    });
    
    addClickListener('btnBiorhythm', () => {
        const birthdate = prompt("Enter your birthdate (YYYY-MM-DD):", "");
        if (birthdate) {
            display.showBiorhythm(birthdate);
        }
    });
    
    addClickListener('toggleConversionBtn', () => {
        const panel = document.getElementById('conversionPanel');
        panel.style.display = panel.style.display === 'none' || panel.style.display === '' ? 'block' : 'none';
    });

    addClickListener('btnDateDiff', () => {
        const date1 = prompt("Enter first date (YYYY-MM-DD):", "");
        const date2 = prompt("Enter second date (YYYY-MM-DD):", "");
        
        if (date1 && date2) {
            try {
                const d1 = new Date(date1);
                const d2 = new Date(date2);
                const diffTime = Math.abs(d2 - d1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                display.addToMultiLineDisplay(`<div>Date difference between ${date1} and ${date2}: <strong>${diffDays} days</strong></div>`);
            } catch (error) {
                display.showError("Invalid date format");
            }
        }
    });
    
    addClickListener('btnAddDays', () => {
        const startDate = prompt("Enter start date (YYYY-MM-DD):", "");
        const daysToAdd = prompt("Enter number of days to add:", "");
        
        if (startDate && daysToAdd) {
            try {
                const date = new Date(startDate);
                date.setDate(date.getDate() + parseInt(daysToAdd));
                const resultDate = date.toISOString().split('T')[0];
                
                display.addToMultiLineDisplay(`<div>Adding ${daysToAdd} days to ${startDate}: <strong>${resultDate}</strong></div>`);
            } catch (error) {
                display.showError("Invalid input");
            }
        }
    });
    
    const modeButtons = ['btnStandard', 'btnScientific', 'btnProgrammer', 'btnStatistics', 'btnFinancial', 'btnDate'];
    
    modeButtons.forEach(btnId => {
        addClickListener(btnId, () => {
            const mode = btnId.replace('btn', '');
            display.addToMultiLineDisplay(`<div>Switched to <strong>${mode}</strong> mode</div>`);
        });
    });
    
    const financialButtons = ['btnCompound', 'btnSimple', 'btnPV', 'btnFV'];
    
    financialButtons.forEach(btnId => {
        addClickListener(btnId, () => {
            const feature = btnId.replace('btn', '');
            display.addToMultiLineDisplay(`<div>Financial feature <strong>${feature}</strong> selected</div>`);
        });
    });
    
    const statsButtons = ['btnMean', 'btnMedian', 'btnStdDev', 'btnRegr'];
    
    statsButtons.forEach(btnId => {
        addClickListener(btnId, () => {
            display.addToMultiLineDisplay(`<div>Statistical function activated: <strong>${btnId.replace('btn', '')}</strong></div>`);
        });
    });
    
    addClickListener('btnE', () => {
        calculator.currentValue = String(Math.E);
        calculator.updateDisplay();
    });
    
    addClickListener('btnPhi', () => {
        calculator.currentValue = String((1 + Math.sqrt(5)) / 2);
        calculator.updateDisplay();
    });
    
    addClickListener('btnArcSin', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            if (value < -1 || value > 1) {
                throw new Error("Value must be between -1 and 1");
            }
            const result = Math.asin(value);
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    addClickListener('btnArcCos', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            if (value < -1 || value > 1) {
                throw new Error("Value must be between -1 and 1");
            }
            const result = Math.acos(value);
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    addClickListener('btnArcTan', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            const result = Math.atan(value);
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    addClickListener('btnCubeRoot', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            const result = Math.cbrt(value);
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    addClickListener('btnSquare', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            const result = value * value;
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    addClickListener('btnCube', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            const result = value * value * value;
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    addClickListener('btnAntilog', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            const result = Math.pow(10, value);
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    addClickListener('btnLogBase', () => {
        const base = prompt("Enter logarithm base:", "");
        if (base) {
            try {
                const baseNum = parseFloat(base);
                const value = parseFloat(calculator.currentValue);
                if (baseNum <= 0 || baseNum === 1 || value <= 0) {
                    throw new Error("Invalid logarithm values");
                }
                const result = Math.log(value) / Math.log(baseNum);
                calculator.currentValue = String(result);
                calculator.updateDisplay();
            } catch (error) {
                display.showError(error.message);
            }
        }
    });
    
    addClickListener('btnClearEntry', () => {
        calculator.currentValue = '0';
        calculator.updateDisplay();
    });
    
    addClickListener('btnOctal', () => {
        try {
            calculator.numberSystem = 'octal';
            const value = parseFloat(calculator.currentValue);
            const octalValue = Math.floor(value).toString(8);
            calculator.currentValue = octalValue;
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
}

function handleCalculatorErrors() {
  window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
    alert('Something went wrong. Please refresh the page and try again.');
    return false;
  });
}