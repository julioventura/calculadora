// This file manages currency conversion, fetching updated rates from the Internet.

class CurrencyConverter {
  constructor() {
    this.rates = {};
    this.lastUpdated = null;
    this.baseCurrency = 'USD';
    this.fetchRates();
  }
  
  async fetchRates() {
    try {
      // Using a free API for currency conversion
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();
      
      if (data && data.rates) {
        this.rates = data.rates;
        this.lastUpdated = new Date(data.time_last_update_utc);
        this.displayRatesUpdated();
      } else {
        console.error('Invalid response from currency API');
      }
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      this.useFallbackRates();
    }
  }
  
  useFallbackRates() {
    // Fallback rates in case the API is unavailable
    this.rates = {
      USD: 1,
      EUR: 0.93,
      GBP: 0.79,
      JPY: 150.59,
      AUD: 1.52,
      CAD: 1.38,
      CHF: 0.91,
      CNY: 7.24,
      SEK: 10.52,
      NZD: 1.65,
      BRL: 5.16,
      RUB: 92.32
    };
    this.lastUpdated = new Date();
  }
  
  convert(amount, fromCurrency, toCurrency) {
    if (!amount || isNaN(amount)) {
      return 'Invalid amount';
    }
    
    if (!this.rates[fromCurrency] || !this.rates[toCurrency]) {
      return 'Currency not available';
    }
    
    // Convert to USD first, then to target currency
    const inUSD = amount / this.rates[fromCurrency];
    const result = inUSD * this.rates[toCurrency];
    
    return result;
  }
  
  getAvailableCurrencies() {
    return Object.keys(this.rates);
  }
  
  displayRatesUpdated() {
    console.log(`Currency rates updated: ${this.lastUpdated}`);
    // Could also update a status element in the UI
  }
  
  getLastUpdated() {
    return this.lastUpdated ? this.lastUpdated.toLocaleString() : 'Never';
  }
}

// Initialize the converter
const currencyConverter = new CurrencyConverter();