// This file manages the display of the calculator, including updating the screen with results and handling different display modes.

class Display {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.secondaryDisplay = document.getElementById('secondaryDisplay');
        this.multiLineDisplay = document.getElementById('multiLineDisplay');
        this.currentExpression = ''; // New property to track the current expression
        
        // Initialize the display
        this.clear();
    }

    updateMainDisplay(value) {
        this.displayElement.value = value;
    }

    updateSecondaryDisplay(text) {
        this.secondaryDisplay.textContent = text;
    }

    updateExpression(expression) {
        this.currentExpression = expression;
        this.updateSecondaryDisplay(expression);
    }

    addOperatorToExpression(operator) {
        let displayOperator = operator;
        switch (operator) {
            case 'add': displayOperator = ' + '; break;
            case 'subtract': displayOperator = ' - '; break;
            case 'multiply': displayOperator = ' × '; break;
            case 'divide': displayOperator = ' ÷ '; break;
            case 'exponent': displayOperator = ' ^ '; break;
            default: displayOperator = ` ${operator} `;
        }
        
        this.currentExpression += displayOperator;
        this.updateSecondaryDisplay(this.currentExpression);
    }

    addNumberToExpression(number) {
        this.currentExpression += number;
        this.updateSecondaryDisplay(this.currentExpression);
    }

    addParenthesisToExpression(parenthesis) {
        this.currentExpression += parenthesis;
        this.updateSecondaryDisplay(this.currentExpression);
    }

    addToMultiLineDisplay(content) {
        const lineElement = document.createElement('div');
        lineElement.innerHTML = content;
        this.multiLineDisplay.appendChild(lineElement);
        
        // Auto-scroll to bottom
        this.multiLineDisplay.scrollTop = this.multiLineDisplay.scrollHeight;
        
        // Keep only the last 5 entries for equation history
        while (this.multiLineDisplay.children.length > 5) {
            this.multiLineDisplay.removeChild(this.multiLineDisplay.firstChild);
        }
    }

    finalizeEquation(result) {
        const equationWithResult = `${this.currentExpression} = ${result}`;
        this.addToMultiLineDisplay(`<div class="equation-history">${equationWithResult}</div>`);
        this.currentExpression = String(result); // Start new expression with the result
        this.updateSecondaryDisplay(this.currentExpression);
    }

    clearExpression() {
        this.currentExpression = '';
        this.updateSecondaryDisplay('');
    }

    clear() {
        this.updateMainDisplay('0');
        this.clearExpression();
        // Don't clear multi-line display automatically
    }

    clearAll() {
        this.clear();
        this.multiLineDisplay.innerHTML = '';
    }

    showMemoryStatus(memoryNumber, value) {
        this.updateSecondaryDisplay(`M${memoryNumber}: ${value}`);
        // Clear after 2 seconds
        setTimeout(() => {
            this.updateSecondaryDisplay(this.currentExpression);
        }, 2000);
    }

    showError(message) {
        this.updateMainDisplay(message || 'Error');
        // Add to multi-line display
        this.addToMultiLineDisplay(`<span style="color: #ff6b6b">Error: ${message || 'Unknown error'}</span>`);
        
        // Clear main display after 2 seconds
        setTimeout(() => {
            this.updateMainDisplay('0');
            this.updateSecondaryDisplay(this.currentExpression);
        }, 2000);
    }

    formatNumberForDisplay(number, numberSystem) {
        if (typeof number !== 'number') return number;

        switch (numberSystem) {
            case 'binary':
                return Math.floor(number).toString(2);
            case 'hexadecimal':
                return Math.floor(number).toString(16).toUpperCase();
            case 'decimal':
            default:
                // Limit decimal places to prevent overflow
                if (Number.isInteger(number)) return number.toString();
                return number.toPrecision(10).replace(/\.?0+$/, '');
        }
    }
    
    // Zodiac functionality
    showZodiacInfo(sign) {
        // Sample horoscope data
        const horoscopes = {
            aries: "Today is a great day for new beginnings. Trust your instincts.",
            taurus: "Financial matters improve today. Stay grounded in your decisions.",
            gemini: "Communication is key today. Express your ideas clearly.",
            cancer: "Focus on home and family today. Emotional connections strengthen.",
            leo: "Creative energy is high today. Showcase your talents.",
            virgo: "Pay attention to details today. Organization brings success.",
            libra: "Seek balance in your relationships today. Compromise is key.",
            scorpio: "Transformation is possible today. Embrace change.",
            sagittarius: "Adventure calls today. Expand your horizons.",
            capricorn: "Career goals move forward today. Stay focused.",
            aquarius: "Innovative ideas flow today. Think outside the box.",
            pisces: "Intuition is strong today. Trust your inner voice."
        };
        
        const horoscope = horoscopes[sign.toLowerCase()] || "Please enter a valid zodiac sign.";
        
        // Create a styled zodiac display
        const zodiacHTML = `
            <div style="border: 1px solid #0f0; padding: 5px; margin: 5px 0;">
                <div style="text-align: center; font-weight: bold; color: #0f0;">${sign.toUpperCase()} HOROSCOPE</div>
                <div>${horoscope}</div>
            </div>
        `;
        
        this.addToMultiLineDisplay(zodiacHTML);
    }
    
    // Biorhythm functionality
    showBiorhythm(birthdate) {
        try {
            const birthDate = new Date(birthdate);
            const today = new Date();
            
            // Calculate days since birth
            const daysSinceBirth = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
            
            if (isNaN(daysSinceBirth)) {
                throw new Error("Invalid birthdate");
            }
            
            // Calculate the three biorhythm cycles
            const physical = Math.sin(2 * Math.PI * daysSinceBirth / 23);
            const emotional = Math.sin(2 * Math.PI * daysSinceBirth / 28);
            const intellectual = Math.sin(2 * Math.PI * daysSinceBirth / 33);
            
            // Create an ASCII chart
            let chart = '<div style="font-family: monospace; white-space: pre;">';
            chart += '+1.0 ';
            
            // Add 30 day forecast
            for (let i = 0; i < 30; i++) {
                const day = daysSinceBirth + i;
                const p = Math.sin(2 * Math.PI * day / 23);
                const e = Math.sin(2 * Math.PI * day / 28);
                const n = Math.sin(2 * Math.PI * day / 33);
                
                // Create simple textual chart rows
                const pChar = p > 0.8 ? 'P' : p > 0.3 ? 'p' : p > -0.3 ? '-' : p > -0.8 ? 'p' : 'P';
                const eChar = e > 0.8 ? 'E' : e > 0.3 ? 'e' : e > -0.3 ? '-' : e > -0.8 ? 'e' : 'E';
                const iChar = n > 0.8 ? 'I' : n > 0.3 ? 'i' : n > -0.3 ? '-' : n > -0.8 ? 'i' : 'I';
                
                chart += `<br>${pChar}${eChar}${iChar}`;
            }
            
            chart += '</div>';
            
            // Show today's values in a table
            const bioTable = `
            <div style="margin-top: 10px;">
                <table class="display-table">
                    <tr>
                        <th>Cycle</th>
                        <th>Value</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>Physical</td>
                        <td>${(physical * 100).toFixed(0)}%</td>
                        <td>${this.getBiorhythmStatus(physical)}</td>
                    </tr>
                    <tr>
                        <td>Emotional</td>
                        <td>${(emotional * 100).toFixed(0)}%</td>
                        <td>${this.getBiorhythmStatus(emotional)}</td>
                    </tr>
                    <tr>
                        <td>Intellectual</td>
                        <td>${(intellectual * 100).toFixed(0)}%</td>
                        <td>${this.getBiorhythmStatus(intellectual)}</td>
                    </tr>
                </table>
            </div>
            `;
            
            // Add to display
            this.addToMultiLineDisplay('<div style="color: #0ff; text-align: center;">BIORHYTHM CHART</div>');
            this.addToMultiLineDisplay(bioTable);
            this.addToMultiLineDisplay(chart);
            
        } catch (error) {
            this.showError("Please enter a valid birthdate (YYYY-MM-DD)");
        }
    }
    
    getBiorhythmStatus(value) {
        if (value > 0.8) return "Peak";
        if (value > 0.3) return "High";
        if (value > -0.3) return "Average";
        if (value > -0.8) return "Low";
        return "Critical";
    }
}

// Usage example
const displayElement = document.querySelector('.display');
const calculatorDisplay = new Display(displayElement);