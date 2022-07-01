import { useEffect, useReducer } from "react";
import { SignIn } from "./components/SignIn";
import { actions, form, initial, state } from "./support/types";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FourOhFour } from "./support/FourOhFour";
import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
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
const validateSubmit = (form: form) => {
  const condition1 = form.day.length && form.month.length && Object.keys(form.inputs).every((item) => form.inputs[(item as "fromHours", "toHours", "fromMinutes", "toMinutes")].length); //each item should have at least some length
  const condition2 = Number(form.inputs.fromHours) > 7 && Number(form.inputs.toHours) > 7 && Number(form.inputs.fromHours) < 19 && Number(form.inputs.toHours) < 19; //hours must be between 8 and 18
  const condition3 = Number(form.inputs.fromMinutes) > -1 && Number(form.inputs.toMinutes) > -1 && Number(form.inputs.fromMinutes) < 59 && Number(form.inputs.toMinutes) < 59; //seconds must be between 0 and  59
  const condition4 = (Number(form.inputs.toHours) - Number(form.inputs.fromHours)) * 60 + (Number(form.inputs.toMinutes) - Number(form.inputs.fromMinutes)) >= 30;

  return Boolean(condition1 && condition2 && condition3 && condition4);
};
const reducer = (state: state, actions: actions) => {
  switch (actions.type) {
    case "resize":
      return { ...state, height: window.innerHeight, width: window.innerWidth };
    case "user":
      return { ...state, user: { ...state.user, name: actions.name ? actions.name : "", email: actions.email ? actions.email : "", photo: actions.photo ? actions.photo : "" } };
    case "logout":
      return { ...state, user: initial.user };
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
      state.width < 1024 && window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return { ...state, form: { ...state.form, name: state.user.name, day: actions.day.toString(), month: new Date(new Date().getFullYear(), actions.month).toLocaleDateString("cs", { month: "long" }) }, focus: initial.focus };
    case "input":
      return { ...state, form: { ...state.form, inputs: { ...state.form.inputs, [actions.name]: actions.value } } };
    case "focus":
      return { ...state, focus: actions.id };
    case "submit":
      if (validateSubmit(state.form)) {
        const id = nanoid();
        setDoc(doc(db, "waiting-for-accept", id), {
          ...state.form,
          id: id,
        });
        return { ...state, form: initial.form, message: "Úspěšně odesláno!" };
      } else {
        return { ...state, message: "Termíny lze rezervovat od 8 do 18 hodin včetně a nejméně na 30 minut." };
      }
    case "administartion-data":
      return { ...state, administartionData: actions.data, loading: [...state.loading, true] };
    case "administration":
      return { ...state, administration: !state.administration };
    case "set-to-calendar":
      actions.act &&
        setDoc(doc(db, "accepted", actions.item.id.toString()), {
          ...actions.item,
        });
      deleteDoc(doc(db, "waiting-for-accept", actions.item.id.toString()));

      if (state.administartionData.length === 1) {
        return { ...state, administration: false };
      } else {
        return { ...state };
      }

    case "calendar-data":
      return { ...state, calendarData: actions.data, loading: [...state.loading, true] };
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const validateLogin = Object.keys(state.user).every((item) => state.user[item as "name" | "photo" | "email"]?.length);
  const navigation = useNavigate();
  useEffect(() => {
    window.addEventListener("resize", () => dispatch({ type: "resize" }));
    dispatch({ type: "user", ...JSON.parse(localStorage.getItem("user")!) });

    onSnapshot(collection(db, "waiting-for-accept"), (item) => {
      let arr: form[] = [];
      item.forEach((doc) => arr.push(doc.data() as form));
      dispatch({ type: "administartion-data", data: arr });
    });

    onSnapshot(collection(db, "accepted"), (item) => {
      let arr: form[] = [];
      item.forEach((doc) => arr.push(doc.data() as form));
      dispatch({ type: "calendar-data", data: arr });
    });
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
