// Logarithmic functions

function log10(value) {
  if (value <= 0) {
    throw new Error('Cannot calculate logarithm of a non-positive number');
  }
  return Math.log10(value);
}

function logBase(value, base) {
  if (value <= 0 || base <= 0 || base === 1) {
    throw new Error('Invalid arguments for logarithm');
  }
  return Math.log(value) / Math.log(base);
}

function ln(value) {
  if (value <= 0) {
    throw new Error('Cannot calculate natural logarithm of a non-positive number');
  }
  return Math.log(value);
}

function antilog10(value) {
  return Math.pow(10, value);
}

function antiln(value) {
  return Math.exp(value);
}

