import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";
import _Split from "./split.container";

export interface ListInfoType {
  children: React.ReactNode; // 노출될 컴포넌트
  startWidth?: number; // 시작 최소 %
}
interface ListType {
  list: Array<ListInfoType>;
}
interface UidType {
  uid: string;
}
interface ActiveType {
  active: boolean;
}
interface WidthListType {
  widthList: { [key: number]: number };
}

export type ListTypeWithIdx = ListInfoType & { idx: number };

// Split 모듈 props
export type SplitPropsTypes = CommonsSelectorTypes & ListType;

// Split.presenter props
export type SplitUIPageTypes = ListType &
  UidType &
  ActiveType & {
    toggleActive: (bool: boolean) => void;
  } & WidthListType;

// bar 페이지 props types
export interface SplitBarPropsTypes {
  toggleActive: (bool: boolean) => void;
  orderNum: number;
  active: boolean;
  uid: string;
}

// contents 페이지 props types
export interface SplitContentsPropsTypes {
  children: React.ReactNode;
  width: number;
  isLast: boolean;
  active: boolean;
}

export type SplitType = typeof _Split;
