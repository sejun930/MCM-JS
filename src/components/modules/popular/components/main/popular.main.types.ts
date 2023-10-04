import { MutableRefObject } from "react";
import { MinHeightType, ChildrenType, InfoTypes } from "../popular.types";

export type MainRefTypes = MutableRefObject<HTMLUListElement>;

// Main 페이지 props 타입
export type PopularMainPropsTypes = MinHeightType & {
  children: ChildrenType;
  info: InfoTypes;
  toggleAllShow: () => void;
  uuid: string;
  delay?: number;
  useSwipeMode: boolean;
};

// Main 페이지 UI props 타입
export type PopularMainUIPropsTypes = PopularMainPropsTypes & {
  mainRef: MainRefTypes;
};
