import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";
import _Split from "./split.container.tsx";

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

export type ListTypeWithIdx = ListInfoType & { idx: number };

// Split 모듈 props
export type SplitPropsTypes = CommonsSelectorTypes & ListType;

// Split.presenter props
export type SplitUIPageTypes = ListType &
  UidType &
  ActiveType & {
    toggleActive: (bool: boolean) => void;
  };

// bar 페이지 props types
export type SplitBarPropsTypes = UidType &
  ActiveType & {
    orderNum: number;
    toggleActive: (bool: boolean) => void;
  };

// contents 페이지 props types
export type SplitContentsPropsTypes = ListType & UidType;

export type SplitType = typeof _Split;
