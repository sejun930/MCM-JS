import { MutableRefObject } from "react";
import { PopularPropsTypes, ChildrenType } from "../popular.types";

export type MainRefTypes = MutableRefObject<HTMLUListElement>;
export type InputRefTypes = MutableRefObject<HTMLInputElement>;

// Main 페이지 props 타입
export type PopularMainPropsTypes = PopularPropsTypes & {
  showAll: boolean;
  toggleAllShow: (bool: boolean) => void;
  uuid: string;
  changeCurrent: (num: number) => void;
  hasChildren: boolean;
  current: number;
};

// Main 페이지 UI props 타입
export type PopularMainUIPropsTypes = PopularMainPropsTypes & {
  mainRef: MainRefTypes;
  stop: () => void;
  running: () => void;
  changeTempCurrent: (num: number) => void;
};

// Main-List 페이지 props 타입
export type PopularMainListPropsTypes = Omit<PopularPropsTypes, "children"> & {
  mainRef: MainRefTypes;
  mainList: ChildrenType;
  uuid: string;
  hasChildren: boolean;
  stop: () => void;
  running: () => void;
  current: number;
  changeCurrent: (num: number) => void;
  changeTempCurrent: (num: number) => void;
};
