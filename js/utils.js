// This file contains utility functions that are used throughout the application for various purposes.

// Utility functions for the calculator

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

// Format large numbers with thousand separators
function formatNumber(number) {
    if (typeof number !== 'number') return number;

    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Setup keyboard support
function setupKeyboardSupport(calculator) {
    document.addEventListener('keydown', (event) => {
        // Prevent default for calculator keys to avoid page scrolling
        if (isCalculatorKey(event.key)) {
            event.preventDefault();
        }

        // Number keys
        if (event.key >= '0' && event.key <= '9') {
            calculator.inputDigit(parseInt(event.key));
        }
        // Decimal point
        else if (event.key === '.') {
            calculator.inputDecimal();
        }
        // Basic operations
        else if (event.key === '+') {
            calculator.handleOperation('add');
        }
        else if (event.key === '-') {
            calculator.handleOperation('subtract');
        }
        else if (event.key === '*') {
            calculator.handleOperation('multiply');
        }
        else if (event.key === '/') {
            calculator.handleOperation('divide');
        }
        // Equals and Enter keys
        else if (event.key === '=' || event.key === 'Enter') {
            calculator.handleEquals();
        }
        // Clear with Escape
        else if (event.key === 'Escape') {
            calculator.clear();
        }
        // Backspace
        else if (event.key === 'Backspace') {
            calculator.backspace();
        }
        // Parentheses
        else if (event.key === '(' || event.key === ')') {
            calculator.handleParenthesis(event.key);
        }
    });
}

function isCalculatorKey(key) {
    const calculatorKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '+', '-', '*', '/', '=', 'Enter', 'Escape', 'Backspace',
        '.', '(', ')'
    ];
    return calculatorKeys.includes(key);
}

// Check if the device is a mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Adjust UI for mobile devices
function adjustUIForMobile() {
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
    }
}
