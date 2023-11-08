import styled from "@emotion/styled";
import { CSSProperties } from "react";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { TooltipStylesTypes, TooltipPositionType } from "./tooltip.types";
import {
  getPropsContentsStyles,
  getPropsTooltipTextStyles,
  getPropsWrapperStyles,
  getPropsTooltipContentsAfterStyles,
  getPropsTooltipContentsBeforeStyles,
} from "./tooltip.styles.data";

interface StyleTypes {
  // 말풍선 실행 애니메이션
  useShowAnimation?: boolean;
  show?: boolean;
  tooltipStyles?: TooltipStylesTypes;
  tooltipMobileStyles?: TooltipStylesTypes;
  position?: TooltipPositionType;
  hideMobile?: boolean;
}

export const TooltipWrapper = styled.div`
  height: auto;
  display: inline-block;
  cursor: default;
  vertical-align: unset;

  @media ${breakPoints.mobileLarge} {
    ${(props: StyleTypes) =>
      props.hideMobile && {
        verticalAlign: "baseline",
      }}
  }
`;

export const TooltipItems = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: flex-end;

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};

    if (props.position === "bottom") {
      // 배치가 아래일 경우
      styles.justifyContent = "flex-start";
    } else if (props.position !== "top") {
      // 배치가 왼쪽, 오른쪽일 경우
      styles.justifyContent = "center";

      if (props.position === "left") {
        styles.alignItems = "flex-end";
      }
    }

    return styles;
  }}
`;

export const TooltipChildren = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
`;

// export const TooltipTextWrapper = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
// `;

export const TooltipTextWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  /* position: relative;
  border: solid 1px black;
  border-radius: 10px;
  background-color: white;
  min-width: 40px;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  z-index: 1;
  transition: all 0.3s;

  // styles 스타일 적용하기
  ${(props: StyleTypes) => getPropsWrapperStyles(props.tooltipStyles, props)}

  // 애니메이션용 margin-top
  --move-start-bottom: unset;
  --move-end-bottom: unset;

  --move-start-top: unset;
  --move-end-top: unset;

  --move-start-right: unset;
  --move-end-right: unset;

  --move-start-left: unset;
  --move-end-left: unset;

  // 아래에서 위로 오르기
  @keyframes SHOW_TOOLTIP_TOP {
    from {
      opacity: 0;
      bottom: var(--move-start-bottom);
      top: var(--move-start-top);
    }
    to {
      opacity: 1;
      bottom: var(--move-end-bottom);
      top: var(--move-end-top);
    }
  }

  @keyframes SHOW_TOOLTIP_LEFT {
    from {
      opacity: 0;
      right: var(--move-start-right);
      left: var(--move-start-left);
    }
    to {
      opacity: 1;
      right: var(--move-end-right);
      left: var(--move-end-left);
    }
  }

  // 위에서 아래로 내려가기
  @keyframes CLOSE_TOOLTIP_TOP {
    from {
      opacity: 1;
      bottom: var(--move-end-bottom);
      top: var(--move-end-top);
    }
    to {
      opacity: 0;
      bottom: var(--move-start-bottom);
      top: var(--move-start-top);
    }
  }

  @keyframes CLOSE_TOOLTIP_LEFT {
    from {
      opacity: 1;
      right: var(--move-end-right);
      left: var(--move-end-left);
    }
    to {
      opacity: 0;
      right: var(--move-start-right);
      left: var(--move-start-left);
    }
  }

  @media ${breakPoints.mobileLarge} {
    ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};

    // 모바일에서 사용하지 않을 경우, none 처리
    if (props.hideMobile) styles.display = "none";
    // 모바일 환경의 스타일 적용하기
    else if (props.tooltipMobileStyles)
      return getPropsWrapperStyles(props.tooltipMobileStyles, props);

    return styles;
  }}
  } */
`;

export const TooltipTailContents = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: fit-content;
  min-height: 30px;
  white-space: pre;
  font-size: 12px;
  /* transition: all 0.3s; */
  border: solid 1px black;
  background-color: white;
  border-radius: 10px;

  // 전달된 props 값에 적용된 스타일 설정하기
  ${(props: StyleTypes) => getPropsContentsStyles(props.tooltipStyles)}

  // 모바일 환경에서의 적용된 스타일 설정하기
  @media ${breakPoints.mobileLarge} {
    ${(props) => getPropsContentsStyles(props.tooltipMobileStyles)}
  }

  // 툴팁 메세지가 출력되는 태그
  .mcm-tooltip-text {
    width: 100%;
    height: 100%;
    transition: all 0.3s;

    // 스타일 적용
    ${(props) => getPropsTooltipTextStyles(props.tooltipStyles)}

    // 모바일 환경 스타일 적용
    @media ${breakPoints.mobileLarge} {
      ${(props) => getPropsTooltipTextStyles(props.tooltipMobileStyles)}
    }
  }

  /* /////////////////////////////////////////////////////////////////////// */

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

    // 스타일 적용
    ${(props) =>
      getPropsTooltipContentsAfterStyles(props.tooltipStyles, props.position)}

    // 모바일 스타일 적용
      @media ${breakPoints.mobileLarge} {
      ${(props) =>
        getPropsTooltipContentsAfterStyles(
          props.tooltipMobileStyles,
          props.position
        )}
    }
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

    // 스타일 적용
    ${(props: StyleTypes) =>
      getPropsTooltipContentsBeforeStyles(props.tooltipStyles, props.position)}

    // 모바일 스타일 적용
    @media ${breakPoints.mobileLarge} {
      ${(props: StyleTypes) =>
        getPropsTooltipContentsBeforeStyles(
          props.tooltipMobileStyles,
          props.position
        )}
    }
  }
`;

export const TooltipHoverRange = styled.div`
  position: absolute;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  left: 0;
  z-index: 1000;
`;
