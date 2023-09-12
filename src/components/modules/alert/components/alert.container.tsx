import AlertUIPage from "./alert.presenter";

import { AlertAddIProps, AlertPropsType } from "./alert.types";
import { _Error, _SpanText } from "mcm-js-commons";
import { MouseEvent, MutableRefObject, useRef } from "react";

export default function _Alert(props: AlertPropsType & AlertAddIProps) {
  const { useCloseMode, sequence, closeAlert } = props;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  // 스와이프 모드를 사용중인지
  const hasSwipeMode =
    useCloseMode &&
    typeof useCloseMode === "object" &&
    useCloseMode.useSwipeMode;

  // swipe 시작 지점
  let startDistance = 0;
  // swipe 시작 여부
  let isStartDrag = false;
  // 이동한 위치 (중복 실행 방지용)
  let moveLocation = 0;
  // 다음 작동까지의 딜레이 적용
  let waiting = false;

  // 알럿 닫기 이벤트
  const closeAlertEvent = (e: MouseEvent) => {
    if (useCloseMode) {
      closeAlert(sequence);
    }
  };

  // (웹버전) 드래그 시작
  const startDrag = (pageX: number) => {
    if (hasSwipeMode && !waiting) {
      startDistance = pageX;
      isStartDrag = true;
      waiting = true;
    }
  };

  // (웹버전) 드래그 이동
  const moveDrag = (pageX: number) => {
    if (hasSwipeMode && isStartDrag) {
      // 이동한 위치값이 1이라도 있을 경우에만 실행
      if (moveLocation !== pageX) {
        moveLocation = pageX;
        const move = startDistance - pageX;

        if (wrapperRef && wrapperRef.current) {
          wrapperRef.current.style.transform = `translate(${move}px, 0px)`;
        }

        // const isOver = Math.abs(move) >= wrapperRef.current.clientWidth / 4;
        // console.log(isOver, Math.abs(move), wrapperRef.current.clientWidth / 4);

        if (move >= 10 || move <= -10) {
          // 좌, 우로 10px 이상 이동할 경우 자동 종료
          isStartDrag = false;
          closeAlert(sequence, move <= -10 ? "left" : "right");
        }
      }
    }
  };

  // (웹버전) 드래그 종료
  const endDrag = () => {
    if (hasSwipeMode && isStartDrag) {
      isStartDrag = false;
      moveLocation = 0;

      // 원래 위치로 이동시키기
      if (wrapperRef && wrapperRef.current) {
        wrapperRef.current.classList.add("animation");
        wrapperRef.current.style.transform = "translate(0px, 0px)";
      }

      window.setTimeout(() => {
        if (wrapperRef && wrapperRef.current)
          wrapperRef.current.classList.remove("animation");
        waiting = false;
      }, 300);
    }
  };

  return (
    <AlertUIPage
      {...props}
      wrapperRef={wrapperRef}
      closeAlertEvent={closeAlertEvent}
      startDrag={startDrag}
      moveDrag={moveDrag}
      endDrag={endDrag}
      hasSwipeMode={hasSwipeMode}
    />
  );
}
