import React, { useState, useEffect } from "react";
import "./index.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
enum CheckResult {
  Waiting,
  Valid,
  InvalidClosing,
  InvalidOpening,
}
enum ValidationColor {
  Waiting = "#4285f4",
  Valid = "#5cb85c",
  Invalid = "#ed4337",
}

const ParenthesisChecker = () => {
  const [expression, setExpression] = useState<string>("");
  const [validation, setValidation] = useState<CheckResult>(
    CheckResult.Waiting
  );
  const [message,setMessage] = useState<string>('');
  function backgroundColorChange() {
    const bgElement = document.getElementById("checkExpr");
    if (bgElement) {
      let color;
      switch (validation) {
        case CheckResult.Waiting:
          color = ValidationColor.Waiting;
          break;
        case CheckResult.Valid:
          color = ValidationColor.Valid;
          break;
        default:
          color = ValidationColor.Invalid;
          break;
      }
      bgElement.style.backgroundColor = color;
    }
  }
  function messageDisplay(){
    switch (validation) {
      case CheckResult.Waiting:
        setMessage('');
        break;
      case CheckResult.Valid:
        setMessage('Expressão válida!');
        break;
      case CheckResult.InvalidClosing:
        setMessage('Expressão inválida: Fechamento inválido de parênteses')
        break;
        case CheckResult.InvalidOpening:
        setMessage('Expressão inválida: Muitos abre-parênteses');
        break;
    }
  }
  useEffect(backgroundColorChange,[validation])
  useEffect(messageDisplay,[validation])
  function validate(expression: string): CheckResult {
    var stack: string[] = [];
    var expressionCharacters = expression.split("");
    for (let i = 0; i < expressionCharacters.length; i++) {
      const character = expressionCharacters[i];
      if (character === "(") {
        stack.push(character);
      } else {
        if (character === ")") {
          if (stack.length > 0) {
            stack.pop();
          } else {
            return CheckResult.InvalidClosing;
          }
        }
      }
    }
    if (stack.length === 0) {

      return CheckResult.Valid;
    } else {
      return CheckResult.InvalidOpening;
    }
  }

  function handleValidation() {
    setValidation(validate(expression));
  }
  function handleChange(value: string) {
    setValidation(CheckResult.Waiting);
    setExpression(value);
  }
  return (
    <div id="checkExpr" className="checkExpr">
      <p>Digite algo como "(3-2)+(3*4)+1"</p>
      <form
        className="formContainer"
        onSubmit={(e) => {
          e.preventDefault();
          handleValidation();
        }}
      >
        <input
          className="inputExpr"
          type="text"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        <button type="submit" className="btnSubmit">
          <ChevronRightIcon fontSize="inherit" />
        </button>
      </form>
        <p className="resultText">{message}</p>
    </div>
  );
};

export default ParenthesisChecker;
