import { Bar } from "./split.bar.styles";
import { splitClassList } from "../split.class";
import { useEffect, useState, memo, MouseEvent, TouchEvent } from "react";

import { SplitBarPropsTypes } from "../split.types";

interface InitBarInfoType {
  action: boolean;
  startLocation: number;
  leftNode: null | HTMLElement;
  rightNode: null | HTMLElement;
}

const initBarInfo: InitBarInfoType = {
  action: false, // 드래그 시작 여부
  startLocation: 0, // 시작 위치 저장
  leftNode: null, // 왼쪽 컴포넌트 node
  rightNode: null, // 오른쪽 컴포넌트 node
};

// Split 거리 조정바 페이지
const SplitBarPage = (props: SplitBarPropsTypes) => {
  const { toggleActive, orderNum, active, uid } = props;
  // bar로 이동시의 정보 저장하기
  const [barInfo, setBarInfo] = useState<InitBarInfoType>(initBarInfo);

  // 이동한 위치
  let moveLocation = 0;

  useEffect(() => {
    if (!active) setBarInfo({ ...barInfo, action: false });
  }, [active]);

  // 드래그 시작
  const startDarg = (pageX: number) => (e: MouseEvent | TouchEvent) => {
    if (barInfo.action) return;

    toggleActive(true);

    const _barInfo = { ...initBarInfo };

    _barInfo.action = true;
    _barInfo.startLocation = pageX;
    _barInfo.leftNode = document.getElementById(
      `split-contents-${uid}-${orderNum - 1}`
    );
    _barInfo.rightNode = document.getElementById(
      `split-contents-${uid}-${orderNum + 1}`
    );

    setBarInfo(_barInfo);

    // 추가적인 드래그 방지 이벤트
    e.preventDefault();
  };

  // 드래그 이동
  const moveDrag = (pageX: number) => {
    if (!barInfo.action) return;

    if (moveLocation !== pageX && barInfo.startLocation) {
      moveLocation = pageX;

      // 최종 이동한 위치값 가져오기
      const move = moveLocation - barInfo.startLocation;

      // 이동 방향
      const moveDirection = move > 0 ? "right" : "left";
    }
  };

  // 드래그 종료
  const endDrag = () => {
    if (!barInfo.action) return;

    toggleActive(false);
    setBarInfo({ ...initBarInfo });
  };

  return (
    <Bar
      className={splitClassList.bar || "mcm-split-bar"}
      style={{ order: orderNum }}
      active={barInfo.action || false}
      onMouseDown={(e) => startDarg(e.pageX)(e)}
      onMouseMove={(e) => moveDrag(e.pageX || 0)}
      onClick={endDrag}
      onTouchStart={(e) => startDarg(e.changedTouches[0].pageX)(e)}
    />
  );
};

export default memo(SplitBarPage);
