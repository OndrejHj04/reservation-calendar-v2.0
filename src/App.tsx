import { useEffect, useReducer, useRef } from "react";
import { SignIn } from "./components/SignIn";
import { actions, form, initial, state } from "./support/types";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FourOhFour } from "./support/FourOhFour";
import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, query, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
const firebaseConfig = {
  apiKey: "AIzaSyCWBAGCwPFPHi_RNYApa8n-mFCt1lprG-4",
  authDomain: "reservation-calendar-3a139.firebaseapp.com",
  projectId: "reservation-calendar-3a139",
  storageBucket: "reservation-calendar-3a139.appspot.com",
  messagingSenderId: "5681576630",
  appId: "1:5681576630:web:f6263c44d9233589998417",
};
const openHour = 8;
const closingHour = 19;
const dayMinutes = (closingHour - openHour) * 60;
initializeApp(firebaseConfig);
export const db = getFirestore();
const validateSubmit = (form: form) => {
  const condition1 = form.day.length && form.month.length && Object.keys(form.inputs).every((item) => form.inputs[(item as "fromHours", "toHours", "fromMinutes", "toMinutes")].length); //each item should have at least some length
  const condition2 = Number(form.inputs.fromHours) > 7 && Number(form.inputs.toHours) > 7 && Number(form.inputs.fromHours) < 19 && Number(form.inputs.toHours) < 19; //hours must be between 8 and 18
  const condition3 = Number(form.inputs.fromMinutes) > -1 && Number(form.inputs.toMinutes) > -1 && Number(form.inputs.fromMinutes) < 60 && Number(form.inputs.toMinutes) < 60; //seconds must be between 0 and  59
  const condition4 = (Number(form.inputs.toHours) - Number(form.inputs.fromHours)) * 60 + (Number(form.inputs.toMinutes) - Number(form.inputs.fromMinutes)) >= 30;
  const condition5 = form.inputs.fromMinutes.length > 1 && form.inputs.toMinutes.length > 1;
  return Boolean(condition1 && condition2 && condition3 && condition4 && condition5);
};
const timeColisions = (form: form, state: state) => {
  const formBefore = (Number(form.inputs.fromHours) - openHour) * 60 + Number(form.inputs.fromMinutes);
  const formAfter = (closingHour - Number(form.inputs.toHours)) * 60 - Number(form.inputs.toMinutes);
  const formDuration = dayMinutes - formAfter - formBefore;

  return state.calendarData.every((item) => {
    const itemBefore = (Number(item.inputs.fromHours) - openHour) * 60 + Number(item.inputs.fromMinutes);
    const itemAfter = (closingHour - Number(item.inputs.toHours)) * 60 - Number(item.inputs.toMinutes);

    if (item.day === form.day && item.month === form.month) {
      if (formBefore + formDuration <= itemBefore || formAfter + formDuration <= itemAfter) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  });
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
      return { ...state, message: "", form: { ...state.form, name: state.user.name, day: actions.day.toString(), month: new Date(new Date().getFullYear(), actions.month).toLocaleDateString("cs", { month: "long" }) }, focus: initial.focus };
    case "input":
      return { ...state, form: { ...state.form, inputs: { ...state.form.inputs, [actions.name]: actions.value } }, message: "" };
    case "focus":
      return { ...state, focus: actions.id };
    case "submit":
      if (actions.checkbox.current.checked && validateSubmit(state.form) && timeColisions(state.form, state)) {
        const id = nanoid();
        setDoc(doc(db, "waiting-for-accept", id), {
          ...state.form,
          id: id,
        });
        return { ...state, form: initial.form, message: "Úspěšně odesláno!" };
      } else {
        return { ...state, message: "Termíny lze rezervovat od 8 do 18 hodin a nejméně na 30 minut." };
      }

    case "administartion-data":
      return { ...state, administartionData: actions.data, loading: [...state.loading, true] };
    case "administration":
      return { ...state, administration: !state.administration, message: "" };
    case "set-to-calendar":
      actions.act &&
        timeColisions(actions.item, state) &&
        setDoc(doc(db, "accepted", actions.item.id.toString()), {
          ...actions.item,
        });
      deleteDoc(doc(db, "waiting-for-accept", actions.item.id.toString()));

      return state;
    case "calendar-data":
      return { ...state, calendarData: actions.data, loading: [...state.loading, true] };

    case "block-mode":
      actions.act &&
        state.semiblocked.forEach((item) => {
          const id = nanoid();
          setDoc(doc(db, "blocked", id), {
            ...item,
            id: id,
          });
        });

      return { ...state, administration: false, blockMode: !state.blockMode, semiblocked: initial.semiblocked };

    case "semiblocked":
      const check = state.semiblocked.some((item) => JSON.stringify(item) === JSON.stringify({ day: actions.day, month: state.monthCount }));
      return { ...state, semiblocked: !check ? [...state.semiblocked, { day: actions.day, month: state.monthCount }] : state.semiblocked };

    case "set-blocked":
      return { ...state, blocked: actions.data };
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const checkbox = useRef<HTMLInputElement>(null!);
  
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
    const q = query(collection(db, "accepted"));
    onSnapshot(q, (item) => {
      let arr: form[] = [];
      item.forEach((doc) => arr.push(doc.data() as form));
      dispatch({ type: "calendar-data", data: arr });
    });

    onSnapshot(collection(db, "blocked"), (item) => {
      interface structure {
        day: number;
        month: number;
        id: string;
      }
      let arr: structure[] = [];
      item.forEach((doc) => {
        arr.push(doc.data() as structure);
      });

      dispatch({ type: "set-blocked", data: arr });
    });
  }, []);

  useEffect(() => {
    state.calendarData.forEach((calendar) => {
      state.blocked.forEach((block) => {
        Number(calendar.day) === block.day && calendar.month === new Date(new Date().getFullYear(), block.month).toLocaleDateString("cs", { month: "long" }) && deleteDoc(doc(db, "accepted", calendar.id.toString()));
      });
    });
  }, [state.blocked, state.calendarData]);

  useEffect(() => (validateLogin ? (localStorage.setItem("user", JSON.stringify(state.user)), navigation("/dashboard")) : (localStorage.removeItem("user"), navigation("/"))), [validateLogin, state.user, navigation]);

  return (
    <Routes>
      <Route path="/" element={<SignIn state={state} dispatch={dispatch} validateLogin={validateLogin} />}></Route>
      <Route path="/dashboard" element={<Dashboard state={state} dispatch={dispatch} checkbox={checkbox} />}></Route>
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
};
