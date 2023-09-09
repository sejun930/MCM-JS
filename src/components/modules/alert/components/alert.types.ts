import {
  CommonsSelectorTypes,
  CommonsChildrenTypes,
} from "../../../../commons/types/commons.types";

export type AlertPropsType = CommonsSelectorTypes &
  CommonsChildrenTypes & {
    // 알럿 실행 후 종료되는 시간까지의 딜레이 타임
    closeDelayTime?: number;
  };

export interface AlertIProps {
  sequence: number;
}
