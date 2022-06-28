import { state } from "../support/types";

export const Dashboard = ({ state }: { state: state }) => {
  return (
    <>
      <div style={{ height: state.height, minHeight: state.width>1024?"800px":"" }} className="flex w-full flex-col lg:flex-row">
        <div className="lg:w-3/4 w-full lg:h-full min-h-0 lg:p-10 px-3 py-5">
          <div className="w-full h-full rounded-3xl flex flex-col lg:grid grid-rows-5 grid-cols-7 overflow-scroll lg:overflow-hidden bg-slate-300 gap-1" id="calendar-container">
              {[...Array(35)].map((undef, i)=>{
                return (
                  <div key={i+1} className="bg-white p-2">
                    <p>{i+1}</p>
                  </div>
                )
              })}
          </div>
        </div>

        <div className="flex-1 h-full  pb-3 px-3 lg:p-10">
          <div className="w-full h-full rounded-3xl p-2" id="calendar-container">
            <div className="flex">
              <img src={require("../images/right.png")} alt="" className="w-14 rotate-180" />
              <h1 className="m-auto text-4xl">prosinec</h1>
              <img src={require("../images/right.png")} alt="" className="w-14" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
