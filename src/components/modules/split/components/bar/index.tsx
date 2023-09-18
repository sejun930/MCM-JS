import { Bar } from "./split.bar.styles";
import { splitClassList } from "../split.class";
import { MouseEvent, useEffect } from "react";

import { SplitBarPropsTypes } from "../split.types";

// 시작 위치
let startLocation = 0;
// 이동한 위치
let moveLocation = 0;

let _active = false;

// Split 거리 조정바 페이지
export default function SplitBarPage(props: SplitBarPropsTypes) {
  const { orderNum, active, toggleActive, uid } = props;

  // 드래그 시작
  const startDarg = (e: MouseEvent) => {
    // 시작 위치 저장
    startLocation = e.pageX;
    // 이동 활성화 표시
    if (e.currentTarget) e.currentTarget.classList.add("active");

    _active = true;

    const wrapper = document.getElementsByClassName("mcm-split-wrapper");
  };

  // 드래그 이동
  const moveDrag = (e: MouseEvent) => {
    if (!_active) return;
    const { pageX } = e;

    if (moveLocation !== pageX) {
      moveLocation = pageX;

      // 최종 이동한 위치값 가져오기
      const move = moveLocation - startLocation;
      // 이동 방향
      const moveDirection = move > 0 ? "right" : "left";
    }
  };

  // 드래그 종료
  const endDrag = (e: MouseEvent) => {
    if (!_active) return;
    if (e.currentTarget) e.currentTarget.classList.remove("active");
    _active = false;
  };

  return (
    <Bar
      className={splitClassList.bar || "mcm-split-bar"}
      style={{ order: orderNum }}
      active={active}
      onMouseDown={startDarg}
      onMouseMove={moveDrag}
      onClick={endDrag}
    />
  );
}
