import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";

export type PopularPropsTypes = CommonsSelectorTypes & {
  // 렌더될 리스트
  children: Array<React.ReactNode>;
  // 롤링 딜레이 타이머
  delay?: number;
  // 순위 표기 여부
  showRating?: boolean;
};

// Render 컴포넌트를 거쳐 렌더되는 최종 페이지
export type PopularRenderPropsTypes = PopularPropsTypes & {
  uuid: string;
  maxHeight: number;
};
