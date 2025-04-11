// Number system conversion functions

function decimalToBinary(decimalValue) {
  if (!Number.isInteger(decimalValue) || decimalValue < 0) {
    throw new Error('Binary conversion requires a non-negative integer');
  }
  return decimalValue.toString(2);
}

function binaryToDecimal(binaryValue) {
  if (!/^[01]+$/.test(binaryValue)) {
    throw new Error('Invalid binary number');
  }
  return parseInt(binaryValue, 2);
}

function decimalToHexadecimal(decimalValue) {
  if (!Number.isInteger(decimalValue) || decimalValue < 0) {
    throw new Error('Hexadecimal conversion requires a non-negative integer');
  }
  return decimalValue.toString(16).toUpperCase();
}

function hexadecimalToDecimal(hexValue) {
  if (!/^[0-9A-Fa-f]+$/.test(hexValue)) {
    throw new Error('Invalid hexadecimal number');
  }
  return parseInt(hexValue, 16);
}

function binaryToHexadecimal(binaryValue) {
  return decimalToHexadecimal(binaryToDecimal(binaryValue));
}

function hexadecimalToBinary(hexValue) {
  return decimalToBinary(hexadecimalToDecimal(hexValue));
}

// Format display for different number systems
function formatForNumberSystem(value, system) {
  switch (system) {
    case 'binary':
      return decimalToBinary(Math.floor(value));
    case 'hexadecimal':
      return decimalToHexadecimal(Math.floor(value));
    case 'decimal':
    default:
      return value.toString();
  }
}
