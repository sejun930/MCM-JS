import _TooltipUIPage from "./tooltip.presenter";

import { _Error } from "mcm-js-commons";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import { TooltipPropsType } from "./tooltip.types";

// 추가 설명을 위한 말풍선 모듈
export default function _Tooltip(props: TooltipPropsType) {
  // 중복 실행 방지 변수
  let loading = false;

  // 말풍선 ref
  const tailRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { children, tooltipText, useShowAnimation, isDisable, position } =
    props;

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
        // 말풍선의 위치값 구하기
        let height = -tailRef.current.offsetHeight;
        let width = -tailRef.current.offsetWidth;

        let movePosition = height;
        let bonus = -5;

        if (position === "bottom") {
          // 배치가 아래를 향할 경우
          height = 20;
          bonus = 5;

          movePosition = height;
        } else if (position === "left") {
          // 배치가 왼쪽을 향할 경우
          height = height / 2;
          width = width + -25;

          movePosition = width;
          tailRef.current.style.marginLeft = `${width + bonus}px`;
        } else if (position === "right") {
          // 배치가 오른쪽을 향할 경우
          height = height / 2;
          width = Math.abs(width) + 25;

          movePosition = width;
          bonus = 5;
          tailRef.current.style.marginLeft = `${width + bonus}px`;

          console.log(movePosition, bonus);
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
        if (!position || position === "top" || position === "bottom")
          tailRef.current.style.marginTop = `${height + bonus}px`;
        else if (position === "left" || position === "right") {
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
          if (!position || position === "top" || position === "bottom")
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
      />
    </_Error>
  );
}
