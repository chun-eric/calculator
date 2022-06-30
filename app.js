"use strict";
// selecting all our variables and elements
const numberButtons = document.querySelectorAll("[data-number");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete");
const equalsButton = document.querySelector("[data-equals");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// 1st thing how are we going to store all the numbers in the output? Lets create a calc class and store all that info inside.
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  // 2nd we need to think about how all these operations perform.
  // we have AC , DEL, adding numbers, choosing an operation, Calculating/Computing and updating our display function
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  // 10th step make the delete function
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // 5th step lets work on appendNumber function()
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // 7th step making the chooseOperation function work
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    // if the previousOperand still exists on the display still initiate the compute()
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    // check first if there is no prev or there is a prev but no current and user presses = button we dont want it to run.
    if (isNaN(prev) || isNaN(current)) return;
    // then we have to run a switch statement to calculate difference scenarios
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // step 13 how do we add the commas for large numbers? Lets make a new function!
  // this part is a little complicated
  // we have to also account for non number before a decimal and afterwards

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    // step 12 how to add the operation in our previous operation display
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// 3rd we need to make instance or object of our calculator class by making a new variable called calculator. Now we can style and add functionality to the calculator object.
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// 4th lets add some functionality to our calculator object.
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// 6th lets add some functionality to our operations button
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//8th Step add functionality to equals button
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

//9th Steop add clear functionality
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

// 11th step add delete functionality
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
