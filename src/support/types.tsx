export const initial = { loading: true, height: window.innerHeight, width: window.innerWidth, sign: true, user: {email: "", photo: "", name: ""} };
export type state = { loading: boolean, height: number, width: number,  sign: boolean, user: {email: string, photo: string, name: string} };

type resize = {
  type: "resize";
};

type user = {
  type: "user",
  email: string,
  photo: string,
  name: string
}

type logout = {
  type: "logout"
}

type loading = {
  type: "loading",
  value: boolean
}
export type actions = resize | user | logout | loading;
