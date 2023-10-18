import { CSSProperties } from "react";

import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  delay?: number;
  useAnimation?: boolean;
  hasDragMode?: boolean;
  hasPageList?: boolean;
  listMinHeight?: {
    web: string;
    mobile?: string;
  };
  isSetHoverArrow?: boolean;
  hideMobile?: boolean;
  isDisable?: boolean;
  isSelected?: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 99;
  visibility: hidden;

  // 버튼 호버 기능 사용중일 경우
  .mcm-slider-arrow {
    ${(props: StyleTypes) =>
      props.isSetHoverArrow && {
        opacity: 0,
      }}
  }

  :hover {
    .mcm-slider-arrow {
      ${(props) =>
        props.isSetHoverArrow && {
          opacity: 1,
        }}
    }
  }
`;

export const Items = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  z-index: 98;

  .mcm-slider-next-button {
    right: 0;
  }

  @media ${breakPoints.mobileLarge} {
    .mcm-slider-arrow {
      ${(props: StyleTypes) =>
        props.hideMobile && {
          display: "none",
        }}
    }
  }
`;

export const List = styled.ul`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  z-index: 97;
  transform: translateX(100%);
  /* transform: translateX(-200%); */
  min-height: 40px;

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};

    // 애니메이션 적용하기
    if (props.useAnimation) {
      styles.transition = "all 0.5s ease";
    }

    // 슬라이더 기능 사용시
    if (props.hasDragMode) {
      styles.cursor = "grab";
    }

    // 페이지네이션을 사용할 경우
    if (props.hasPageList) {
      styles.minHeight = "80px";
    }
    return styles;
  }}

  @media(min-width : 767px) {
    ${(props) =>
      props.listMinHeight &&
      props.listMinHeight?.web && {
        minHeight: props.listMinHeight.web,
      }}
  }

  &.pause-animation {
    transition: unset !important;
  }

  @media ${breakPoints.mobileLarge} {
    ${(props) =>
      props.listMinHeight &&
      props.listMinHeight?.mobile && {
        minHeight: props.listMinHeight.mobile,
      }}
  }
`;

export const Timer = styled.div`
  width: 100%;
  min-height: 20px;
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 100;

  @keyframes SLIDER_TIMER_ANIMTAION {
    from {
      min-width: 10px;
    }
    to {
      min-width: 100%;
    }
  }

  ::after {
    content: "";
    position: absolute;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    animation-play-state: running;

    ${(props: StyleTypes) =>
      props.delay && {
        animation: `SLIDER_TIMER_ANIMTAION ${props.delay}s infinite`,
      }}
  }

  &.pause {
    ::after {
      animation: none;
    }
  }
`;

export const Contents = styled.li`
  min-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ArrowButton = styled(_Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  min-width: 30px;
  height: 100%;
  z-index: 1000;
  transition: all 0.25s ease-out;
  opacity: 1;
  font-size: 18px;

  /* pointer-events: none; // PC 이미지 다운로드 금지 */
  -webkit-touch-callout: none; // 아이폰 다운로드 금지
  -webkit-user-select: none; // 드래그 방지
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;

  ${(props: StyleTypes) =>
    props.isDisable && {
      cursor: "not-allowed",
      backgroundColor: "inherit",
      opacity: "0.5",
    }}

  :hover {
    ${(props: StyleTypes) =>
      !props.isDisable && {
        backgroundColor: "rgba(125, 125, 125, 0.25)",
      }}
  }

  @media ${breakPoints.mobileLarge} {
    transition: unset;
    transform: translate(0px, -50%);
    bottom: 50%;
    top: 50%;
    height: 24px;
    min-width: 24px;

    :hover {
      background-color: unset;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0px;
  width: auto;
  gap: 0px 8px;
  white-space: pre;
  z-index: 100;

  @media ${breakPoints.mobileLarge} {
    ${(props: StyleTypes) =>
      props.hideMobile && {
        display: "none",
      }}
  }
`;

export const PageList = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 8px;
`;

export const Page = styled(_Button)`
  min-width: 16px;
  height: 16px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 100%;
  opacity: 0.4;

  ${(props: StyleTypes) =>
    props.isSelected && {
      cursor: "default",
      opacity: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    }}
`;
