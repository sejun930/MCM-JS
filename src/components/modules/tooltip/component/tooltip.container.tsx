import React from "react";

import _TooltipUIPage from "./tooltip.presenter";

import { _Error } from "mcm-js-commons";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import { TooltipPropsType } from "./tooltip.types";
import { positionList } from "./tooltip.data";

// position의 종류가 아래의 4가지에 일치하는지 검증
const filterPosition = ["top", "bottom", "left", "right"];
// 추가 설명을 위한 말풍선 모듈
export default function _Tooltip(props: TooltipPropsType) {
  // 중복 실행 방지 변수
  let loading = false;

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
        const currentPosition = positionList[_position || "top"];

        if (useShowAnimation) {
          // 애니메이션 사용중일 경우

          // 시작 기준점
          tailRef.current.style.setProperty(
            `--move-start-${currentPosition.target}`,
            `${currentPosition.startPoint}%`
          );
          // 종료 기준점
          tailRef.current.style.setProperty(
            `--move-end-${currentPosition.target}`,
            `100%`
          );
        }

        // 말풍선의 최종 위치
        if (tailRef.current.style)
          tailRef.current.style[currentPosition.target] = "100%";

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
            // 위 또는 아래 방향일 때
            tailRef.current.style.animation = "CLOSE_TOOLTIP_TOP 0.3s";
          // 왼쪽 또는 오른쪽 방향일 때
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
      />
    </_Error>
  );
}
