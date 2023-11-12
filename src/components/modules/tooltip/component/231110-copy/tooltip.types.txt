import { MutableRefObject } from "react";
import _Tooltip from "./tooltip.container";

import {
  CommonsChildrenTypes,
  CommonsSelectorTypes,
} from "../../../../commons/types/commons.types";

// 말풍선 스타일 타입
export interface TooltipStylesTypes {
  backgroundColor?: string; // 말풍선 배경 색상
  padding?: string; // padding 적용
  font?: {
    // 말풍선 안 문자열 정보
    size?: string; // 문자열 크기
    color?: string; // 문자열 색상
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; // 문자열 굵기
  };
  border?: {
    // 테두리 정보
    color?: string; // 테두리 색상
    width?: string; // 테두리 두께
    // style?: "solid" | "dotted" | "double" | "unset"; // 테두리 스타일
    radius?: string; // 테두리 라운드
  };
}

// 말풍선 배치 위치 타입
export type TooltipPositionType = "top" | "bottom" | "left" | "right";

export type TooltipPropsType = CommonsChildrenTypes &
  CommonsSelectorTypes & {
    // 말풍선 내용
    tooltipText: string | React.ReactNode;
    // 말풍선 실행 애니메이션 사용 여부, true 전달하면 적용됨 (default : false)
    useShowAnimation?: boolean;
    // 비활성화 여부, true를 전달하면 말풍선을 사용하지 않는다. (default : false)
    isDisable?: boolean;
    // 말풍선 스타일 (색상, 테두리 색상, 두께 등등)
    tooltipStyles?: TooltipStylesTypes;
    // 모바일 말풍선 스타일 (색상, 테두리 색상, 두께 등등)
    tooltipMobileStyles?: TooltipStylesTypes;
    // 말풍선 위치 (default : top)
    position?: TooltipPositionType;
    // 수동으로 툴팁을 오픈할 건지에 대한 여부
    open?: boolean;
    // 오픈된 툴팁을 고정 (= 종료되지 않음)
    isFix?: boolean;
    // 모바일 환경에서도 동일하게 노출시킬 건지에 대한 여부 (default : false)
    hideMobile?: boolean;
    // 툴팁이 종료되면 실행되는 이벤트
    onCloseAfterEvent?: () => void;
    // 툴팁이 오픈되면 실행되는 이벤트
    onOpenAfterEvent?: () => void;
    // 호버 이벤트 무시 여부
    offHoverEvent?: boolean;
  };

export interface TooltipUIPropsType {
  // tooltipOpen: boolean; // 말풍선 실행 여부
  // render: boolean; // 말풍선 최종 렌더
  openTooltip: () => void;
  closeTooltip: () => void;
  textRef: MutableRefObject<HTMLDivElement>;
  wrapperRef: MutableRefObject<HTMLDivElement>;
}

export type TooltipType = typeof _Tooltip;
