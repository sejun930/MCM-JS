import { MutableRefObject } from "react";
import _Tooltip from "./tooltip.container";

import {
  CommonsChildrenTypes,
  CommonsSelectorTypes,
} from "../../../../commons/types/commons.types";

export type TooltipPropsType = CommonsChildrenTypes &
  CommonsSelectorTypes & {
    // 말풍선 내용
    tooltipText: string | React.ReactNode;
    // 말풍선 실행 애니메이션 사용 여부, true 전달하면 적용됨 (default : false)
    useShowAnimation?: boolean;
    // 말풍선 위치
    position?: {
      top?: string; // 위
      // left?: string; // 왼쪽
    };
    // 비활성화 여부, true를 전달하면 말풍선을 사용하지 않는다. (default : false)
    isDisable?: boolean;
  };

export interface TooltipUIPropsType {
  show: boolean; // 말풍선 보이기 여부
  toggleTail: (bool: boolean) => () => void;
  tailRef: MutableRefObject<HTMLDivElement>;
}

export type TooltipType = typeof _Tooltip;
