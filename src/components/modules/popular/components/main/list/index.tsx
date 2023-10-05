import { useState, MouseEvent } from "react";
import { popularClassList } from "../../popular.class";
import { MainItems, List, Empty } from "../../popular.styles";
import { PopularMainListPropsTypes } from "../popular.main.types";

let startLocation = 0; // 스와이프 시작 위치

export default function PopularMainListPage(props: PopularMainListPropsTypes) {
  const { mainRef, mainList, uuid, useSwipeMode, hasChildren, stop, running } =
    props;

  // 스와이프 사용중 여부
  const [grabbing, setGrabbing] = useState(false);

  // 스와이프 사용 가능 여부
  const ableUseSwipe = useSwipeMode && hasChildren;

  // 스와이프 사용 함수 모음
  const handler = {
    // 스와이프 시작 함수
    start: (e: MouseEvent) => (y: number) => {
      if (!ableUseSwipe) return;

      // 타이머 이벤트 중지
      stop();
      // grab 커서 변경
      setGrabbing(true);
      // 시작 위치값 저장
      startLocation = y;

      // 커서 유지하기
      document.body.style.cursor = "grabbing";
      // 종료 함수 생성
      window.addEventListener("click", handler.end);
      // 외부 이벤트 차단
      e.preventDefault();
    },
    // 스와이프 이동 함수
    move: () => {
      if (!ableUseSwipe) return;
    },
    // 스와이프 종료 함수
    end: () => {
      if (!ableUseSwipe) return;

      setGrabbing(false);
      startLocation = 0;

      // 타이머 이벤트 재실행
      running();

      document.body.style.cursor = "auto";
      // 종료 함수 삭제
      window.removeEventListener("click", handler.end);
    },
  };
  const { start } = handler;

  return (
    <MainItems
      className={popularClassList.mainItems}
      ref={mainRef}
      isEmpty={!mainList.length}
      ableUseSwipe={ableUseSwipe}
      grabbing={grabbing}
      onMouseDown={(e) => (ableUseSwipe ? start(e)(e.clientY) : undefined)}
    >
      {(mainList.length &&
        mainList.map((el, idx) => (
          <List
            key={`mcm-popular-${uuid}-main-list-${idx}`}
            className={popularClassList.mainList}
          >
            {el}
          </List>
        ))) || <Empty>"children" props가 비어있습니다.</Empty>}
    </MainItems>
  );
}
