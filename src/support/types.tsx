export const initial = { form: { day: "", month: "", fromHours: "", fromMinutes: "", toHours: "", toMinutes: "" }, monthCount: new Date().getMonth() + 12, loading: true, height: window.innerHeight, width: window.innerWidth, sign: true, user: { email: "", photo: "", name: "" } };
export type state = { form: { day: string; month: string; fromHours: string; fromMinutes: string; toHours: string; toMinutes: string }; monthCount: number; loading: boolean; height: number; width: number; sign: boolean; user: { email: string; photo: string; name: string } };

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

type loading = {
  type: "loading";
  value: boolean;
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
export type actions = resize | user | logout | loading | changeMonth | autoInput | input;
