import { useEffect, useReducer } from "react";
import "./Calculator.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && (state.currentOperand || "").includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
      };

    default:
      break;
  }
}

function evaluate({ previousOperand, currentOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      break;
  }
  return computation.toString();
}

function Calculator() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  // console.log(currentOperand);

  // Keyboard events for ACTIONS.ADD_DIGIT
  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      const digit = event.key;
      // console.log(typeof event.key);
      switch (digit) {
        case "1":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;
        case "2":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;
        case "3":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;
        case "4":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;
        case "5":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;
        case "6":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;
        case "7":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;
        case "8":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;
        case "9":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;
        case "0":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;
        case ".":
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
          break;

        default:
          break;
      }
    });
  }, []);

  // Keyboard events for ACTIONS.CHOOSE_OPERATION
  useEffect(() => {
    document.addEventListener("keypress", (event) => {
      const operation = event.key;
      switch (operation) {
        case "+":
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
          break;
        case "-":
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
          break;
        case "*":
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
          break;
        case "/":
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
          break;

        default:
          break;
      }
    });
  }, []);

  // Keyboard events for ACTIONS.EVALUATE
  useEffect(() => {
    document.addEventListener("keypress", (event) => {
      const operation = event.key;
      switch (operation) {
        case "Enter":
          dispatch({ type: ACTIONS.EVALUATE });
          break;

        default:
          break;
      }
    });
  }, []);

  // Keyboard events for ACTIONS.DELETE_DIGIT
  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      const operation = event.key;
      switch (operation) {
        case "Backspace":
          dispatch({ type: ACTIONS.DELETE_DIGIT });
          break;

        default:
          break;
      }
    });
  }, []);

  // Keyboard events for ACTIONS.CLEAR
  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      const operation = event.key;
      switch (operation) {
        case "Escape":
          dispatch({ type: ACTIONS.CLEAR });
          break;

        default:
          break;
      }
    });
  }, []);

  // Calculator component return section
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC<h6>(Esc)</h6>
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
        <h6>
          <svg
            width="24"
            height="15"
            viewBox="0 0 24 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 8.22222L1.16267 8.06558M1.16267 8.06558L7.91913 1.55936C8.2918 1.20049 8.78904 1 9.30641 1H21C22.1046 1 23 1.89543 23 3V12C23 13.1046 22.1046 14 21 14H9.20757C8.74976 14 8.30581 13.8429 7.94985 13.555L1.16267 8.06558Z"
              stroke="black"
            />
            <path d="M10 11L17.5 5M10 5L17.5 11" stroke="black" />
          </svg>
        </h6>
      </button>
      <OperationButton operation="/" dispatch={dispatch}>
        &#247;
      </OperationButton>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default Calculator;
