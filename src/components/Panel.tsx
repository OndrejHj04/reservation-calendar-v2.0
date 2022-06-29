import { useNavigate } from "react-router";
import { actions, state } from "../support/types";

export const Panel = ({ state,dispatch }: { state: state, dispatch:React.Dispatch<actions> }) => {
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "logout" });
    navigate("/");
  };

  return (
    <div className="flex-1 h-full  pb-3 px-3 lg:p-10 lg:pl-0">
      <div className="w-full h-full rounded-3xl p-2 flex flex-col" id="calendar-container">
        <div className="flex ">
          <img src={require("../images/right.png")} alt="" className="w-10 rotate-180" />
          <h1 className="m-auto lg:text-4xl text-3xl">prosinec</h1>
          <img src={require("../images/right.png")} alt="" className="w-10" />
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
