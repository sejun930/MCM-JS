import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export default function AlertAreaPage() {
  return <AlertMainWrapper id="mcm-alert-area"></AlertMainWrapper>;
}

/* Alert 전체 툴 */
export const AlertMainWrapper = styled.div`
  position: fixed;
  top: 10px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: column;
  gap: 6px 0px;
  align-items: center;
  z-index: 1000;

  .mcm-alert {
    display: inline-flex;
  }

  /* Alert 오픈 애니메이션 */
  .open-alert {
    animation: OPEN_ALERT_ANIMATION 0.35s ease;
    /* margin-top: 5px; */
    transform: translate(0px, 10px);
  }

  /* Alert 종료 애니메이션 */
  .close-alert {
    animation: CLOSE_ALERT_ANIMATION 0.35s ease !important;
  }

  /* Alert 왼쪽 종료 애니메이션 */
  .close-left-alert {
    animation: CLOSE_ALERT_LEFT_ANIMTAION 0.35s ease !important;
  }

  /* Alert 오른쪽 종료 애니메이션 */
  .close-right-alert {
    animation: CLOSE_ALERT_RIGHT_ANIMTAION 0.35s ease !important;
  }

  .animation {
    transition: all 0.25s;
  }

  /* Alert 오픈 애니메이션 */
  @keyframes OPEN_ALERT_ANIMATION {
    from {
      transform: translate(0px, 0px);
      /* margin-top: 0px; */
      opacity: 0;
    }
    to {
      transform: translate(0px, 10px);
      /* margin-top: 5px; */
      opacity: 1;
    }
  }

  /* Alert 종료 애니메이션 */
  @keyframes CLOSE_ALERT_ANIMATION {
    from {
      transform: translate(0px, 10px);
      /* margin-top: 5px; */
      opacity: 1;
    }
    to {
      transform: translate(0px, 0px);
      /* margin-top: 0px; */
      opacity: 0;
    }
  }

  /* Alert 왼쪽 방향 종료 애니메이션 */
  @keyframes CLOSE_ALERT_LEFT_ANIMTAION {
    from {
      transform: translate(-10px, 10px);
      opacity: 1;
    }
    to {
      transform: translate(-20px, 10px);
      opacity: 0;
    }
  }

  /* Alert 오른쪽 방향 종료 애니메이션 */
  @keyframes CLOSE_ALERT_RIGHT_ANIMTAION {
    from {
      transform: translate(10px, 10px);
      opacity: 1;
    }
    to {
      transform: translate(20px, 10px);
      opacity: 0;
    }
  }

  @media ${breakPoints.mobileLarge} {
    width: max-content;
  }
`;
