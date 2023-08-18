import { CSSProperties } from "react";

import styled from "@emotion/styled";
import { _Button } from "../../../../../../mcm-js-commons/src";

interface StyleTypes {
  selected?: boolean;
  delay?: number;
  useAnimation?: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Items = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  position: relative;

  .mcm-slider-next-button {
    right: 0;
  }
`;

export const List = styled.ul`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};
    styles.transform = `translateX(0%)`;

    // 애니메이션 적용하기
    if (props.useAnimation) {
      styles.transition = "all 0.5s ease";
      styles.transform = `translateX(-200%)`;
    }

    return styles;
  }}

  &.pause-animation {
    transition: unset;
  }

  &.move-start {
    transform: translateX(-200%);
  }
`;

export const Timer = styled.div`
  width: 100%;
  min-height: 20px;
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);

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
  opacity: 0;
  font-size: 18px;

  :hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

export const Pagination = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 10px;
  width: auto;
  gap: 0px 8px;
  white-space: pre;
  z-index: 20;
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
    props.selected && {
      cursor: "default",
      opacity: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    }}
`;
