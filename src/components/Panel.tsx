import { useNavigate } from "react-router";
import { actions, state } from "../support/types";

export const Panel = ({ state, dispatch, month }: { state: state; dispatch: React.Dispatch<actions>, month: string }) => {
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "logout" });
    navigate("/");
  };


  return (
    <div className="flex-1 h-full  pb-3 px-3 lg:p-10 lg:pl-0">
      <div className="w-full h-full rounded-3xl p-2 flex flex-col" id="calendar-container">
        <div className="flex">
          <img src={require("../images/right.png")} alt="" className="w-10 rotate-180" onClick={()=>dispatch({type: "change-month", action: "decrease"})}/>
          <h1 className="m-auto lg:text-4xl text-3xl">{month}</h1>
          <img src={require("../images/right.png")} alt="" className="w-10" onClick={()=>dispatch({type: "change-month", action: "increase"})}/>
        </div>

        <div className="text-3xl m-2">
          <div className="flex justify-between flex-wrap">
            <div>
              <label htmlFor="">day:</label>
              <input type="text" className="border-b-2 border-black outline-none w-10 text-center" />
            </div>

            <div>
              <label htmlFor="">month:</label>
              <input type="text" className="border-b-2 border-black outline-none w-32 text-center" />
            </div>
          </div>

          <div className="flex justify-between flex-wrap">
            <div>
              <label htmlFor="">from:</label>
              <input type="text" className="border-b-2 border-black outline-none w-10 text-center" />:
              <input type="text" className="border-b-2 border-black outline-none w-10 text-center" />
            </div>

            <div>
              <label htmlFor="">to:</label>
              <input type="text" className="border-b-2 border-black outline-none w-10 text-center" />:
              <input type="text" className="border-b-2 border-black outline-none w-10 text-center" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll my-2">
            
        </div>

        <div className="flex mt-auto">
          <img src={state.user.photo} alt="" className="rounded-full w-16 my-auto" />
          <p className="text-xl my-auto mx-2 w-full text-center">{state.user.name}</p>
          <img src={require("../images/logout.png")} alt="" className="w-16  ml-auto" onClick={logout} />
        </div>
      </div>
    </div>
  );
};
