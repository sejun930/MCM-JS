import { MutableRefObject } from "react";
import _Tooltip from "./tooltip.container";

import {
  CommonsChildrenTypes,
  CommonsSelectorTypes,
} from "../../../../commons/types/commons.types";

// 말풍선 스타일 타입
export interface TooltipStylesTypes {
  backgroundColor?: string; // 말풍선 배경 색상
  border?: {
    // 테두리 정보
    color?: string; // 테두리 색상
    width?: string; // 테두리 두께
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
    // 말풍선 위치 (default : top)
    position?: TooltipPositionType;
    // 모바일 환경에서도 동일하게 노출시킬 건지에 대한 여부 (default : false)
    showMobile?: boolean;
  };

export interface TooltipUIPropsType {
  show: boolean; // 말풍선 실행 여부
  render: boolean; // 말풍선 최종 렌더
  toggleTail: (bool: boolean) => () => void;
  tailRef: MutableRefObject<HTMLDivElement>;
}

export type TooltipType = typeof _Tooltip;
