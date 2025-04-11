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

function setupSpecialFeatures(calculator, display) {
    // Zodiac feature
    document.getElementById('btnZodiac').addEventListener('click', () => {
        // Prompt for zodiac sign
        const sign = prompt("Enter your zodiac sign (e.g., Aries, Taurus):", "");
        if (sign) {
            display.showZodiacInfo(sign);
        }
    });
    
    // Biorhythm feature
    document.getElementById('btnBiorhythm').addEventListener('click', () => {
        // Prompt for birthdate
        const birthdate = prompt("Enter your birthdate (YYYY-MM-DD):", "");
        if (birthdate) {
            display.showBiorhythm(birthdate);
        }
    });
    
    // Toggle the conversion panel visibility
    document.getElementById('toggleConversionBtn').addEventListener('click', () => {
        const panel = document.getElementById('conversionPanel');
        panel.style.display = panel.style.display === 'none' || panel.style.display === '' ? 'block' : 'none';
    });

    // Date calculation features
    document.getElementById('btnDateDiff').addEventListener('click', () => {
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
    
    document.getElementById('btnAddDays').addEventListener('click', () => {
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
    
    // Mode selection buttons
    const modeButtons = ['btnStandard', 'btnScientific', 'btnProgrammer', 'btnStatistics', 'btnFinancial', 'btnDate'];
    
    modeButtons.forEach(btnId => {
        document.getElementById(btnId).addEventListener('click', () => {
            const mode = btnId.replace('btn', '');
            display.addToMultiLineDisplay(`<div>Switched to <strong>${mode}</strong> mode</div>`);
            // Here you would implement mode switching logic
        });
    });
    
    // Financial buttons
    const financialButtons = ['btnCompound', 'btnSimple', 'btnPV', 'btnFV'];
    
    financialButtons.forEach(btnId => {
        document.getElementById(btnId).addEventListener('click', () => {
            const feature = btnId.replace('btn', '');
            display.addToMultiLineDisplay(`<div>Financial feature <strong>${feature}</strong> selected</div>`);
            // Here you would implement financial calculations
        });
    });
    
    // Statistics buttons
    const statsButtons = ['btnMean', 'btnMedian', 'btnStdDev', 'btnRegr'];
    
    statsButtons.forEach(btnId => {
        document.getElementById(btnId).addEventListener('click', () => {
            display.addToMultiLineDisplay(`<div>Statistical function activated: <strong>${btnId.replace('btn', '')}</strong></div>`);
            // Here you would implement statistics calculations
        });
    });
    
    // Constants
    document.getElementById('btnE').addEventListener('click', () => {
        calculator.currentValue = String(Math.E);
        calculator.updateDisplay();
    });
    
    document.getElementById('btnPhi').addEventListener('click', () => {
        calculator.currentValue = String((1 + Math.sqrt(5)) / 2);
        calculator.updateDisplay();
    });
    
    // Inverse trig functions
    document.getElementById('btnArcSin').addEventListener('click', () => {
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
    
    document.getElementById('btnArcCos').addEventListener('click', () => {
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
    
    document.getElementById('btnArcTan').addEventListener('click', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            const result = Math.atan(value);
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    // More advanced math functions
    document.getElementById('btnCubeRoot').addEventListener('click', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            const result = Math.cbrt(value);
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    document.getElementById('btnSquare').addEventListener('click', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            const result = value * value;
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    document.getElementById('btnCube').addEventListener('click', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            const result = value * value * value;
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    document.getElementById('btnAntilog').addEventListener('click', () => {
        try {
            const value = parseFloat(calculator.currentValue);
            const result = Math.pow(10, value);
            calculator.currentValue = String(result);
            calculator.updateDisplay();
        } catch (error) {
            display.showError(error.message);
        }
    });
    
    document.getElementById('btnLogBase').addEventListener('click', () => {
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
    
    document.getElementById('btnClearEntry').addEventListener('click', () => {
        calculator.currentValue = '0';
        calculator.updateDisplay();
    });
    
    document.getElementById('btnOctal').addEventListener('click', () => {
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