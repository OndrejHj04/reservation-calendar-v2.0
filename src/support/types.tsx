export type form = { day: string; month: string; name: string, id:number, inputs: { fromHours: string; fromMinutes: string; toHours: string; toMinutes: string } };

export const initial = { semiblocked: [], blockedDays: [], blockMode: false, calendarData: [], administration: false, administartionData: [], message: "", focus: 0, form: { id: 0, day: "", month: "", name: "", inputs: { fromHours: "", fromMinutes: "", toHours: "", toMinutes: "" } }, monthCount: new Date().getMonth() + 12, loading: [], height: window.innerHeight, width: window.innerWidth, sign: true, user: { email: "", photo: "", name: "" } };
export type state = { semiblocked:{day: number, month: string}[],  blockedDays: {day: number, month: string}[], blockMode: boolean, calendarData: form[], administration:boolean, administartionData: form[], message: string; focus: number; form: form; monthCount: number; loading: boolean[]; height: number; width: number; sign: boolean; user: { email: string; photo: string; name: string } };
type resize = {
  type: "resize";
};

type user = {
  type: "user";
  email: string;
  photo: string;
  name: string;
};

type logout = {
  type: "logout";
};

type changeMonth = {
  type: "change-month";
  action: "increase" | "decrease";
};

type input = {
  type: "input";
  name: string;
  value: string;
};

type autoInput = {
  type: "auto-input";
  day: number;
  month: number;
};

type focus = {
  type: "focus";
  id: number;
};

type submit = {
  type: "submit";
  checkbox: React.MutableRefObject<HTMLInputElement>
};

type administartionData = {
  type: "administartion-data",
  data: form[]
}

type administartion = {
  type: "administration"
}

type setToCalendar = {
  type: "set-to-calendar",
  item: form,
  act: boolean
}

type  calendarData = {
  type:  "calendar-data",
  data: form[]
}

type blockMode = {
  type: "block-mode"
}

type semiblocked = {
  type: "semiblocked",
  date: {day: number, month: string}
}
export type actions = resize | user | logout | changeMonth | autoInput | input | focus | submit | administartionData | administartion | setToCalendar | calendarData | blockMode  | semiblocked;
