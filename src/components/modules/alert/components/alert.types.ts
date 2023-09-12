import { CSSProperties, MouseEvent, MutableRefObject } from "react";
import {
  CommonsSelectorTypes,
  CommonsChildrenTypes,
} from "../../../../commons/types/commons.types";

export type AlertPropsType = CommonsSelectorTypes &
  CommonsChildrenTypes & {
    // 알럿 실행 후 종료되는 시간까지의 딜레이 타임
    closeDelayTime?: number | "infinite";
    // Alert 스타일 지정 (web, mobile 동일 적용)
    alertStyles?: CSSProperties;
    // Alert 스타일 반응형 지정 (web, mobile 별도 적용)
    alertResponsiveStyles?: {
      web: CSSProperties;
      mobile?: CSSProperties;
    };
    // Alert 메세지의 콘셉 (success : 성공, error : 에러, warning : 경고, info : 정보)
    alertConcept?: string | ("success" | "error" | "warning" | "info");
    // 알럿 닫기 모드 사용 여부 (마우스 호버시 닫기 노출)
    useCloseMode?: boolean | { useSwipeMode: boolean };
  };

// func로 부터 받아오는 props
export interface AlertAddIProps {
  closeAlert: (props: number, sideCloseAnimation?: "left" | "right") => void;
  sequence: number;
}

// presenter로 전달되는 props
export interface AlertUIProps {
  wrapperRef: MutableRefObject<HTMLDivElement>;
  hasSwipeMode: boolean;
  closeAlertEvent: (e: MouseEvent) => void;
  startDrag: (pageX: number) => void;
  moveDrag: (pageX: number) => void;
  endDrag: () => void;
}
