import { state } from "../support/types";

export const Dashboard = ({ state }: { state: state }) => {
  return (
    <div>
      Welcome <br />
      {state.user.name}
    </div>
  );
};
