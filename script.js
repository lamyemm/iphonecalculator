// Step 1 : Identify and mimic user intent
// User Intent: type a number, choose an operation, input another number, press equal sign and get a result
// Happy path : 2 + 5 = 7
// Edge case : 2 + 5 * 7 - 1700 = -1663 not doing this

let prevEntry = 0
let operator = null
let currentEntry = 0
let result = 0
let operation

// Step 2 : Select all elements needed on the screen

let display = document.querySelector('#display')
let buttons = document.querySelectorAll('.btn')
let operators = document.querySelectorAll('.operator')
updateScreen(result)

// Step 3 : Create a function that listens to key presses and lets us know the type of key press

buttons.forEach(btn => {
    btn.addEventListener("click", function() {
        removeActiveOperator()
        let btnClicked = this.innerText
        display.value = btnClicked
        // Step 4 : Define the functionality for each button and explain how it works
        if (btnClicked === "AC") {
            currentEntry = 0
        } else if (btnClicked === "+/-") {
            currentEntry *= -1
        } else if (btnClicked === ".") {
            currentEntry += "."
        } else if (isNumber(btnClicked)) {
            if (currentEntry === 0 || currentEntry === result) {
                currentEntry = btnClicked
            } else {
                currentEntry += btnClicked
            }
        } else if (isOperator(btnClicked)) {
            btn.classList.add("active")
            prevEntry = currentEntry
            operation = btnClicked
            currentEntry = ""
        } else if (btnClicked === "%") {
            currentEntry /= 100
        } else if (btnClicked === "=" && currentEntry !== "" && isOperator(operation)) {
            result = operate(prevEntry, operation, currentEntry)
            operation = null
            currentEntry = result
        }
        updateScreen(currentEntry)
    })
})

// Step 5 : Create a function to teach our JS program what numbers are

const isNumber = (value) => !isNaN(value)

// Step 6 : Create a function to teach our JS program what operations are

function isOperator(value){
    return value === "÷" || value === "x" || value === "+" || value === "-"
} 

// Step 7 : Create a function to teach our JS program how to calculate an equation
function operate(a, operation, b) {
    a = parseFloat(a)
    b = parseFloat(b)
    
    switch(operation) {
        case "+":
            return a+b
        case "-":
            return a-b
        case "x":
            return a*b
        case "÷":
            return a/b
    }
} 

// Step 8 : Create a function to display the results

function updateScreen(result) {
    let displayValue = result.toString()
    display.value = displayValue.substring(0, 6)
}

function removeActiveOperator() {
    operators.forEach(operator => {
        operator.classList.remove('active')
    })
}