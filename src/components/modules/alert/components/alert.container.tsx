import AlertUIPage from "./alert.presenter";

import { AlertAddIProps, AlertPropsType } from "./alert.types";
import { _Error, _SpanText } from "mcm-js-commons";
import { MutableRefObject, useRef } from "react";

export default function _Alert(props: AlertPropsType & AlertAddIProps) {
  const { useCloseMode, sequence, closeAlert, onAfterAlertClose } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  // 스와이프 모드를 사용중인지
  const hasSwipeMode =
    useCloseMode &&
    typeof useCloseMode === "object" &&
    useCloseMode.useSwipeMode;

  // swipe 시작 지점
  let startDistance = 0;
  // swipe 시작 여부
  let isStartSwipe = false;
  // 이동한 위치 (중복 실행 방지용)
  let moveLocation = 0;
  // 다음 작동까지의 딜레이 적용
  let waiting = false;

  // 알럿 닫기 이벤트
  const closeAlertEvent = () => {
    if (useCloseMode) {
      closeAlert(sequence, null, onAfterAlertClose);
    }
  };

  // 스와이프 시작
  const startSwipe = (pageX: number) => {
    if (hasSwipeMode && !waiting) {
      startDistance = pageX;
      isStartSwipe = true;
      waiting = true;
    }
  };

  // 스와이프 이동
  const moveSwipe = (pageX: number, isMobile?: boolean) => {
    if (hasSwipeMode && isStartSwipe) {
      // 이동한 위치값이 1이라도 있을 경우에만 실행
      if (moveLocation !== pageX) {
        moveLocation = pageX;
        const move = startDistance - pageX;

        if (wrapperRef && wrapperRef.current) {
          wrapperRef.current.style.transform = `translate(${move}px, 0px)`;
        }

        // 스와이프로 이동한 거리가 일정 영역을 지났는지 체크 (= 종료 시점 체크)
        const isOver = isMobile
          ? move >= 10 || move <= -10 // 모바일일 경우 좌, 우 10px만 체크
          : Math.abs(move) >= wrapperRef.current.clientWidth / 8; // 웹 버전은 알럿의 전체 크기의 8/1 영역을 지날 경우

        if (isOver) {
          // 좌, 우로 10px 이상 이동할 경우 자동 종료
          isStartSwipe = false;
          closeAlert(sequence, move < 0 ? "left" : "right", onAfterAlertClose);
        }
      }
    }
  };

  // 스와이프 종료
  const endSwipe = () => {
    if (hasSwipeMode && isStartSwipe) {
      isStartSwipe = false;
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
      startSwipe={startSwipe}
      moveSwipe={moveSwipe}
      endSwipe={endSwipe}
      hasSwipeMode={hasSwipeMode}
    />
  );
}
