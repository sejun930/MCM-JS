import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";

export type SliderPropsTypes = CommonsSelectorTypes & {
  // 출력될 리스트 정보 - 배열로 받아야 한다.
  children: Array<JSX.Element>;
  // 리스트들의 페이지 정보를 받는 props
  pagination?: {
    // 페이지들을 나타낼 것인지에 대한 여부
    usePageList?: boolean;
  };
  // 자동 넘김 기능 사용 여부
  useAutoPlay?: {
    delay: number; // 자동 넘김 시간 (1000 = 1초)
    showTimer?: boolean; // 타이머 노출 여부
  };
};
