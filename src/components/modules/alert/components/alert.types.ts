import { CSSProperties, MouseEvent, MutableRefObject } from "react";
import { CommonsSelectorTypes } from "../../../../commons/types/commons.types";
import _Alert from "./alert.container";

// type AlertConceptTypes = "success" | "error" | "warning" | "info" | "custom";
export type AlertPropsType = CommonsSelectorTypes & {
  // 알럿 메세지
  children: string;
  // 알럿 실행 후 종료되는 시간까지의 딜레이 타임
  closeDelayTime?: number | "infinite";
  // Alert 스타일 지정 (web, mobile 동일 적용)
  alertStyles?: CSSProperties;
  // Alert 스타일 반응형 지정 (web, mobile 별도 적용)
  alertResponsiveStyles?: {
    web?: CSSProperties;
    mobile?: CSSProperties;
  };
  // Alert 메세지의 콘셉 (success : 성공, error : 에러, warning : 경고, info : 정보)
  alertConcept?: {
    type: "success" | "error" | "warning" | "info" | "custom";
    custom?: {
      // 컨셉에 관한 커스텀 스타일
      color?: string; // 컨셉의 색상
      icon?: {
        src?: string; // 아이콘 이모지 및 이미지
        size?: number; // 이모지 크기 (font-size)
        color?: string | "unset"; // 아이콘 색상 (unset : 기본 색상 유지)
      };
      text?: {
        // 알럿 메세지 변경
        color?: string;
        size?: number;
        weight?: number;
      };
    };
  };
  // 알럿 닫기 모드 사용 여부 (마우스 호버시 닫기 노출)
  useCloseMode?: boolean | { useSwipeMode: boolean };
  // 알럿 실행 후 실행될 이벤트
  onEventOpenAfter?: () => void;
  // 알럿 종료 후 실행될 이벤트
  onEventCloseAfter?: () => void;
};

// func로 부터 받아오는 props
export interface AlertAddIProps {
  closeAlert: (
    sequence: number,
    sideCloseAnimation?: null | ("left" | "right"),
    closeEvent?: () => void
  ) => void;
  sequence: number;
}

// presenter로 전달되는 props
export interface AlertUIProps {
  wrapperRef: MutableRefObject<HTMLDivElement>;
  hasSwipeMode: boolean;
  closeAlertEvent: (e: MouseEvent) => void;
  startSwipe: (pageX: number) => void;
  moveSwipe: (pageX: number, isMobile?: boolean) => void;
  endSwipe: () => void;
}

export interface AlertType {
  openAlert: (props: AlertPropsType) => void;
  closeAlert: (sequence: number | { id?: string; className?: string }) => void;
  clearAlert: () => void;
}
