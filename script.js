// Const

const dtop = document.querySelector(".top");
const dbot = document.querySelector(".bottom");
const digits = document.querySelectorAll("button");
const enter = document.querySelector("#enter");
const operations = document.querySelectorAll(".operation");
const clear = document.querySelector("#clear");

let operator = "";
let firstNum = "";
let secondArg = "";

// Functions

let add = function (a, b) {
  return parseFloat(a) + parseFloat(b);
};

let sub = function (a, b) {
  return parseFloat(a) - parseFloat(b);
};

let mult = function (a, b) {
  return parseFloat(a) * parseFloat(b);
};

let div = function (a, b) {
  if (b == 0) {
    return "bruh";
  } else {
    return parseFloat(a) / parseFloat(b);
  }
};

function operate(operator, num1, num2) {
  if (operator == "+") {
    return add(num1, num2);
  }
  if (operator == "-") {
    return sub(num1, num2);
  }
  if (operator == "/") {
    return div(num1, num2);
  }
  if (operator == "X") {
    return mult(num1, num2);
  }
}

function firstOps(input) {
  if (input == "." && firstNum.includes(".")) {
    return;
  }
  if (input == "+/-" && dbot.textContent == "") {
    return;
  }
  if (input == "+/-") {
    firstNum = -parseFloat(firstNum);
    firstNum = firstNum.toString();
    dbot.textContent = firstNum;
    return;
  }
  if (input == "back") {
    firstNum = firstNum.split("");
    firstNum.pop();
    firstNum = firstNum.join("");
    dbot.textContent = firstNum;
    return;
  }
  firstNum += input;
  dbot.textContent += input;
}

function secondOps(input) {
  if (secondArg == "" && dbot.textContent != "") {
    dbot.textContent = "";
  }
  if (input == "." && secondArg.includes(".")) {
    return;
  }
  if (input == "+/-" && dbot.textContent == "") {
    return;
  }
  if (input == "+/-") {
    secondArg = -parseFloat(secondArg);
    secondArg = secondArg.toString();
    dbot.textContent = secondArg;
    return;
  }
  secondArg += input;
  dbot.textContent += input;
}

function clearAll() {
  dbot.textContent = "";
  firstNum = "";
  operator = "";
  secondArg = "";
  dtop.textContent = "";
}

digits.forEach((digit) => {
  digit.addEventListener("click", function () {
    if (
      dbot.textContent.includes(" ") &&
      Number.isInteger(parseFloat(digit.textContent))
    ) {
      clearAll();
    }
    if (
      Number.isInteger(parseFloat(digit.textContent)) ||
      digit.textContent == "." ||
      digit.textContent == "+/-" ||
      digit.textContent == "back"
    ) {
      if (operator == "") {
        firstOps(digit.textContent);
      } else if (firstNum != "" && operator != "") {
        secondOps(digit.textContent);
      }
    } else if (
      !Number.isInteger(parseFloat(digit.textContent)) &&
      digit.textContent != "enter" &&
      operator == ""
    ) {
      operator = digit.textContent;
      dbot.textContent = "";
    }
  });
});

// DOM

enter.addEventListener("click", function () {
  if (secondArg == "") {
    dbot.textContent = firstNum;
  } else {
    dbot.textContent = ` ${operate(
      operator,
      parseFloat(firstNum),
      parseFloat(secondArg)
    )}`;
    dtop.textContent = `${firstNum} ${operator} ${secondArg} =`;
    firstNum = operate(operator, parseFloat(firstNum), parseFloat(secondArg));
    secondArg = "";
    operator = "";
  }
});

operations.forEach((operation) => {
  operation.addEventListener("click", function () {
    if (firstNum != "" && secondArg != "") {
      dbot.textContent = "";
      dbot.textContent = `${operate(
        operator,
        parseFloat(firstNum),
        parseFloat(secondArg)
      )}`;
      dtop.textContent = `${firstNum} ${operator} ${secondArg} =`;
      firstNum = operate(operator, parseFloat(firstNum), parseFloat(secondArg));
      secondArg = "";
      operator = operation.textContent;
    }
  });
});

clear.addEventListener("click", function () {
  clearAll();
});
