import { MutableRefObject } from "react";
import { PopularPropsTypes, ChildrenType } from "../popular.types";

export type MainRefTypes = MutableRefObject<HTMLUListElement>;

// Main 페이지 props 타입
export type PopularMainPropsTypes = PopularPropsTypes & {
  showAll: boolean;
  toggleAllShow: () => void;
  uuid: string;
  changeCurrent: (num: number) => void;
  hasChildren: boolean;
};

// Main 페이지 UI props 타입
export type PopularMainUIPropsTypes = PopularMainPropsTypes & {
  mainRef: MainRefTypes;
  stop: () => void;
  running: () => void;
};

export type PopularMainListPropsTypes = Omit<
  PopularPropsTypes,
  "children" | "minHeight"
> & {
  mainRef: MainRefTypes;
  mainList: ChildrenType;
  uuid: string;
  hasChildren: boolean;
  stop: () => void;
  running: () => void;
};
