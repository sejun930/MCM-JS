import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";

export type PopularPropsTypes = CommonsSelectorTypes & {
  // 렌더될 리스트
  children: Array<React.ReactNode>;
};

// Render 컴포넌트를 거쳐 렌더되는 최종 페이지
export type PopularRenderPropsTypes = PopularPropsTypes & {
  //   uuid: string;
  maxHeight: number;
  componentIdx: number;
};
