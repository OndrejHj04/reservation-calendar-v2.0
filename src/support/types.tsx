export const initial = { monthCount: new Date().getMonth() + 12, loading: true, height: window.innerHeight, width: window.innerWidth, sign: true, user: { email: "", photo: "", name: "" } };
export type state = { monthCount: number; loading: boolean; height: number; width: number; sign: boolean; user: { email: string; photo: string; name: string } };

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
export type actions = resize | user | logout | loading | changeMonth;
