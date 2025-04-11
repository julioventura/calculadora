// This file contains the main logic for the calculator, handling input, calculations, and updating the display.

class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.currentValue = '0';
    this.pendingOperation = null;
    this.previousValue = null;
    this.waitingForSecondOperand = false;
    this.lastResult = null;
    this.numberSystem = 'decimal'; // decimal, binary, hex
    this.memoryManager = new MemoryManager();
    this.expressionHistory = [];
  }
  
  updateDisplay() {
    this.displayElement.value = this.currentValue;
  }
  
  inputDigit(digit) {
    if (this.waitingForSecondOperand) {
      this.currentValue = String(digit);
      this.waitingForSecondOperand = false;
    } else {
      this.currentValue = this.currentValue === '0' ? String(digit) : this.currentValue + digit;
    }
    this.updateDisplay();
  }
  
  inputDecimal() {
    if (this.waitingForSecondOperand) {
      this.currentValue = '0.';
      this.waitingForSecondOperand = false;
    } else if (!this.currentValue.includes('.')) {
      this.currentValue += '.';
    }
    this.updateDisplay();
  }
  
  clear() {
    this.currentValue = '0';
    this.pendingOperation = null;
    this.previousValue = null;
    this.waitingForSecondOperand = false;
    this.updateDisplay();
  }
  
  handleOperation(operation) {
    const inputValue = parseFloat(this.currentValue);
    
    if (this.previousValue === null) {
      this.previousValue = inputValue;
    } else if (this.pendingOperation) {
      const result = this.performCalculation(this.pendingOperation);
      this.currentValue = String(result);
      this.previousValue = result;
      this.lastResult = result;
    }
    
    this.waitingForSecondOperand = true;
    this.pendingOperation = operation;
    this.updateDisplay();
  }
  
  performCalculation(operation) {
    const secondOperand = parseFloat(this.currentValue);
    let result;
    
    switch (operation) {
      case 'add':
        result = this.previousValue + secondOperand;
        break;
      case 'subtract':
        result = this.previousValue - secondOperand;
        break;
      case 'multiply':
        result = this.previousValue * secondOperand;
        break;
      case 'divide':
        if (secondOperand === 0) {
          return 'Error';
        }
        result = this.previousValue / secondOperand;
        break;
      default:
        result = secondOperand;
    }
    
    // Store the expression in history
    this.expressionHistory.push({
      firstOperand: this.previousValue,
      operation: operation,
      secondOperand: secondOperand,
      result: result
    });
    
    return result;
  }
  
  handleEquals() {
    if (!this.pendingOperation) return;
    
    const inputValue = parseFloat(this.currentValue);
    const result = this.performCalculation(this.pendingOperation);
    
    this.currentValue = String(result);
    this.previousValue = null;
    this.pendingOperation = null;
    this.waitingForSecondOperand = false;
    this.lastResult = result;
    
    this.updateDisplay();
  }
  
  invertSign() {
    this.currentValue = String(-parseFloat(this.currentValue));
    this.updateDisplay();
  }
  
  percentage() {
    this.currentValue = String(parseFloat(this.currentValue) / 100);
    this.updateDisplay();
  }
  
  backspace() {
    if (this.currentValue.length === 1) {
      this.currentValue = '0';
    } else {
      this.currentValue = this.currentValue.slice(0, -1);
    }
    this.updateDisplay();
  }
  
  // Advanced operations to be implemented in later steps
}