export const Calendar = () => {
  return (
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
  );
};
