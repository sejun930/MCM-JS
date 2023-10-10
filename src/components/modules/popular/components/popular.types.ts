import { CSSProperties } from "react";
import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";
import _Popular from ".";

export type ChildrenType = Array<React.ReactNode>;
export type StylesTypes = CSSProperties & { [key: string]: string };

export interface MinHeightType {
  minHeight: {
    web: number; // 웹 버전 (768px 이상)
    mobile?: number; // 모바일 버전 (767px 이하)
  };
}

export type PopularPropsTypes = CommonsSelectorTypes & {
  // 렌더될 리스트
  list: ChildrenType;
  // Popular 높이값 설정
  minHeight: {
    web: number; // 웹 버전 (768px 이상)
    mobile?: number; // 모바일 버전 (767px 이하)
  };
  // 롤링 딜레이 타이머
  delay?: number;
  // 스와이프 모드 사용 여부
  useSwipeMode?: boolean;
  // 전체 리스트 관련 props
  setList?: {
    hide?: boolean; // 전체 리스트 숨기기 여부
    showRating?: boolean; // 순위 표기 여부
    hoverStyles?: CSSProperties; // 현재 리스트 스타일 적용
    styles?: StylesTypes; // 웹, 모바일 동시 적용 스타일
    responsiveStyles?: {
      // 웹, 모바일 개별 적용 스타일
      web?: StylesTypes; // 웹 (768px 이상) 스타일 적용
      mobile?: StylesTypes; // 모바일 (767px 이하) 스타일 적용
    };
  };
  popularStyles?: StylesTypes; // 웹, 모바일 동시 적용 스타일
  popularResponsiveStyles?: {
    // 웹, 모바일 개별 적용 스타일
    web?: StylesTypes; // 웹 (768px 이상) 스타일 적용
    mobile?: StylesTypes; // 모바일 (767px 이하) 스타일 적용
  };
  // 리스트가 변경될 때 실행될 이벤트
  changeListEvent?: (idx: number) => void;
};

// Render 컴포넌트를 거쳐 렌더되는 최종 페이지
export type PopularRenderPropsTypes = PopularPropsTypes & {
  _uuid: string;
};

export type PopularType = typeof _Popular;
