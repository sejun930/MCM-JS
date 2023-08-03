import styled from "@emotion/styled";
import { CSSProperties } from "react";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { TooltipStylesTypes, TooltipPositionType } from "./tooltip.types";

interface StyleTypes {
  // 말풍선 실행 애니메이션
  useShowAnimation?: boolean;
  show?: boolean;
  tooltipStyles?: TooltipStylesTypes;
  position?: TooltipPositionType;
  showMobile?: boolean;
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
  width: 100%;
`;

export const TooltipTailWrapper = styled.div`
  position: absolute;
  border: solid 1px black;
  border-radius: 10px;
  background-color: white;
  min-width: 40px;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  z-index: 1;
  opacity: 0;

  ${(props: StyleTypes) => {
    const styles: { [key: string]: string } & CSSProperties = {};

    // 말풍선 실행했을 경우
    if (props.show) styles.opacity = 1;

    // 실행 애니메이션을 사용하는 경우
    if (props.useShowAnimation) {
      if (props.show) {
        // 실행 애니메이션 스타일 적용
        if (props.position === "top" || props.position === "bottom") {
          // 상, 하 애니메이션 적용
          styles.transition = "margin-top 0.3s";
          styles.animation = "SHOW_TOOLTIP_TOP 0.3s";
        } else {
          // 좌, 우 애니메이션 적용
          styles.transition = "margin-left 0.3s";
          styles.animation = "SHOW_TOOLTIP_LEFT 0.3s";
        }
      }
    }

    // 스타일이 적용되었을 경우
    if (props.tooltipStyles) {
      // 배경색 변경
      if (props.tooltipStyles.backgroundColor)
        styles.backgroundColor = props.tooltipStyles.backgroundColor;

      // 테두리 변경
      if (props.tooltipStyles.border) {
        // 테두리 색상 변경
        if (props.tooltipStyles.border.color)
          styles.borderColor = props.tooltipStyles.border.color;
        // 테두리 두께 변경
        if (props.tooltipStyles.border.width)
          styles.borderWidth = props.tooltipStyles.border.width;
      }
    }

    return styles;
  }}

  // 애니메이션용 margin-top
  --move-start-position: -25;
  --move-end-position: -20;

  @keyframes SHOW_TOOLTIP_TOP {
    from {
      opacity: 0;
      margin-top: var(--move-start-position);
    }
    to {
      opacity: 1;
      margin-top: var(--move-end-position);
    }
  }

  @keyframes SHOW_TOOLTIP_LEFT {
    from {
      opacity: 0;
      margin-left: var(--move-start-position);
    }
    to {
      opacity: 1;
      margin-left: var(--move-end-position);
    }
  }

  @keyframes CLOSE_TOOLTIP_TOP {
    from {
      opacity: 1;
      margin-top: var(--move-end-position);
    }
    to {
      opacity: 0;
      margin-top: var(--move-start-position);
    }
  }

  @keyframes CLOSE_TOOLTIP_LEFT {
    from {
      opacity: 1;
      margin-left: var(--move-end-position);
    }
    to {
      opacity: 0;
      margin-left: var(--move-start-position);
    }
  }

  @media ${breakPoints.mobileLarge} {
    display: none;

    ${(props) =>
      props.showMobile && {
        display: "flex",
      }}
  }
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
    border-color: white transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    position: absolute;
    /* top: -7px; */
    width: 0;
    z-index: 1;
    bottom: -6.5px;
    transform: rotate(180deg);

    // 테두리 스타일 변경
    ${(props: StyleTypes) => {
      const styles: { [key: string]: string } & CSSProperties = {};

      if (props.tooltipStyles) {
        // 말풍선 배경색 변경
        if (props.tooltipStyles.backgroundColor)
          styles.borderColor = `${props.tooltipStyles.backgroundColor} transparent`;
      }

      if (props.position === "bottom") {
        // 배치가 아래인 경우
        styles.bottom = "auto";
        styles.top = "-6.5px";
        styles.transform = "rotate(0deg)";
      } else if (props.position === "left" || props.position === "right") {
        // 배치가 좌, 우인 경우
        styles.bottom = "50%";
        styles.right = "-9px";
        styles.transform = "rotate(90deg)";

        // 오른쪽 배치 처리
        if (props.position === "right") {
          styles.left = "-9px";
          styles.transform = "rotate(270deg)";
        }
      }

      return styles;
    }}
  }

  ::before {
    border-color: black transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    position: absolute;
    /* top: -8px; */
    width: 0;
    z-index: 0;
    bottom: -8px;
    transform: rotate(180deg);

    ${(props: StyleTypes) => {
      const styles: { [key: string]: string } & CSSProperties = {};

      if (props.position === "bottom") {
        // 배치가 아래일 경우
        styles.bottom = "auto";
        styles.top = "-8px";
        styles.transform = "rotate(0deg)";
      } else if (props.position === "left" || props.position === "right") {
        // 배치가 왼쪽인 경우
        styles.bottom = "50%";
        styles.right = "-10px";
        styles.transform = "rotate(90deg)";

        if (props.position === "right") {
          styles.left = "-10px";
          styles.transform = "rotate(270deg)";
        }
      }

      if (props.tooltipStyles) {
        // 테두리 스타일 변경
        if (props.tooltipStyles.border) {
          // 테두리 색상 변경
          if (props.tooltipStyles.border.color)
            styles.borderColor = `${props.tooltipStyles.border.color} transparent`;

          // 테두리 두께 변경
          if (props.tooltipStyles.border.width) {
            const width = Number(
              props.tooltipStyles.border.width.split("px")[0]
            );
            // 0이하라면 테두리 표시 안함
            if (width <= 0) styles.display = "none";
            // 설정된 테두리만큼 위치값 변경
            styles.bottom = `${-8 + -width}px`;

            if (props.position === "bottom") {
              // 배치가 아래인 경우
              styles.bottom = "auto";
              styles.top = `${-8 + -width}px`;
            } else if (
              props.position === "left" ||
              props.position === "right"
            ) {
              // 배치가 좌, 우인 경우
              styles.bottom = "50%";

              if (props.position === "left")
                styles.right = `${-11 + (-width + 1)}px`;
              if (props.position === "right")
                styles.left = `${-11 + (-width + 1)}px`;
            }
          }
        }
      }

      return styles;
    }}
  }
`;
