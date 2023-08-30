import { SliderUIPropsTypes } from "../slider.types";

export type SliderListTypes = SliderUIPropsTypes & {
  useAnimation: boolean;
  useDragMode: {
    sideMovePercent: number;
  };
  useAutoPlay?: {
    delay: number; // 자동 넘김 시간 (1000 = 1초), 최소 3초 입력 필요
    showTimer?: boolean; // 타이머 노출 여부
  };
};

export interface SliderListUITypes {
  startDrag: (pageX: number) => void;
  moveDrag: (pageX: number) => void;
  endDrag: () => void;
  list: Array<React.ReactNode>;
}
