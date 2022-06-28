export const initial = { height: window.innerHeight, width: window.innerWidth, sign: true, user: {email: "", photo: "", name: ""} };
export type state = { height: number, width: number,  sign: boolean, user: {email: string, photo: string, name: string} };

type resize = {
  type: "resize";
};

type user = {
  type: "user",
  email: string,
  photo: string,
  name: string
}
export type actions = resize | user;
