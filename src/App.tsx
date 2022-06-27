import { useEffect, useReducer } from "react";
import { SignIn } from "./components/SignIn";
import { actions, initial, state } from "./support/types";
import { Dashboard } from "./components/Dashboard";
const reducer = (state: state, actions: actions) => {
  switch (actions.type) {
    case "resize":
      return { ...state, height: window.innerHeight };
    case "user":
      return { ...state, user: { ...state.user, name: actions.name, email: actions.email, photo: actions.photo } };
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const validateLogin = Object.keys(state.user).every((item) => state.user[item as "name" | "photo" | "email"]?.length);

  useEffect(() => {
    window.addEventListener("resize", () => dispatch({ type: "resize" }));
    dispatch({type: "user", ...JSON.parse(localStorage.getItem("user")!)})
  }, []);

  useEffect(() => {
    validateLogin && localStorage.setItem("user", JSON.stringify(state.user));
  }, [validateLogin, state.user]);

  console.log(state.user)
  return <>{validateLogin ? <Dashboard state={state} /> : <SignIn state={state} dispatch={dispatch} />}</>;
};
