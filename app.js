let section = document.querySelector(".button-section");
let input = document.querySelector("input");
let op = document.querySelector(".op-section");
let children = section.children;
let opChildren = op.children;
let result;

values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "C"];
operators = ["+", "-", "*", "/", "="];

function display() {
  values.forEach((element) => {
    section.innerHTML += `<button class="button">${element}</button>`;
  });
  operators.forEach((element) => {
    op.innerHTML += `<button class="button">${element}</button>`;
  });
}
display();

function displayInput() {
  for (let i = 0; i < children.length; i++) {
    children[i].addEventListener("click", () => {
      if (children[i].innerText === "C") {
        input.value = "";
      } else {
        input.value += children[i].innerText;
      }
    });
  }
  for (let i = 0; i < opChildren.length; i++) {
    opChildren[i].addEventListener("click", () => {
      input.value += opChildren[i].innerText;
      if (opChildren[i].innerText === "=") {
        calculate();
      }
    });
  }
}

document.addEventListener("keydown", (event) => {
    const pressedKey = event.key;
    if (/^\d$/.test(pressedKey)) {
      input.value += pressedKey;
    }else if(/[+\-*/=]/.test(pressedKey)){
        input.value += pressedKey;
        if(/=/.test(pressedKey)){
            calculate();
        }
    }
  });

function calculate() {
    const expression = input.value;
    let result;
  
    try {
      result = evalExpression(expression);
      input.value = result;
    } catch (error) {
      console.log("Error occurred during calculation:", error);
    }
  }
  
  function evalExpression(expression) {
    let sanitizedExpression = expression.replace(/[^-()\d/*+.]/, "");
    
    return Function(`'use strict'; return (${sanitizedExpression})`)();
  }

displayInput();
