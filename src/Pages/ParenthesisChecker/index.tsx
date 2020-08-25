import React, { useState } from "react";
import "./index.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
enum CheckStatus {
  Awaiting,
  Valid,
  Invalid,
}

const ParenthesisChecker = () => {
  const [expression, setExpression] = useState<string>("");
  const [validation, setValidation] = useState<CheckStatus>(
    CheckStatus.Awaiting
  );

  function validate(expression: string): CheckStatus {
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
            return CheckStatus.Invalid;
          }
        }
      }
    }
    return stack.length === 0 ? CheckStatus.Valid : CheckStatus.Invalid;
  }
  function handleValidation() {
    const valid = validate(expression);
    const bgElement = document.getElementById("checkExpr");
    setValidation(valid);
    if (bgElement) {
      if (valid === CheckStatus.Invalid) {
        bgElement.style.backgroundColor = "#ed4337";
      } else {
        bgElement.style.backgroundColor = "#5cb85c";
      }
    }
  }
  function handleChange(value: string) {
    setValidation(CheckStatus.Awaiting);
    setExpression(value);
    const bgElement = document.getElementById("checkExpr");
    if(bgElement){
      bgElement.style.backgroundColor = "#4285f4";
    }
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
      <p className="resultText">
        {validation === CheckStatus.Awaiting
          ? " "
          : validation === CheckStatus.Valid
          ? "Expressão válida"
          : "Expressão inválida"}
      </p>
    </div>
  );
};

export default ParenthesisChecker;
