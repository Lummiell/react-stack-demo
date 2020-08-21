import React, { useState } from "react";

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

  function validate(expression:string):CheckStatus {
    var stack:string[] = [];
    var expressionCharacters = expression.split('')
    for (let i = 0; i < expressionCharacters.length; i++) {
      const character = expressionCharacters[i];
      if(character==="("){
        stack.push(character)
      }else{
        if(character===")"){
          if(stack.length>0){
            stack.pop()
          }
          else{
            return CheckStatus.Invalid
          }
        }
      }
    }
    return stack.length===0 ? CheckStatus.Valid : CheckStatus.Invalid
  }
  return (
    <>
    <form onSubmit={(e)=>{
      e.preventDefault()
      setValidation(validate(expression))
    }}>
    <input
        type="text"
        onChange={(e) => {
          setValidation(CheckStatus.Awaiting)
          setExpression(e.target.value);
        }}
      />
      <button
        type="submit"
      >
        Validar
      </button>
    </form>
      <p>
        {validation === CheckStatus.Awaiting
          ? ""
          : validation === CheckStatus.Valid
          ? "Expressão válida"
          : "Expressão inválida"}
      </p>
    </>
  );
};

export default ParenthesisChecker;
