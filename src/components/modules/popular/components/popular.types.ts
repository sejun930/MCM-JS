import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";

export type PopularPropsTypes = CommonsSelectorTypes & {
  // 렌더될 리스트
  children: Array<JSX.Element>;
};
