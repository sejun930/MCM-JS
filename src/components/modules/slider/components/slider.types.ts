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
  };
  // 자동 넘김 기능 사용 여부
  useAutoPlay?: {
    delay: number; // 자동 넘김 시간 (1000 = 1초), 최소 3초 입력 필요
    showTimer?: boolean; // 타이머 노출 여부
  };
  // 마우스 전환 모드 사용 여부
  useDragMode?: {
    sideMovePercent: number; // 좌우 이동 비율 (최소 10% ~ 90%)
  };
  // 다음, 이전 버튼 숨기기
  hideArrow?: boolean;
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

export type SliderType = typeof _Slider;
