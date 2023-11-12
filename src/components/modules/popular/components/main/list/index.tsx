import { useState, MouseEvent, TouchEvent, ReactNode } from "react";

import { popularClassList } from "../../popular.class";
import { MainItems, List, Empty, MainContents } from "../../popular.styles";
import { PopularMainListPropsTypes } from "../popular.main.types";
import { initPopularMainListInfo } from "./popular.main.list.data";

// 스와이프 이동 정보 및 사용 가능 여부 모음
let popularMainListInfo = { ...initPopularMainListInfo };
let { disable, _isMobile, moveCurrent, startLocation, moveLocation } =
  popularMainListInfo;

export default function PopularMainListPage(props: PopularMainListPropsTypes) {
  const {
    mainRef,
    mainList,
    uuid,
    useSwipeMode,
    hasChildren,
    stop,
    running,
    minHeight,
    current,
    changeCurrent,
    changeTempCurrent,
  } = props;
  // 스크롤 방지 여부 체크
  let isDisableFixedWindow = false;

  // 스와이프 사용중 여부
  const [grabbing, setGrabbing] = useState(false);

  // 스와이프 사용 가능 여부
  const ableUseSwipe = useSwipeMode && hasChildren;

  // 스와이프 사용 함수 모음
  const handler = {
    // 스와이프 시작 함수
    start: (e: MouseEvent | TouchEvent) => (y: number, isMobile?: boolean) => {
      if (!ableUseSwipe || disable) return;
      _isMobile = isMobile || false;
      moveCurrent = current;

      // 타이머 이벤트 중지
      stop();
      // grab 커서 변경
      setGrabbing(true);
      // 시작 위치값 저장
      startLocation = Math.floor(y);

      // 커서 유지하기
      document.body.style.cursor = "grabbing";
      // 종료 함수 생성
      window.addEventListener(_isMobile ? "touchend" : "click", handler.end);
      // 이동 함수 설정
      window.addEventListener(
        _isMobile ? "touchmove" : "mousemove",
        handler.move,
        { passive: _isMobile }
      );
      // 스크롤 방지
      if (_isMobile) {
        // 다른 모듈의 영향에 의해 스크롤이 제어되고 있는지 체크
        isDisableFixedWindow = document.body.style?.overflow === "hidden";
        document.body.style.overflow = "hidden";
      }

      // 외부 이벤트 차단
      if (!_isMobile) e.preventDefault();
    },

    // 스와이프 이동 함수
    move: (e) => {
      if (!ableUseSwipe) return;

      // 이동한 위치값 가져오기
      const y = Math.floor(
        !_isMobile ? e.clientY : e.changedTouches[0].clientY
      );
      // 이동한 위치 체크 (중복 방지)
      if (moveLocation !== y) {
        moveLocation = y;
        disable = true;

        // 첫 시작 위치 - 이동한 위치 = 최종 이동한 거리
        const location = startLocation - moveLocation;
        // 웹, 모바일 버전의 최소 높이값 (모바일이 없으면 웹을 기준으로 함)
        let moveAverage = minHeight.web;
        // 모바일 버전의 최소 높이값이 있는 경우
        if (minHeight?.mobile && _isMobile) moveAverage = minHeight.mobile;

        // 위, 아래 공백 ( 최소 높이값의 3/1 )
        let bonus = Math.floor(moveAverage / 3);
        if (location < 0) bonus *= -1;

        // 리스트를 얼마나 건너뛰었는지 체크
        const moveRange = Math.round(-(location - bonus) / moveAverage);

        // 건너뛴 리스트 종합
        const moveResult = current + moveRange;

        // 스와이프 이동 가능 여부
        let ableMove = true;

        if (location > 0) {
          // 이전 페이지로 이동할 경우

          // 첫번째 리스트부터 시작한다면
          if (!current) ableMove = false;
          // 두번째 이상 리스트에서 첫번째를 넘어서는 리스트로 이동하려고 하는 경우
          if (moveResult <= 0 && location >= moveAverage * current)
            ableMove = false;
        } else {
          // 다음 페이지로 이동할 경우

          // 마지막 리스트에서 다음으로 이동할 경우
          if (location <= -((mainList.length - (2 + current)) * moveAverage)) {
            ableMove = false;
          }
        }

        if (ableMove) {
          if (mainRef.current && mainRef.current.style) {
            moveCurrent = moveResult;

            mainRef.current.style.transition = "unset";
            mainRef.current.style.transform = `translateY(calc(-${
              100 * current
            }% + ${location}px))`;
          }
        }
      }
      //   }
    },
    // 스와이프 종료 함수
    end: () => {
      if (!ableUseSwipe) return;

      setGrabbing(false);
      // 정보 초기화
      popularMainListInfo = { ...initPopularMainListInfo };
      // 스크롤 해제
      if (_isMobile && !isDisableFixedWindow) {
        document.body.style.overflow = "auto";
        isDisableFixedWindow = false;
      }

      if (mainRef.current && mainRef.current.style) {
        mainRef.current.style.transition = "all 0.25s ease 0s";
        mainRef.current.style.transform = `translateY(-${100 * moveCurrent}%)`;

        changeCurrent(moveCurrent);
        changeTempCurrent(moveCurrent);
      }

      running();
      window.setTimeout(() => {
        // 타이머 이벤트 재실행
        disable = false;
      }, 300);

      document.body.style.cursor = "auto";
      // 종료 함수 삭제
      window.removeEventListener(_isMobile ? "touchend" : "click", handler.end);

      // 이동 함수 삭제
      window.removeEventListener(
        _isMobile ? "touchmove" : "mousemove",
        handler.move
      );
    },
  };
  const { start } = handler;

  // 리스트 내용 출력하기
  const renderListContents = (el: string | ReactNode) => {
    // 문자열만 전달되었다면 p태그에 렌더, 컴포넌트라면 원래 형태로 렌더
    return typeof el === "string" ? (
      <MainContents className={popularClassList.mainContents}>
        {el}
      </MainContents>
    ) : (
      el
    );
  };

  return (
    <MainItems
      className={popularClassList.mainItems}
      ref={mainRef}
      isEmpty={!mainList.length}
      ableUseSwipe={ableUseSwipe}
      grabbing={grabbing}
      onMouseDown={(e) => (ableUseSwipe ? start(e)(e.clientY) : undefined)}
      onTouchStart={(e) =>
        ableUseSwipe ? start(e)(e.changedTouches[0].clientY, true) : undefined
      }
    >
      {(mainList.length &&
        mainList.map((el, idx) => (
          <List
            key={`mcm-popular-${uuid}-main-list-${idx}`}
            className={popularClassList.mainList}
          >
            {renderListContents(el)}
          </List>
        ))) || <Empty>"children" props가 비어있습니다.</Empty>}
    </MainItems>
  );
}
