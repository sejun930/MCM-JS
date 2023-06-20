import styled from "@emotion/styled";

import { _Error } from "mcm-js-commons";
import {
  CSSProperties,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { TooltipPropsType } from "./tooltip.types";

let deboucing: number | ReturnType<typeof setTimeout>;
let loading = false;
// 추가 설명을 위한 말풍선 모듈
export default function _Tooltip(props: TooltipPropsType) {
  // 말풍선 ref
  const tailRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { children, tooltipText, useShowAnimation } = props;

  // 말풍선 보이기
  const [show, setShow] = useState(false);

  // 마우스 hover시 말풍선 오픈
  const toggleTail = (bool: boolean) => async () => {
    if (bool === show || loading) return;

    // 스테이트 변환 시간
    let timer = 0;

    // 말풍선 애니메이션을 사용한다면
    if (useShowAnimation) {
      // 말풍선을 닫는다면
      if (!bool) {
        loading = true; // 중복 실행 방지
        timer = 250; // 변환 시간 지연

        if (tailRef && tailRef.current) {
          tailRef.current.style.animation = "CLOSE_TOOLTIP  0.3s";
        }
      }
    }

    // 말풍선을 닫을 경우
    window.setTimeout(() => {
      setShow(bool);
      loading = false;
    }, timer);
  };

  return (
    <_Error
      propsList={{ children, tooltipText }}
      requiredList={["children", "tooltipText"]}
    >
      <TooltipWrapper
        className="mcm-tooltip-wrapper"
        onMouseLeave={toggleTail(false)}
      >
        <TooltipItems className="mcm-tooltip-items">
          <TooltipLayout
            className="mcm-tooltip-layout"
            onMouseOver={toggleTail(true)}
          >
            {children}
          </TooltipLayout>
          {(show && (
            <TooltipTailWrapper
              className="mcm-tooltip-tail-wrapper"
              ref={tailRef}
              useShowAnimation={useShowAnimation}
              show={show}
            >
              <TooltipTailContents className="mcm-tooltip-tail-contents">
                {tooltipText}
              </TooltipTailContents>
            </TooltipTailWrapper>
          )) || <></>}
        </TooltipItems>
      </TooltipWrapper>
    </_Error>
  );
}

interface StyleTypes {
  // 말풍선 실행 애니메이션
  useShowAnimation?: boolean;
  show?: boolean;
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
  transform: translateY(-3.2rem);
  animation-fill-mode: forwards;
  animation-direction: alternate;

  @keyframes SHOW_TOOLTIP {
    from {
      opacity: 0;
      transform: translateY(-2.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(-3.2rem);
    }
  }

  @keyframes CLOSE_TOOLTIP {
    from {
      opacity: 1;
      transform: translateY(-3.2rem);
    }
    to {
      opacity: 0;
      transform: translateY(-2.5rem);
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
  padding: 12px;
  width: 100%;

  ::after,
  ::before {
    position: absolute;
    content: "";
    width: 18px;
    height: 14px;
    background-color: #ffff;
    border-radius: 4px;
    box-shadow: -1px 1px black;
    transform: rotate(-40deg);
    position: absolute;
    z-index: 2;
    bottom: -5.5px;
  }
`;
