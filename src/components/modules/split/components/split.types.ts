import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";
import _Split from "./split.container.tsx";

interface ListType {
  list: Array<{
    children: React.ReactNode;
  }>;
}
interface UidType {
  uid: string;
}

// Split 모듈 props
export type SplitPropsTypes = CommonsSelectorTypes & ListType;

// Split.presenter props
export type SplitUIPageTypes = ListType &
  UidType & {
    disActive: boolean;
    toggleDisAction: (bool: boolean) => void;
  };

// bar 페이지 props types
export type SplitBarPropsTypes = UidType & {
  orderNum: number;
  disActive: boolean;
  toggleDisAction: (bool: boolean) => void;
};

// contents 페이지 props types
export type SplitContentsPropsTypes = ListType & UidType;

export type SplitType = typeof _Split;
