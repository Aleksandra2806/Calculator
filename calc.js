// create calculator

const main = document.querySelector("body");

const mainDiv = document.createElement("div");
mainDiv.classList.add("calculator");
main.appendChild(mainDiv);

const inputCal = document.createElement("div");
inputCal.classList.add("screen");
const setName = ["previous","current"];
for(let i = 0; i < setName.length; i++) {
  const input = document.createElement("div");
  input.classList.add(`${setName[i]}`);
  inputCal.appendChild(input);
}
mainDiv.appendChild(inputCal);

mainDiv.appendChild(creatButton());

function creatButton() {
  const divKeybord = document.createElement("div");
  divKeybord.classList.add("keybord");
  for(let i = 0; i < 10; i++) {
    const numberButton = document.createElement("button");
    numberButton.classList.add(`button${i}`);
    numberButton.classList.add("number");
    numberButton.innerText = i;
    divKeybord.appendChild(numberButton);
  }
  const symbole = ["+","-","x","÷","Percent"];
  for(let i = 0; i < symbole.length; i++) {
    const symboleButton = document.createElement("button");
    symboleButton.classList.add(`button${symbole[i]}`);
    symboleButton.classList.add("operate");
    switch(i) {
      case 0: 
      symboleButton.innerText = "+";
      break;
      case 1: 
      symboleButton.innerText = "-";
      break; 
      case 2: 
      symboleButton.innerText = "x";
      break; 
      case 3:
      symboleButton.innerText = "÷";
      break;
      case 4: 
      symboleButton.innerText = "%";
      break;   
    }
    divKeybord.appendChild(symboleButton);
  }
  const buttonAC = document.createElement("button");
  buttonAC.classList.add("buttonC");
  buttonAC.setAttribute("value",`ac`);
  buttonAC.innerText = "AC";
  divKeybord.appendChild(buttonAC);

  const buttonDel = document.createElement("button");
  buttonDel.classList.add("buttonDel");
  buttonDel.setAttribute("value",`del`);
  buttonDel.innerText = "Del";
  divKeybord.appendChild(buttonDel);

  const buttonEqual = document.createElement("button");
  buttonEqual.classList.add("buttonEq");
  buttonEqual.innerText = "=";
  divKeybord.appendChild(buttonEqual);

  const buttonDot = document.createElement("button");
  buttonDot.classList.add("buttonDot");
  buttonDot.classList.add("number");
  buttonDot.innerText = ".";
  divKeybord.appendChild(buttonDot);

  return divKeybord;
}

class Calculator {
  constructor(previousOperText,currentOperText) {
    this.previousOperText = previousOperText;
    this.currentOperText = currentOperText;
    this.clear();
  }
  clear() {
    this.currentOper = 0;
    this.previousOper = 0;
    this.operat = undefined;
  }
  delete() {
    this.currentOper = this.currentOper.toString().slice(0, -1)
  }
  appendNumber(number) {
    if(number === "." && this.currentOper.includes(".")) { 
      return;
    }
    this.currentOper = this.currentOper.toString()+number.toString();
  }
  chooseOperat(operation) {
    if(this.currentOper === " ") {
      return;
    }
    if(this.previousOper !== " ") {
      this.compute();
    }
    this.operation = operation;
    this.previousOper = this.currentOper;
    this.currentOper = " ";
  }
  compute() {
    let comput;
    const prev = parseFloat(this.previousOper);
    const current = parseFloat(this.currentOper);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch(this.operation) {
      case "+": 
      comput= prev + current; 
      break;
      case "-": 
      comput = prev - current; 
      break;
      case "x": 
      comput = prev * current; 
      break;
      case "÷": 
      comput = prev / current; 
      break;
      case "%": 
      comput = prev/100 * current; 
      break;
      default: 
      return;
    }
    this.currentOper = comput;
    this.operation = undefined;
    this.previousOper = " ";
  }
  getDisplay(number) {
    const stringNumb = number.toString();
    const integer = parseFloat(stringNumb.split(".")[0]);
      const decimal = stringNumb.split(".")[1];
      let integDisplay;
      if(isNaN(integer)) {
        integDisplay = " ";
      } else {
      integDisplay = integer.toLocaleString("ru", { maximumFractionDigits: 0});
      } if( decimal != null) {
      return `${integer}.${decimal}`;
      } else {
      return integDisplay;
      }
  }
  upDisplay() {
    this.currentOperText.innerText = this.getDisplay(this.currentOper);
    if(this.operation != null) {
      this.previousOperText.innerText = `${this.getDisplay(this.previousOper)} ${this.operation}`;
    } else {
    this.previousOperText.innerText = "";
    }
  }
}

const allNumber = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operate");
const equal = document.querySelector(".buttonEq");
const clear = document.querySelector(".buttonC");
const del = document.querySelector(".buttonDel");
const prev = document.querySelector(".previous");
const current = document.querySelector(".current");
const oriInput= document.querySelector("input");

const calculator = new Calculator(prev,current);

allNumber.forEach(button => {
button.addEventListener("click", () => {
  calculator.appendNumber(button.innerText);
  calculator.upDisplay();
  });
});

operator.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperat(button.innerText);
    calculator.upDisplay();
  })
});

equal.addEventListener("click", () => {
  calculator.compute();
  calculator.upDisplay();
});

clear.addEventListener("click", () => {
  calculator.clear();
  calculator.upDisplay();
});

del.addEventListener('click',() => {
  calculator.delete();
  calculator.upDisplay();
}); 
