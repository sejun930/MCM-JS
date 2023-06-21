import styled from "@emotion/styled";
import { CSSProperties } from "react";

interface StyleTypes {
  // 말풍선 실행 애니메이션
  useShowAnimation?: boolean;
  show?: boolean;
  positionTop?: number;
}

export const TooltipWrapper = styled.div`
  display: inline-block;
  cursor: default;
`;

export const TooltipItems = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: flex-start;
`;

export const TooltipLayout = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
`;

export const TooltipTailWrapper = styled.div`
  position: absolute;
  border: solid 1px black;
  border-radius: 10px;
  background-color: white;
  min-width: 40px;
  /* margin-top: ${(props) => `${props.positionTop}px`}; */
  animation-fill-mode: forwards;
  animation-direction: alternate;

  // 애니메이션용 margin-top
  --move-start-positionTop: -30;
  --move-end-positionTop: -20;

  @keyframes SHOW_TOOLTIP {
    from {
      opacity: 0;
      margin-top: var(--move-start-positionTop);
    }
    to {
      opacity: 1;
      margin-top: var(--move-end-positionTop);
    }
  }

  @keyframes CLOSE_TOOLTIP {
    from {
      opacity: 1;
      margin-top: var(--move-end-positionTop);
    }
    to {
      opacity: 0;
      margin-top: var(--move-start-positionTop);
    }
  }

  ${(props: StyleTypes) => {
    const styles: { [key: string]: string } & CSSProperties = {};

    // 실행 애니메이션을 사용하는 경우
    if (props.useShowAnimation) {
      styles.transition = "all 0.3s";

      if (props.show) {
        // 실행 애니메이션 스타일 적용
        styles.animation = "SHOW_TOOLTIP 0.3s";
      }
    }

    return styles;
  }}
`;

export const TooltipTailContents = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 6px;
  width: 100%;
  white-space: pre;
  font-size: 12px;

  ::after {
    position: absolute;
    content: "";
    width: 12px;
    height: 16px;
    background-color: #ffff;
    border-radius: 4px;
    box-shadow: -1px 1px black;
    transform: rotate(-55deg);
    position: absolute;
    z-index: 2;
    bottom: -6.5px;
  }
`;
