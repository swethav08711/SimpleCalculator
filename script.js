class Calculator {
  constructor(previosOperandTextElement, currentOperandTextElement) {
    this.previosOperandTextElement = previosOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
  clear() {
    this.currentOperand = ""
    this.previousOperand = ""
    this.operation = undefined
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return
    if (this.previousOperand !== "") {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ""
  }
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "/":
        computation = prev / current
        break
      case "*":
        computation = prev * current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ""
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const interDigits = parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]
    let integerDisplay
    if (isNaN(interDigits)) {
      integerDisplay = ""
    } else {
      integerDisplay = interDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    )
    if (this.operation != null) {
      this.previosOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
    } else {
      this.previosOperandTextElement.innerHTML = ""
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButoon = document.querySelector("[data-equals]")
const deleteButoon = document.querySelector("[data-delete]")
const allclearButoon = document.querySelector("[data-all-clear]")
const previosOperandTextElement = document.querySelector(
  "[data-previos-operand]"
)
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
)

const calculator = new Calculator(
  previosOperandTextElement,
  currentOperandTextElement
)
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerHTML)
    calculator.updateDisplay()
  })
})
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerHTML)
    calculator.updateDisplay()
  })
})

equalsButoon.addEventListener("click", button => {
  calculator.compute()
  calculator.updateDisplay()
})
allclearButoon.addEventListener("click", button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButoon.addEventListener("click", button => {
  calculator.delete()
  calculator.updateDisplay()
})
