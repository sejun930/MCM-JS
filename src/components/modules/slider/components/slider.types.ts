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
};

export interface SliderAddProps {
  uid: string;
}

export interface SliderUIPropsTypes {
  list: Array<React.ReactNode>;
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
}

export type SliderType = typeof _Slider;
