import {useEffect, useReducer} from "react";
import validator from "../../Validators/validator";
import "./Input.css";

const inputReducer = (state, action) => {
  switch(action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value , action.validation )
      }
    }
    default :  {
      return state
    }
  }
};

export default function Input(props) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const {value , isValid} = mainInput
  const {id , onInputHandler} = props

  useEffect(() => {
    onInputHandler(id , value , isValid)
  }, [value]);


  const onChangeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      value: e.target.value,
      validation: props.validation,
      isValid: true
    })
  };
  
  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${mainInput.isValid ? 'success' : 'error'}`}
        onChange={(e) => onChangeHandler(e)}
        value={mainInput.value}
      />
    ) : (
      <textarea
        placeholder={props.placeholder}
        className={`${props.className} ${mainInput.isValid ? 'success' : 'error'}`}
        onChange={(e) => onChangeHandler(e)}
        value={mainInput.value}
      />
    );
  return <div>{element}</div>;
}
