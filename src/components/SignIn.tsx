import { actions, state } from "../support/types";
import { signInWithGoogle } from "../support/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const SignIn = ({ state, dispatch, validateLogin }: { state: state, dispatch: React.Dispatch<actions>, validateLogin: boolean }) => {
  const login = () => {
    signInWithGoogle().then(res=>dispatch({type: "user", email: res.user.email!, photo: res.user.photoURL!, name: res.user.displayName!}))
  };
  const navigate = useNavigate()

  useEffect(()=>{
    validateLogin&&navigate("/dashboard")
  },[validateLogin, navigate])

  return (
    <>
      <div style={{ height: state.height }} className="flex w-screen">
        <button className="m-auto bg-slate-300 rounded-2xl p-2 text-4xl flex" onClick={login}>
          <p>SIGN IN</p>
          <div className="w-10 ml-3">
            <img src={require("../images/google.png")} alt="" />
          </div>
        </button>
      </div>
    </>
  );
};
