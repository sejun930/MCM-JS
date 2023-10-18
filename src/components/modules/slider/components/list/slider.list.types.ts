import { MouseEvent, TouchEvent } from "react";
import { SliderUIPropsTypes, InitSliderInfoTypes } from "../slider.types";

export type SliderListTypes = SliderUIPropsTypes & {
  useAnimation: boolean;
  useSwipeMode: {
    sideMovePercent: number;
  };
  useAutoPlay?: {
    delay: number; // 자동 넘김 시간 (1000 = 1초), 최소 3초 입력 필요
    showTimer?: boolean; // 타이머 노출 여부
  };
  hasPageList: boolean;
  listMinHeight?: { web: string; mobile?: string };
  info: InitSliderInfoTypes;
  stopInfinite: boolean;
};

export interface SliderListUITypes {
  startDrag: (pageX: number, isMobile?: boolean) => void;
  moveDrag: (pageX: number, e: MouseEvent | TouchEvent) => void;
  endDrag: () => void;
  list: Array<React.ReactNode>;
}
