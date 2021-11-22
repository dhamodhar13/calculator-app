import { ACTIONS } from "./Calculator";

export default function DigitButton({ digit, dispatch }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      onKeyUp={(event) => {
        switch (event.key) {
          case "1":
            dispatch({ type: ACTIONS.ADD_DIGIT, payload: event.key });
            break;

          default:
            break;
        }
      }}
    >
      {digit}
    </button>
  );
}
