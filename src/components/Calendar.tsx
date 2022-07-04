import { actions, state } from "../support/types";

export const Calendar = ({ state, dispatch }: { state: state; dispatch: React.Dispatch<actions> }) => {
  const columnStart = new Date(new Date().getFullYear() - 1, state.monthCount, 1).getDay().toString() === "0" ? "7" : new Date(new Date().getFullYear() - 1, state.monthCount, 1).getDay().toString();



  const click = (day:number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target  as HTMLElement

    !target.classList.contains("bg-red-500") && (state.blockMode ? dispatch({ type: "semiblocked", day: day }) : dispatch({ type: "auto-input", day: day, month: state.monthCount }));
  };

  const highlight = (day:number) => {
    const val = state.blocked.some(item=>item.day === day&&item.month === state.monthCount)
    if(val){
      return "bg-red-500"
    }else{
      return "bg-white"
    }
  }

  const border = (day:number) => {
    const val = state.semiblocked.some(item=>item.day === day&&item.month === state.monthCount)
    if(val){
      return "border-4"
    }else{
      return ""
    }
  }

  return (
    <div className="lg:w-11/12 w-full lg:h-full min-h-0 h-full rounded-full" style={{ height: state.height, minHeight: "540px" }}>
      <div className="w-full h-full flex flex-col lg:grid grid-rows-5 grid-cols-7 overflow-scroll lg:overflow-hidden bg-slate-300 gap-1">
        {[...Array(new Date(new Date().getFullYear() - 1, state.monthCount + 1, 0).getDate())].map((undef, i) => {
          return (
            <div key={i + 1} id={(i + 1).toString()} onClick={(e) => click(i + 1, e)} style={{ gridColumnStart: i === 0 ? columnStart : "" }} className={` flex transition-all border-red-500 ${state.blockMode && "hover:border-4"} ${highlight(i+1)} ${border(i+1)}`}>
              <p className={`${i + 1 === new Date().getDate() && new Date().getMonth() + 12 === state.monthCount ? "bg-red-500" : "bg-gray-500"} w-fit p-2 pt-1 pl-1 text-lg text-white font-semibold rounded-br-full h-min`}>{i + 1}</p>
              <div className="flex flex-col overflow-y-scroll mx-auto">
                {state.calendarData
                  .filter((item) => new Date(new Date().getFullYear(), state.monthCount).toLocaleDateString("cs", { month: "long" }) === item.month && Number(item.day) === i + 1)
                  .map((item) => {
                    return (
                      <p key={item.id}>
                        {item.inputs.fromHours}:{item.inputs.fromMinutes}-{item.inputs.toHours}:{item.inputs.toMinutes}
                      </p>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
