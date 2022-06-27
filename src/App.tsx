import { useEffect, useReducer } from "react";
import { actions, initial, state } from "./support/types";

const reducer = (state: state, actions: actions) => {
  switch (actions.type) {
    case "resize":
      return { height: window.innerHeight };
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    window.addEventListener("resize", () => dispatch({ type: "resize" }));
  }, []);

  return (
    <>
      <section className="w-full bg-red-500" style={{height: state.height}}></section>
    </>
  );
};
