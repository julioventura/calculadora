// Unit conversion functions

// Length conversions
const lengthConversions = {
  // Base unit: meters
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344
};

// Weight conversions
const weightConversions = {
  // Base unit: grams
  gram: 1,
  kilogram: 1000,
  milligram: 0.001,
  pound: 453.59237,
  ounce: 28.349523125,
  ton: 907185 // US ton
};

// Volume conversions
const volumeConversions = {
  // Base unit: liters
  liter: 1,
  milliliter: 0.001,
  cubicMeter: 1000,
  gallon: 3.78541,
  quart: 0.946353,
  pint: 0.473176,
  cup: 0.2365882365,
  fluidOunce: 0.0295735
};

// Temperature conversions
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function fahrenheitToKelvin(fahrenheit) {
  return celsiusToKelvin(fahrenheitToCelsius(fahrenheit));
}

function kelvinToFahrenheit(kelvin) {
  return celsiusToFahrenheit(kelvinToCelsius(kelvin));
}

// Generic unit conversion function
function convertUnit(value, fromUnit, toUnit, conversionTable) {
  if (!conversionTable[fromUnit] || !conversionTable[toUnit]) {
    throw new Error('Invalid unit for conversion');
  }
  
  // Convert to base unit, then to target unit
  const baseValue = value * conversionTable[fromUnit];
  return baseValue / conversionTable[toUnit];
}

// Specific conversion functions
function convertLength(value, fromUnit, toUnit) {
  return convertUnit(value, fromUnit, toUnit, lengthConversions);
}

function convertWeight(value, fromUnit, toUnit) {
  return convertUnit(value, fromUnit, toUnit, weightConversions);
}

function convertVolume(value, fromUnit, toUnit) {
  return convertUnit(value, fromUnit, toUnit, volumeConversions);
}

function convertTemperature(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  
  switch(`${fromUnit}_${toUnit}`) {
    case 'celsius_fahrenheit':
      return celsiusToFahrenheit(value);
    case 'fahrenheit_celsius':
      return fahrenheitToCelsius(value);
    case 'celsius_kelvin':
      return celsiusToKelvin(value);
    case 'kelvin_celsius':
      return kelvinToCelsius(value);
    case 'fahrenheit_kelvin':
      return fahrenheitToKelvin(value);
    case 'kelvin_fahrenheit':
      return kelvinToFahrenheit(value);
    default:
      throw new Error('Invalid temperature conversion');
  }
}
