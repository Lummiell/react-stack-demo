import React, { useState, useEffect } from "react";
import "./index.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
enum CheckResult {
  Waiting,
  Valid,
  InvalidClosing,
  InvalidOpening,
  InvalidConvention,
}
enum ValidationColor {
  Waiting = "#4285f4",
  Valid = "#5cb85c",
  Invalid = "#ed4337",
}
enum ValidationType {
  Parentheses,
  All,
}
const ParenthesisChecker = () => {
  const [expression, setExpression] = useState<string>("");
  const [validation, setValidation] = useState<CheckResult>(
    CheckResult.Waiting
  );
  const [message, setMessage] = useState<string>("");
  const [selectedValidationType, setSelectedValidationType] = useState<
    ValidationType
  >(ValidationType.All);
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
  function messageDisplay() {
    switch (validation) {
      case CheckResult.Waiting:
        setMessage("");
        break;
      case CheckResult.Valid:
        setMessage("Expressão válida!");
        break;
      case CheckResult.InvalidClosing:
        setMessage("Expressão inválida: Fechamento inválido");
        break;
      case CheckResult.InvalidOpening:
        setMessage("Expressão inválida: Há alguma abertura sem fechamento");
        break;
      case CheckResult.InvalidConvention:
        setMessage(
          "Expressão inválida: A convenção de { -> [ -> ( não foi respeitada"
        );
        break;
    }
  }
  useEffect(backgroundColorChange, [validation]);
  useEffect(messageDisplay, [validation]);
  function _validateParenthesis(expression: string): CheckResult {
    var parenthStack: string[] = [];
    var expressionCharacters = expression.split("");
    for (let i = 0; i < expressionCharacters.length; i++) {
      const character = expressionCharacters[i];
      if (character === "(") {
        parenthStack.push(character);
      } else {
        if (character === ")") {
          if (parenthStack.length > 0) {
            parenthStack.pop();
          } else {
            return CheckResult.InvalidClosing;
          }
        }
      }
    }
    if (parenthStack.length === 0) {
      return CheckResult.Valid;
    } else {
      return CheckResult.InvalidOpening;
    }
  }
  function _validateAll(expression: string): CheckResult {
    var parenthStack: string[] = [];
    var bracketsStack: string[] = [];
    var curlyStack: string[] = [];

    var expressionCharacters = expression.split("");

    for (let i = 0; i < expressionCharacters.length; i++) {
      const character = expressionCharacters[i];

      switch (character) {
        case "(":
          if (curlyStack.length > 0 && bracketsStack.length === 0) {
            return CheckResult.InvalidConvention;
          }
          if (parenthStack.length > 0) {
            return CheckResult.InvalidConvention;
          }
          parenthStack.push("(");

          break;
        case "[":
          if (parenthStack.length > 0) {
            return CheckResult.InvalidConvention;
          }
          if (bracketsStack.length > 0) {
            return CheckResult.InvalidConvention;
          }
          bracketsStack.push("[");
          break;
        case "{":
          if (parenthStack.length > 0) {
            return CheckResult.InvalidConvention;
          }
          if (bracketsStack.length > 0) {
            return CheckResult.InvalidConvention;
          }
          if (curlyStack.length > 0) {
            return CheckResult.InvalidConvention;
          }
          curlyStack.push("{");
          break;
        case ")":
          if (parenthStack.length === 0) {
            return CheckResult.InvalidClosing;
          }

          parenthStack.shift();
          break;
        case "]":
          if (bracketsStack.length === 0) {
            return CheckResult.InvalidClosing;
          }
          if (parenthStack.length > 0) {
            return CheckResult.InvalidConvention;
          }
          bracketsStack.shift();
          break;
        case "}":
          if (curlyStack.length === 0) {
            return CheckResult.InvalidClosing;
          }
          if (bracketsStack.length > 0) {
            return CheckResult.InvalidConvention;
          }
          if (parenthStack.length > 0) {
            return CheckResult.InvalidConvention;
          }
          curlyStack.shift();
          break;
      }
    }

    if (parenthStack.length !== 0) {
      return CheckResult.InvalidOpening;
    }
    if (bracketsStack.length !== 0) {
      return CheckResult.InvalidOpening;
    }
    if (curlyStack.length !== 0) {
      return CheckResult.InvalidOpening;
    }

    return CheckResult.Valid;
  }
  function validate(): CheckResult {
    switch (selectedValidationType) {
      case ValidationType.All:
        return _validateAll(expression);
      case ValidationType.Parentheses:
        return _validateParenthesis(expression);
    }
  }
  function handleValidation() {
    setValidation(validate());
  }
  function handleChange(value: string) {
    setValidation(CheckResult.Waiting);
    setExpression(value);
  }
  return (
    <div id="checkExpr" className="checkExpr">
      <div className="checkOptions">
        <div onClick={()=>{
          setValidation(CheckResult.Waiting)
          setSelectedValidationType(ValidationType.Parentheses)}}>
          <input
            type="radio"
            id="checkParenthesisOnly"
            name="checkType"
            value="checkParenthesisOnly"
            checked = {selectedValidationType === ValidationType.Parentheses}
          />
          <label htmlFor='checkParenthesisOnly'>Checar apenas parênteses</label>
        </div>
        <div onClick={()=>{
          setValidation(CheckResult.Waiting)
          setSelectedValidationType(ValidationType.All)}}>
          <input type="radio" id="checkAll" name="checkType" value="checkAll" checked = {selectedValidationType === ValidationType.All}/>
          <label htmlFor='checkAll'>Checar tudo</label>
          
        </div>
      </div>
      <div className="checkExprForm">
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
    </div>
  );
};

export default ParenthesisChecker;
