import { useNavigate } from "react-router";
import { actions, state } from "../support/types";

export const Panel = ({ state, dispatch, month, checkbox }: { state: state; dispatch: React.Dispatch<actions>; month: string, checkbox: React.MutableRefObject<HTMLInputElement> }) => {
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "logout" });
    navigate("/");
  };

  return (
    <div className="flex-1 h-full text-2xl p-2" style={{ height: "auto", minHeight: state.height }}>
      <div className="sm:w-full h-full flex flex-col py-1" id="calendar-container">
        <div className="flex justify-between">
          <img src={require("../images/next.png")} alt="" className="w-6 h-8 rotate-180" onClick={() => dispatch({ type: "change-month", action: "decrease" })} />
          <h1 className="mx-auto my-auto text-xl">{month}</h1>

          <img src={require("../images/next.png")} alt="" className="w-6 h-8" onClick={() => dispatch({ type: "change-month", action: "increase" })} />
        </div>

        <div className=" m-2">
          <div className="flex justify-between flex-col">
            <div className="">
              <label htmlFor="">den:</label>
              <input type="text" className="border-b-2 border-black outline-none w-full text-center" readOnly value={state.form.day} />
            </div>

            <div className="">
              <label htmlFor="">měsíc:</label>
              <input type="text" className="border-b-2 border-black outline-none w-full text-center" readOnly value={state.form.month} />
            </div>
          </div>

          <div className="flex justify-between flex-wrap">
            <div className="">
              <label htmlFor="">od:</label>
              <div className="flex">
                <input type="number" onClick={() => dispatch({ type: "focus", id: 0 })} className="border-b-2 border-black outline-none w-14 text-center" name="fromHours" onChange={(e) => dispatch({ type: "input", name: e.target.name, value: e.target.value })} value={state.form.inputs.fromHours} />
                :
                <input type="number" onClick={() => dispatch({ type: "focus", id: 1 })} className="border-b-2 border-black outline-none w-14 text-center" name="fromMinutes" onChange={(e) => dispatch({ type: "input", name: e.target.name, value: e.target.value })} value={state.form.inputs.fromMinutes} />
              </div>
            </div>

            <div className="">
              <label htmlFor="">do:</label>
              <div className="flex">
                <input type="number" onClick={() => dispatch({ type: "focus", id: 2 })} className="border-b-2 border-black outline-none w-14 text-center" name="toHours" onChange={(e) => dispatch({ type: "input", name: e.target.name, value: e.target.value })} value={state.form.inputs.toHours} />
                :
                <input type="number" onClick={() => dispatch({ type: "focus", id: 3 })} className="border-b-2 border-black outline-none w-14 text-center" name="toMinutes" onChange={(e) => dispatch({ type: "input", name: e.target.name, value: e.target.value })} value={state.form.inputs.toMinutes} />
              </div>
            </div>
          </div>
          <div className="flex my-1">
            <label htmlFor="checkbox" style={{fontSize: "16px", lineHeight: "18px"}} className="cursor-pointer">
              Souhlasím s podmínkami
            </label>
            <input id="checkbox" type="checkbox" className="my-auto m-3" ref={checkbox}/>
          </div>

          <div className="w-full flex lg:my-3 my-0 mt-1">
            <button onClick={() => dispatch({ type: "submit", checkbox: checkbox })} className="transition-all hover:scale-105 bg-blue-400 px-2 py-1 mx-auto rounded-2xl">
              submit
            </button>
          </div>
        </div>

        {false && <p data-cy="message" className="text-red-500" style={{ fontSize: "17px", lineHeight: "17px", letterSpacing: "1.3px" }}></p>}

        <div className="w-full text-red-500 " style={{ fontSize: state.height > 600 ? "16px" : "13px", lineHeight: "16px" }}>
          {state.message}
        </div>

        <div className="flex mt-auto flex-col text-lg text-center p-1">
          <p>{state.user.name}</p>
          <hr />

          <p className={`cursor-pointer ${state.administartionData.length ? "bg-red-500 text-white font-semibold" : ""}`} onClick={() => dispatch({ type: "administration" })}>
            Administrace
          </p>

          <hr />
          <p className="cursor-pointer" onClick={logout}>
            Odhlásit se
          </p>
        </div>
      </div>
    </div>
  );
};
