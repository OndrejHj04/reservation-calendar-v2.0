import { createContext, useRef } from "react";
import { state } from "../support/types";
import { actions } from "../support/types";
import { Calendar } from "./Calendar";
import { Panel } from "./Panel";
import { Administartion } from "./Administration";
export const Dashboard = ({ state, dispatch, checkbox }: { state: state; dispatch: React.Dispatch<actions>; checkbox: React.MutableRefObject<HTMLInputElement> }) => {
  const loading = useRef<HTMLImageElement>(null);

  return (
    <>
      {state.loading.every((item) => !item) ? (
        <div className="flex" style={{ height: state.height }}>
          <img src={require("../images/load.png")} alt="" className="w-60 m-auto" id="rotate" ref={loading} />
        </div>
      ) : (
        <div className="flex flex-row">
          {state.administration ? (
            <Administartion state={state} dispatch={dispatch} />
          ) : (
            <>
              <Calendar dispatch={dispatch} blockMode={state.blockMode} monthCount={state.monthCount} height={state.height} calendarData={state.calendarData} semiblocked={state.semiblocked} blocked={state.blocked} />

              <Panel state={state} dispatch={dispatch} checkbox={checkbox} />
            </>
          )}
        </div>
      )}
    </>
  );
};
