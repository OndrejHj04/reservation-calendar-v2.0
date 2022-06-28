import { useNavigate } from "react-router";
import { state } from "../support/types";
import { actions } from "../support/types";
export const Dashboard = ({ state, dispatch }: { state: state, dispatch: React.Dispatch<actions> }) => {
  
  const navigate = useNavigate()
  const logout = () => {
    dispatch({type: "logout"})
    navigate("/")
  }

  return (
    <>
      <div style={{ height: state.height, minHeight: state.width > 1024 ? "800px" : "" }} className="flex w-full flex-col lg:flex-row">
        <div className="lg:w-3/4 w-full lg:h-full min-h-0 lg:p-10 px-3 py-5">
          <div className="w-full h-full rounded-3xl flex flex-col lg:grid grid-rows-5 grid-cols-7 overflow-scroll lg:overflow-hidden bg-slate-300 gap-1" id="calendar-container">
            {[...Array(35)].map((undef, i) => {
              return (
                <div key={i + 1} className="bg-white p-2">
                  <p>{i + 1}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 h-full  pb-3 px-3 lg:p-10 lg:pl-0">
          <div className="w-full h-full rounded-3xl p-2 flex flex-col" id="calendar-container">
            <div className="flex ">
              <img src={require("../images/right.png")} alt="" className="w-10 rotate-180" />
              <h1 className="m-auto lg:text-4xl text-3xl">prosinec</h1>
              <img src={require("../images/right.png")} alt="" className="w-10" />
            </div>

            <div className="flex mt-auto">
              <img src={state.user.photo} alt="" className="rounded-full w-16 my-auto"/>
              <p className="text-xl my-auto mx-2 w-full text-center">{state.user.name}</p>
              <img src={require("../images/logout.png")} alt="" className="w-16  ml-auto" onClick={logout}/>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
