import { useNavigate } from "react-router";
import { actions, state } from "../support/types";

export const Panel = ({ state, dispatch, month }: { state: state; dispatch: React.Dispatch<actions>; month: string }) => {
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "logout" });
    navigate("/");
  };
  
  return (
    <div className="flex-1 h-full p-1 lg:p-10 lg:pl-0">
      <div className="w-full h-full rounded-3xl p-2 flex flex-col" id="calendar-container">
        <div className="flex flex-wrap">
          <img src={require("../images/right.png")} alt="" className="w-10 rotate-180" onClick={() => dispatch({ type: "change-month", action: "decrease" })} />
          <h1 className="m-auto lg:text-4xl text-3xl">{month}</h1>
          <img src={require("../images/right.png")} alt="" className="w-10" onClick={() => dispatch({ type: "change-month", action: "increase" })} />
        </div>

        <div className="text-3xl m-2">
          <div className="flex justify-between sm:flex-row flex-col flex-wrap">
            <div className="flex">
              <label htmlFor="">day:</label>&nbsp;
              <input type="text" className="border-b-2 border-black outline-none w-14 text-center ml-auto" readOnly value={state.form.day} />
            </div>

            <div className="flex">
              <label htmlFor="">month:</label>&nbsp;
              <input type="text" className="border-b-2 border-black outline-none w-40 text-center ml-auto" readOnly value={state.form.month} />
            </div>
          </div>

          <div className="flex justify-between sm:flex-row flex-col">
            <div className="flex">
              <label htmlFor="">from:</label>&nbsp;
              <input type="number" onClick={() => dispatch({ type: "focus", id: 0 })} className="border-b-2 border-black outline-none w-14 text-center ml-auto" name="fromHours" onChange={(e) => dispatch({ type: "input", name: e.target.name, value: e.target.value })} value={state.form.inputs.fromHours} />
              &nbsp;:&nbsp;
              <input type="number" onClick={() => dispatch({ type: "focus", id: 1 })} className="border-b-2 border-black outline-none w-14 text-center" name="fromMinutes" onChange={(e) => dispatch({ type: "input", name: e.target.name, value: e.target.value })} value={state.form.inputs.fromMinutes} />
            </div>

            <div className="flex">
              <label htmlFor="">to:</label>&nbsp;
              <input type="number" onClick={() => dispatch({ type: "focus", id: 2 })} className="border-b-2 border-black outline-none w-14 text-center ml-auto" name="toHours" onChange={(e) => dispatch({ type: "input", name: e.target.name, value: e.target.value })} value={state.form.inputs.toHours} />
              &nbsp;:&nbsp;
              <input type="number" onClick={() => dispatch({ type: "focus", id: 3 })} className="border-b-2 border-black outline-none w-14 text-center" name="toMinutes" onChange={(e) => dispatch({ type: "input", name: e.target.name, value: e.target.value })} value={state.form.inputs.toMinutes} />
            </div>
          </div>
          <button onClick={() => dispatch({ type: "submit" })}>submit</button>
        </div>
        {!!state.message.length && <p data-cy="message">{state.message}</p>}
        <div className="flex-1 overflow-y-scroll my-2"></div>

        <div className="flex mt-auto">
          <img src={state.user.photo} alt="" className="rounded-full w-16 my-auto" />
          <p className="text-xl my-auto mx-1 flex-1 text-center">{state.user.name}</p>
          <div className="w-12 flex relative">
            <p className="absolute bg-red-500 px-2 rounded-full text-white font-semibold bottom-0 -right-2">{state.administartionData.length}</p>
            <img src={require("../images/warning.png")} alt="" className="w-12 my-auto" onClick={() => dispatch({ type: "administration" })} />
          </div>
          <img src={require("../images/logout.png")} alt="" className="w-16  ml-auto" onClick={logout} />
        </div>
      </div>
    </div>
  );
};
