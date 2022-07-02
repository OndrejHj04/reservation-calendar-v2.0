import React, { useEffect } from "react";
import { actions, state } from "../support/types";

export const Administartion = ({ state, dispatch }: { state: state; dispatch: React.Dispatch<actions> }) => {
  useEffect(() => {}, []);

  return (
    <div style={{ height: state.height }} className="flex flex-col w-full p-2">
      <img src={require("../images/close.png")} alt="" className="w-14 right-2 top-2 absolute" onClick={() => dispatch({ type: "administration" })} />
      <h1 className="text-4xl font-semibold">Požadavky</h1>
      <div className="flex flex-wrap">
        {state.administartionData.length?state.administartionData.map((item) => {
          return (
            <div key={item.id} className="grid grid-rows-2 grid-cols-2 p-3 rounded-2xl m-2 text-xl" id="calendar-container" >
              <p className="my-auto">{item.name}</p>
              <div className="flex justify-around">
                <img src={require("../images/close.png")} alt="" className="w-10" onClick={()=>dispatch({type: "set-to-calendar", item: item, act: false})}/>
                <img src={require("../images/accept.png")} alt="" className="w-10" onClick={()=>dispatch({type: "set-to-calendar", item: item, act:true})}/>
              </div>
              <p className="my-auto">{item.day}. {item.month}</p>
              <p className="my-auto">{item.inputs.fromHours}:{item.inputs.fromMinutes} - {item.inputs.toHours}:{item.inputs.toMinutes}</p>
            </div>
          );
        }):<h1>žádné požadavky k vyřízení</h1>}
      </div>

      <h1 className="text-4xl font-semibold">Zarazervované termíny</h1>
      <div className="flex flex-wrap">
        {state.calendarData.map((item) => {
          return (
            <div key={item.id} className="grid grid-rows-2 grid-cols-2 p-3 rounded-2xl m-2 text-xl" id="calendar-container" >
              <p className="my-auto col-span-full">{item.name}</p>
              <p className="my-auto">{item.day}. {item.month}</p>
              <p className="my-auto">{item.inputs.fromHours}:{item.inputs.fromMinutes} - {item.inputs.toHours}:{item.inputs.toMinutes}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
