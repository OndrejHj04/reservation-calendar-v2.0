import { useEffect, useReducer } from "react";
import { SignIn } from "./components/SignIn";
import { actions, form, initial, state } from "./support/types";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FourOhFour } from "./support/FourOhFour";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
const firebaseConfig = {
  apiKey: "AIzaSyCWBAGCwPFPHi_RNYApa8n-mFCt1lprG-4",
  authDomain: "reservation-calendar-3a139.firebaseapp.com",
  projectId: "reservation-calendar-3a139",
  storageBucket: "reservation-calendar-3a139.appspot.com",
  messagingSenderId: "5681576630",
  appId: "1:5681576630:web:f6263c44d9233589998417",
};
initializeApp(firebaseConfig);
const db = getFirestore();

const reducer = (state: state, actions: actions) => {
  switch (actions.type) {
    case "resize":
      return { ...state, height: window.innerHeight, width: window.innerWidth };
    case "user":
      return { ...state, user: { ...state.user, name: actions.name ? actions.name : "", email: actions.email ? actions.email : "", photo: actions.photo ? actions.photo : "" } };
    case "logout":
      return { ...state, user: initial.user };
    case "loading":
      return { ...state, loading: actions.value };
    case "change-month":
      const validMonth = () => {
        if (actions.action === "increase" && state.monthCount < 17) {
          return state.monthCount + 1;
        } else if (actions.action === "decrease" && state.monthCount > 8) {
          return state.monthCount - 1;
        }
        return state.monthCount;
      };

      return { ...state, monthCount: validMonth() };
    case "auto-input":
      return { ...state, form: { ...state.form, day: actions.day.toString(), month: new Date(new Date().getFullYear(), actions.month).toLocaleDateString("cs", { month: "long" }) } };
    case "input":
      return { ...state, form: { ...state.form, [actions.name]: actions.value }, error: "" };
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const validateLogin = Object.keys(state.user).every((item) => state.user[item as "name" | "photo" | "email"]?.length);

  const navigation = useNavigate();
  useEffect(() => {
    window.addEventListener("resize", () => dispatch({ type: "resize" }));
    dispatch({ type: "user", ...JSON.parse(localStorage.getItem("user")!) });
  }, []);

  useEffect(() => (validateLogin ? (localStorage.setItem("user", JSON.stringify(state.user)), navigation("/dashboard")) : (localStorage.removeItem("user"), navigation("/"))), [validateLogin, state.user, navigation]);

  return (
    <Routes>
      <Route path="/" element={<SignIn state={state} dispatch={dispatch} validateLogin={validateLogin} />}></Route>
      <Route path="/dashboard" element={<Dashboard state={state} dispatch={dispatch} validateInput={validateLogin} />}></Route>
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
};
