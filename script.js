// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", function() {

  // Get the output element to display the calculator screen
  const screen = document.getElementById("output");

  // Get all the buttons with the class "btn"
  const buttons = document.querySelectorAll(".btn");

  // Initialize variables to hold the first number, operator, and second number
  let firstNumber = '';
  let operator = '';
  let secondNumber = '';

  // Function to update the calculator screen with the current numbers and operator
  function updateScreen() {
    screen.textContent = firstNumber + operator + secondNumber;
  }

  // Add event listeners to all buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonValue = button.value;

      // If the button clicked is a number, add it to the appropriate number variable
      if (!isNaN(parseInt(buttonValue))) {
        if (!operator) {
          firstNumber += buttonValue;
        } else {
          secondNumber += buttonValue;
        }
      } else if (buttonValue === "=") {
        // Handle the equals sign to perform the calculation
        if (operator && secondNumber) {
          // Calculate the result using the 'operate' function and update variables
          const result = operate(operator, firstNumber, secondNumber);
          firstNumber = result.toString();
          operator = '';
          secondNumber = '';
        }
      } else if (buttonValue === "clear") {
        // Clear the calculator and reset all variables
        clear();
      } else if (buttonValue === "delete") {
        // Delete the last character from the screen and update variables accordingly
        del();
      } else {
        // If the button clicked is an operator, set the operator variable
        if (firstNumber && operator && secondNumber) {
          // Calculate the result of the first expression if all conditions are met
          const result = operate(operator, firstNumber, secondNumber);
          firstNumber = result.toString();
          secondNumber = '';
        }
        operator = buttonValue;
      }

      // Update the calculator screen after each button click
      updateScreen();
    });
  });

  // Function to perform arithmetic operations based on the operator
  function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
      case "+":
        return add(a, b);
      case "-":
        return sub(a, b);
      case "x":
        return multiply(a, b);
      case "^":
        return power(a, b);
      case "/":
        if (b === 0) {
          return null; // Return null for division by zero
        }
        return divide(a, b);
    }
  }

  // Functions to perform basic arithmetic operations
  function add(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    return a / b;
  }

  function power(a, b) {
    return a ** b;
  }

  // Function to clear the calculator and reset all variables
  function clear() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    updateScreen();
  }

  // Function to delete the last character from the screen and update variables
  function del() {
    screen.textContent = screen.textContent.slice(0, -1);
    if (!operator) {
      firstNumber = screen.textContent;
    } else {
      secondNumber = screen.textContent.slice(firstNumber.length + operator.length);
    }
  }
});
