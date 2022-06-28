import { useEffect, useReducer } from "react";
import { SignIn } from "./components/SignIn";
import { actions, initial, state } from "./support/types";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FourOhFour } from "./support/FourOhFour";
const reducer = (state: state, actions: actions) => {
  switch (actions.type) {
    case "resize":
      return { ...state, height: window.innerHeight, width: window.innerWidth };
    case "user":
      return { ...state, user: { ...state.user, name: actions.name, email: actions.email, photo: actions.photo } };
    case "logout":
      return { ...state, user: initial.user };
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const validateLogin = Object.keys(state.user).every((item) => state.user[item as "name" | "photo" | "email"]?.length);

  useEffect(() => {
    window.addEventListener("resize", () => dispatch({ type: "resize" }));
    dispatch({ type: "user", ...JSON.parse(localStorage.getItem("user")!) });
  }, []);

  useEffect(() => {
    if (validateLogin) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [validateLogin, state.user]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn state={state} dispatch={dispatch} validateLogin={validateLogin} />}></Route>
        <Route path="/dashboard" element={<Dashboard state={state} dispatch={dispatch} validateInput={validateLogin}/>}></Route>
        <Route path="*" element={<FourOhFour/>}/>
      </Routes>
    </BrowserRouter>
  );
};
