import React, { useEffect } from "react";
import { actions, state } from "../support/types";

export const Administartion = ({ state, dispatch }: { state: state; dispatch: React.Dispatch<actions> }) => {
  useEffect(() => {}, []);

  return (
    <div style={{ height: state.height }} className="flex flex-col w-full">
      <img src={require("../images/close.png")} alt="" className="w-14 ml-auto" onClick={() => dispatch({ type: "administration" })} />
      <h1 className="text-4xl font-semibold">Requests</h1>
      <div className="flex flex-wrap">
        {state.administartionData.map((item) => {
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
        })}
      </div>
    </div>
  );
};
