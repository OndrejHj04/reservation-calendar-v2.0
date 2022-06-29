import { state } from "../support/types";

export const Calendar = ({ state }: { state: state }) => {
  // const getYear = () => {
  //   const date = new Date()
  //   if(date.getMonth() < 6){ //JARO
  //     if(state.monthCount-12 < 0){ //PODZIM
  //       return date.getFullYear()-1
  //     }else if(state.monthCount-12 >= 0){ // JARO
  //       return date.getFullYear()
  //     }
  //   }else if(date.getMonth() > 7){ //PODZIM
  //     if(state.monthCount-12 < 0){ //PODZIM
  //       return date.getFullYear()
  //     }else if(state.monthCount-12 >= 0){ // JARO
  //       return date.getFullYear()+1
  //     }
  //   }
  //   return date.getFullYear()
  // }

  return (
    <div className="lg:w-3/4 w-full lg:h-full min-h-0 lg:p-10 px-3 py-5">
      <div className="w-full h-full rounded-3xl flex flex-col lg:grid grid-rows-5 grid-cols-7 overflow-scroll lg:overflow-hidden bg-slate-300 gap-1" id="calendar-container">
        {[...Array(new Date(new Date().getFullYear() - 1, state.monthCount + 1, 0).getDate())].map((undef, i) => {
          return (
            <div key={i + 1} style={{gridColumnStart: i === 0 ? (new Date(new Date().getFullYear() - 1, state.monthCount, 1).getDay().toString() === "0" ? "7" : new Date(new Date().getFullYear() - 1, state.monthCount, 1).getDay().toString()):""}} className={`${i + 1 === new Date().getDate() && new Date().getMonth() + 12 === state.monthCount && "border-b-8 border-red-500"} bg-white p-2 `}>
              <p>{i + 1}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
