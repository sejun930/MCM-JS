import { MutableRefObject } from "react";
import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";
import { InitPouplarInfoTypes } from "./popular.data";

export type ChildrenType = Array<React.ReactNode>;
export type InfoTypes = InitPouplarInfoTypes;
export interface MinHeightType {
  minHeight: {
    web: number; // 웹 버전 (768px 이상)
    mobile?: number; // 모바일 버전 (767px 이하)
  };
}

export type PopularPropsTypes = CommonsSelectorTypes & {
  // 렌더될 리스트
  children: ChildrenType;
  // Popular 높이값 설정
  minHeight: {
    web: number; // 웹 버전 (768px 이상)
    mobile?: number; // 모바일 버전 (767px 이하)
  };
  // 롤링 딜레이 타이머
  delay?: number;
  // 전체 리스트 열기 버튼 숨기기 여부
  hideAllList?: boolean;
  // 순위 표기 여부
  showRating?: boolean;
  // 스와이프 모드 사용 여부
  useSwipeMode?: boolean;
};

// Render 컴포넌트를 거쳐 렌더되는 최종 페이지
export type PopularRenderPropsTypes = PopularPropsTypes & {
  _uuid: string;
};
