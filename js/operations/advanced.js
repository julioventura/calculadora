// Advanced mathematical operations

function squareRoot(value) {
  if (value < 0) {
    throw new Error('Cannot calculate square root of a negative number');
  }
  return Math.sqrt(value);
}

function exponent(base, exponent) {
  return Math.pow(base, exponent);
}

function factorial(n) {
  if (n < 0) {
    throw new Error('Cannot calculate factorial of a negative number');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('Factorial only works with integers');
  }
  
  if (n === 0 || n === 1) {
    return 1;
  }
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  
  return result;
}

function getPi() {
  return Math.PI;
}

function getE() {
  return Math.E;
}

function absolute(value) {
  return Math.abs(value);
}
