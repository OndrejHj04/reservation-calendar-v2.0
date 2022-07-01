import { useRef } from "react";
import { state } from "../support/types";
import { actions } from "../support/types";
import { Calendar } from "./Calendar";
import { Panel } from "./Panel";
import { Administartion } from "./Administration";
export const Dashboard = ({ state, dispatch, validateInput }: { state: state; dispatch: React.Dispatch<actions>; validateInput: boolean }) => {
  const loading = useRef<HTMLImageElement>(null);
  const month = new Date(new Date().getFullYear(), state.monthCount).toLocaleDateString("cs", { month: "long" });

  return (
    <>
      {state.loading.every((item) => !item) ? (
        <div className="flex" style={{ height: state.height }}>
          <img src={require("../images/load.png")} alt="" className="w-60 m-auto" id="rotate" ref={loading} />
        </div>
      ) : (
        <div style={{ height: state.width > 1024 ? state.height : "", minHeight: state.width > 1024 ? "800px" : "" }} className="flex w-full flex-col lg:flex-row">
          {state.administration ? (
            <Administartion  state={state} dispatch={dispatch}/>
          ) : (
            <>
              <Calendar dispatch={dispatch} state={state} />
              <Panel month={month} state={state} dispatch={dispatch} />
            </>
          )}
        </div>
      )}
    </>
  );
};
