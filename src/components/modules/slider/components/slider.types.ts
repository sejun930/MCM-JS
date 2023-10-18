import { MutableRefObject } from "react";
import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";
import _Slider from "./slider.container";

export type SliderPropsTypes = CommonsSelectorTypes & {
  // 출력될 리스트 정보 - 배열로 받아야 한다.
  children: Array<JSX.Element>;
  // 화면 전환시 애니메이션 사용 여부
  useAnimation?: boolean;
  // 리스트들의 페이지 정보를 받는 props
  pagination?: {
    // 사용 가능한 페이지들을 나타낼 것인지에 대한 여부
    showPageList?: boolean;
    // 모바일 숨기기 여부
    hideMobile?: boolean;
  };
  // 자동 넘김 기능 사용 여부
  useAutoPlay?: {
    delay: number; // 자동 넘김 시간 (1000 = 1초), 최소 3초 입력 필요
    showTimer?: boolean; // 타이머 노출 여부
  };
  // 마우스 전환 모드 사용 여부
  useSwipeMode?: {
    sideMovePercent: number; // 좌우 이동 비율 (최소 10% ~ 90%)
  };
  // 전환 버튼 관련
  setArrow?: {
    hide?: boolean; // 버튼 숨기기
    showHover?: boolean; // 호버 상태에서만 보이기
    hideMobile?: boolean; // 모바일에서는 숨기기
    contents?: {
      // 변경할 문자열 또는 태그
      left: string | JSX.Element; // 이전 버튼 대체
      right: string | JSX.Element; // 다음 버튼 대체
    };
  };
  // 제일 먼저 시작되는 페이지
  firstPage?: number;
  // 리스트의 최소 높이값 지정
  listMinHeight?: {
    web: string; // 웹 사이즈 높이값
    mobile?: string; // 모바일 사이즈 높이값
  };
  // 페이지 변환마다 실행되는 이벤트 (idx로 해당 컴포넌트의 페이지 번호 전달)
  changePageEvent?: (idx: number) => void;
  // 무한 재생 방지 (페이지가 처음이나 끝에 도달했을 때, 이전 및 다음 버튼 실행 방지)
  // stopInfinite?: boolean;
};

export interface SliderAddProps {
  _uid: string;
}

export interface SliderUIPropsTypes {
  children: Array<JSX.Element>;
  moveSlider: ({
    type,
    page,
    selector,
  }: {
    type: "next" | "prev" | "page";
    page?: number;
    selector: number;
  }) => () => void;
  listRef: MutableRefObject<HTMLUListElement>;
  selector: number;
  timerRef: MutableRefObject<HTMLDivElement>;
  uid: string;
  timerList: { [key: string]: ReturnType<typeof setInterval> };
}

export interface WrapperRef {
  wrapperRef: MutableRefObject<HTMLDivElement>;
}
export type SliderType = typeof _Slider;
