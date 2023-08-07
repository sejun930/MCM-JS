import React, { createElement } from "react";
import { createRoot } from "react-dom/client";

import _TooltipUIPage from "./tooltip.presenter";

import { _Error } from "mcm-js-commons";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import { TooltipPropsType } from "./tooltip.types";

// position의 종류가 아래의 4가지에 일치하는지 검증
const filterPosition = ["top", "bottom", "left", "right"];
// 추가 설명을 위한 말풍선 모듈
export default function _Tooltip(props: TooltipPropsType) {
  // 중복 실행 방지 변수
  let loading = false;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  // 말풍선 ref
  const tailRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { children, tooltipText, useShowAnimation, isDisable, position } =
    props;

  // position이 4가지의 종류에 일치하지 않는다면 기본값 top 부여
  let _position = filterPosition.some((el) => el === position)
    ? position
    : "top";

  // 말풍선 실행 여부
  const [show, setShow] = useState(false);
  // 말풍선 최종 렌더
  const [render, setRender] = useState(false);

  // isDisable 설정시, 말풍선 off
  useEffect(() => {
    if (isDisable) setShow(false);
  }, [isDisable]);

  // 실행 및 종료시 최종 말풍선 위치값 구하기
  useEffect(() => {
    if (tailRef && tailRef.current) {
      // 말풍선 오픈시
      if (show) {
        if (wrapperRef && wrapperRef.current) {
          const { x, y } = wrapperRef.current.getBoundingClientRect();

          const newDiv = document.createElement("div");
          newDiv.classList.add("test");
          newDiv.textContent = "aaa";

          if (newDiv.style) {
            newDiv.style.left = `${x}px`;
            newDiv.style.top = `${y - 5}px`;
          }
          document.body.appendChild(newDiv);

          createRoot(newDiv).render(<div>2222</div>);
        }

        // 말풍선의 위치값 구하기
        let height = -tailRef.current.offsetHeight;
        let width = -tailRef.current.offsetWidth;

        let movePosition = height;
        let bonus = -5;

        if (_position === "bottom") {
          // 배치가 아래를 향할 경우
          height = 20;
          bonus = 5;

          movePosition = height;
        } else if (_position === "left") {
          // 배치가 왼쪽을 향할 경우
          height = height / 2;
          width = width + -25;

          movePosition = width;
          tailRef.current.style.marginLeft = `${width + bonus}px`;
        } else if (_position === "right") {
          // 배치가 오른쪽을 향할 경우
          height = height / 2;
          width = Math.abs(width) + 25;

          movePosition = width;
          bonus = 5;
          tailRef.current.style.marginLeft = `${width + bonus}px`;
        }

        if (useShowAnimation) {
          // 애니메이션 사용중일 경우
          tailRef.current.style.setProperty(
            "--move-start-position",
            `${movePosition}px`
          );
          tailRef.current.style.setProperty(
            "--move-end-position",
            `${movePosition + bonus}px`
          );
        }

        // 말풍선의 최종 위치
        if (!_position || _position === "top" || _position === "bottom")
          tailRef.current.style.marginTop = `${height + bonus}px`;
        else if (_position === "left" || _position === "right") {
          tailRef.current.style.marginTop = `${height + 13}px`;
        }

        setRender(true);
      }
    }
  }, [show, children, position]);

  // 마우스 hover시 말풍선 오픈
  const toggleTail = (bool: boolean) => async () => {
    if (bool === show || loading || isDisable) return;

    // 스테이트 변환 시간
    let timer = 0;

    // 말풍선 애니메이션을 사용한다면
    if (useShowAnimation) {
      // 말풍선을 닫는다면
      if (!bool) {
        loading = true; // 중복 실행 방지
        timer = 250; // 변환 시간 지연

        if (tailRef && tailRef.current) {
          if (!_position || _position === "top" || _position === "bottom")
            tailRef.current.style.animation = "CLOSE_TOOLTIP_TOP 0.3s";
          else tailRef.current.style.animation = "CLOSE_TOOLTIP_LEFT 0.3s";
        }
      }
    }

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
      <_TooltipUIPage
        {...props}
        show={show}
        toggleTail={toggleTail}
        tailRef={tailRef}
        render={render}
        position={_position}
        wrapperRef={wrapperRef}
      />
    </_Error>
  );
}
