export const initial = { height: window.innerHeight };
export type state = { height: number };

type resize = {
  type: "resize";
};

export type actions = resize;
