import { MouseEvent, TouchEvent } from "react";
import SliderListUIPage from "./slider.list.presenter";
import { SliderListTypes } from "./slider.list.types";

// 드래그 일시 정지
let dragDisable = false;
// 드래그 시작 여부
let isStartDrag = false;
// 드래그 시작 위치 (최종 이동 위치 구하기)
let startLocation = 0;
// 이동한 위치 (중복 실행 방지용)
let moveLocation = 0;
// 좌우 이동시 이전 및 다음으로 이동 가능 영역
let limitLocation = { left: 0, right: 0 };
// 마지막으로 이동한 위치
let finalLocation = 0;

export default function SliderListPage(props: SliderListTypes) {
  const {
    useSwipeMode,
    listRef,
    timerRef,
    timerList,
    useAutoPlay,
    useAnimation,
    moveSlider,
    children,
    info,
    stopInfinite,
  } = props;
  const { uid, selector, isFirst, isLast } = info;

  // 모바일 기능 사용 여부
  let useMobile = false;
  // 모바일 스크롤 체크 여부 확인
  let isDisableFixedWindow = false;

  const list = [
    ...children.slice(children.length - 2),
    ...children,
    ...children.slice(0, 2),
  ];

  // 드래그 시작 함수
  const startDrag = (e: MouseEvent & TouchEvent, isMobile?: boolean) => {
    if (useSwipeMode === undefined || dragDisable) return;
    // 시작 위치점
    const pageX = !isMobile ? e.pageX : e.targetTouches[0].pageX;

    isStartDrag = true;
    dragDisable = true;

    if (isMobile) {
      useMobile = true;
      // 스와이프 사용시 스크롤 방지를 위해 현재 다른 모듈에 의해 스크롤이 막혀있는지 체크
      // isDisableFixedWindow = document.body.style?.overflow === "hidden";
      // document.body.style.overflow = "hidden";
    }

    startLocation = Math.floor(pageX);
    if (useAutoPlay && useAutoPlay.delay) {
      // 자동재생 실행중이라면 일시 정지하기

      // 타이머 일시 정지하기
      if (timerRef.current) timerRef.current.classList.add("pause");
      clearInterval(timerList[uid]);
      timerList[uid] = null;
    }

    if (listRef) {
      listRef.current.style.cursor = "grabbing";

      // 좌우 영역 구하기
      const { clientWidth } = listRef.current;
      // 좌우 사이드 이동 퍼센트
      let percent = useSwipeMode.sideMovePercent || 50;
      if (percent < 10) percent = 10; // 최소값 10%
      if (percent > 90) percent = 90; // 최대값 90%

      // 좌우 사이드 이동 퍼센트 구하기 (default : 50%)
      const moveSide = Math.floor(clientWidth * (percent / 100));

      limitLocation = {
        left: moveSide,
        right: -moveSide,
      };
    }

    if (!isMobile) e.preventDefault();
  };

  // 드래그 이동 함수
  const moveDrag = (pageX: number) => {
    if (!useSwipeMode) return;

    if (isStartDrag) {
      // 드래그를 통해 위치를 이동했을 경우
      if (moveLocation !== pageX) {
        moveLocation = pageX;

        // 이동한 최종 위치값
        const moveCompleteLocation = startLocation - moveLocation;
        finalLocation = moveCompleteLocation;

        if (timerRef.current) {
          timerRef.current.classList.add("pause");
        }

        // 이동 가능 여부
        let disableMove = false;
        // 다음 및 이전 스와이프 방지하기
        if (stopInfinite) {
          // 현재 마지막, 첫번째 페이지에서 다음 및 이전으로 이동하려고 하는 경우
          disableMove =
            (isLast && moveCompleteLocation < 0) ||
            (isFirst && moveCompleteLocation > 0);
        }

        if (disableMove) {
          // 이동하지 않음
          finalLocation = 0;
        } else {
          // e.preventDefault();

          // 드래그로 위치 이동하기
          if (listRef && listRef.current) {
            listRef.current.style.transition = "unset";
            listRef.current.style.transform = `translateX(calc(${
              selector * -100
            }% + ${moveCompleteLocation}px))`;
          }
        }
      }
    }
  };

  // 드래그 종료 함수
  const endDrag = () => {
    if (!useSwipeMode) return;

    if (useAnimation && listRef.current?.style) {
      listRef.current.style.transition = "all 0.5s ease";
    }

    // 스크롤 해제
    // if (useMobile && !isDisableFixedWindow) {
    //   document.body.style.overflow = "auto";
    //   isDisableFixedWindow = false;
    // }

    // 맨 마지막 페이지면서 이동을 막아놓은 경우
    const isLastPage = stopInfinite && isLast;

    // 자동재생 실행중이라면 재실행
    if (!isLastPage && useAutoPlay && useAutoPlay.delay) {
      // 타이머 재생하기
      if (timerRef.current) timerRef.current.classList.remove("pause");
      if (!timerList[uid])
        timerList[uid] = setInterval(() => {
          moveSlider({ type: "next", selector })();
        }, (useAutoPlay.delay && useAutoPlay.delay >= 3000 && useAutoPlay.delay) || 3000);
    }

    if (finalLocation && finalLocation >= limitLocation.left) {
      // 오른쪽으로 50% 이상 움직인 경우 = 다음으로 이동
      moveSlider({ type: "prev", selector })();
    } else if (finalLocation && finalLocation <= limitLocation.right) {
      // 왼쪽으로 50% 이상 움직인 경우 = 다음으로 이동
      moveSlider({ type: "next", selector: selector })();
    } else {
      if (listRef && listRef.current && listRef.current.style) {
        listRef.current.style.transition = "all 0.5s ease";
        listRef.current.style.transform = `translateX(calc(${
          selector * -100
        }%))`;
      }
    }

    if (listRef && listRef.current && listRef.current.style) {
      listRef.current.style.cursor = "grab";
    }
    // 모든 드래그 정보 초기화
    isStartDrag = false;
    moveLocation = 0;
    limitLocation = { left: 0, right: 0 };
    finalLocation = 0;

    window.setTimeout(() => {
      dragDisable = false;
    }, 400);
  };

  return (
    <SliderListUIPage
      {...props}
      startDrag={startDrag}
      moveDrag={moveDrag}
      endDrag={endDrag}
      list={list}
    />
  );
}
