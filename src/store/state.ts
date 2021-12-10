export interface State {
  title: string;
  [property: string]: any;
}

export const state: State = {
  count: 0,
  title: 'Vue(v3) 与 tsx 的结合~'
}
