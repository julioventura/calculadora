// This file manages the display of the calculator, including updating the screen with results and handling different display modes.

class Display {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.secondaryDisplay = null;
        this.createSecondaryDisplay();
    }

    createSecondaryDisplay() {
        // Create a secondary display for showing operation history
        this.secondaryDisplay = document.createElement('div');
        this.secondaryDisplay.className = 'secondary-display';
        this.displayElement.parentNode.insertBefore(this.secondaryDisplay, this.displayElement);
    }

    updateMainDisplay(value) {
        this.displayElement.value = value;
    }

    updateSecondaryDisplay(text) {
        this.secondaryDisplay.textContent = text;
    }

    clear() {
        this.updateMainDisplay('0');
        this.updateSecondaryDisplay('');
    }

    showMemoryStatus(memoryNumber, value) {
        this.updateSecondaryDisplay(`M${memoryNumber}: ${value}`);
        // Clear after 2 seconds
        setTimeout(() => {
            this.updateSecondaryDisplay('');
        }, 2000);
    }

    showError(message) {
        this.updateMainDisplay(message || 'Error');
        // Clear after 2 seconds
        setTimeout(() => {
            this.updateMainDisplay('0');
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
}

// Usage example
const displayElement = document.querySelector('.display');
const calculatorDisplay = new Display(displayElement);