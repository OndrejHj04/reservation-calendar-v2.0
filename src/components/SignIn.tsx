import { actions, state } from "../support/types";
import { signInWithGoogle } from "../support/firebase";
export const SignIn = ({ state, dispatch }: { state: state, dispatch: React.Dispatch<actions> }) => {

  const login = () => {
    signInWithGoogle().then(res=>dispatch({type: "user", email: res.user.email!, photo: res.user.photoURL!, name: res.user.displayName!}))
  };

  return (
    <>
      <div style={{ height: state.height }} className="flex w-screen">
        <div className="m-auto bg-slate-300 rounded-2xl p-2 text-4xl flex cursor-pointer" onClick={login}>
          <p>SIGN IN</p>
          <div className="w-10 ml-3">
            <img src={require("../images/google.png")} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
