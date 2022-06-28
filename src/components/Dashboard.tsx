import { state } from "../support/types";

export const Dashboard = ({ state }: { state: state }) => {
  
  return (
    <>
      {state.width > 1100 ? (
        <div style={{ height: state.height, boxSizing: "border-box" }} className="flex">
          <div className="grid h-full p-10" style={{ aspectRatio: "7/5", minHeight: "500px", minWidth: "700px" }}>
            <div className="grid rounded-3xl grid-cols-7 grid-rows-5 gap-1 overflow-hidden bg-slate-400" id="calendar-container">
              {[...Array(35)].map((undefined, index) => {
                return (
                  <p className="bg-white p-1" key={index + 1}>
                    {index + 1}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex p-10 pl-0">
            <div className="h-full w-full flex flex-col rounded-3xl" id="calendar-container" style={{ minWidth: "275px" }}>
              <div className="flex p-3">
                <img src={require("../images/right.png")} alt="" className="rotate-180 h-14" />
                <h1 className="m-auto text-4xl">listopad</h1>
                <img src={require("../images/right.png")} alt="" className="h-14" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ height: state.height, boxSizing: "border-box" }} className="flex flex-wrap">
          <div className="w-full h-full p-10">
            <div className="w-full h-full rounded-3xl overflow-y-scroll p-3" id="calendar-container">
              {[...Array(35)].map((undefined, index) => {
                return (
                  <div key={index + 1}>
                    <p>{index + 1}</p> <hr />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex p-10 pl-0">
            <div className="h-full w-full flex flex-col rounded-3xl" id="calendar-container" style={{ minWidth: "275px" }}>
              <div className="flex p-3">
                <img src={require("../images/right.png")} alt="" className="rotate-180 h-14" />
                <h1 className="m-auto text-4xl">listopad</h1>
                <img src={require("../images/right.png")} alt="" className="h-14" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


