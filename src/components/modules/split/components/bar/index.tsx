import styled from "@emotion/styled";
import { splitClassList } from "../split.class";
import { CSSProperties, MouseEvent, useEffect, useState } from "react";

import { SplitBarPropsTypes } from "../split.types";

// 시작 위치
let startLocation = 0;
// 이동한 위치
let moveLocation = 0;
// 좌우의 현재 위치값
let [left, right] = [0, 0];

let leftNode = null; // 좌측 영역
let rightNode = null; // 우측 영역

// Split 거리 조정바 페이지
export default function SplitBarPage(props: SplitBarPropsTypes) {
  const { orderNum, disActive, toggleDisAction, uid } = props;
  const [active, setActive] = useState(false);

  useEffect(() => {
    // active 해제
    if (disActive) {
      setActive(false);
      toggleDisAction(false);
    }
  }, [disActive]);

  // node 값 가져오기
  const getNode = (isRight?: boolean) => {
    return document.getElementById(`${uid}-${orderNum - (isRight ? -1 : 1)}`);
  };

  // styles 안의 flexBasis 가져오기
  const getStyles = (node: HTMLElement) => {
    return node?.style.flexBasis;
  };

  // 드래그 시작
  const startDarg = (e: MouseEvent) => {
    // 시작 위치 저장
    startLocation = e.pageX;

    // 스타일에서 width 값만 빼오기
    const getWidth = (e: string) => {
      if (e === "auto") return 0;
      else return Number(e.split("+").at(-1).trim().replace("px)", ""));
    };

    if (!leftNode) leftNode = getNode();
    if (!rightNode) rightNode = getNode(true);

    // 왼쪽 영역과 오른쪽 영역의 현재 이동된 위치값 구하기
    left = getWidth(getStyles(leftNode));
    right = getWidth(getStyles(rightNode));

    setActive(true);
  };

  // 드래그 이동
  const moveDrag = (e: MouseEvent) => {
    if (!active) return;
    const { pageX } = e;

    if (moveLocation !== pageX) {
      moveLocation = pageX;

      // 최종 이동한 위치값 가져오기
      const move = moveLocation - startLocation;

      //   let leftWidth = getStyles(leftNode);
      //   let rightWidth = getStyles(rightNode);

      if (move > 0) {
        // console.log(leftWidth, left, move);
        // 오른쪽 이동한 경우 = 오른쪽 영역 -
        // leftWidth = leftWidth.replace(`${left}px`, `${move}px`);
        // left = move;
        // leftNode.style.flexBasis = leftWidth;
        // rightWidth = rightWidth.replace(`${right}px`, `-${move - right}px`);
        // right = -move - right;
        // rightNode.style.flexBasis = rightWidth;
      }
    }
  };

  // 드래그 종료
  const endDrag = () => {
    setActive(false);
  };

  return (
    <Bar
      className={splitClassList.bar || "mcm-split-bar"}
      orderNum={orderNum}
      active={active}
      onMouseDown={(!active && startDarg) || undefined}
      onMouseMove={(active && moveDrag) || undefined}
      onClick={(active && endDrag) || undefined}
    />
  );
}

interface StyleTypes {
  orderNum?: number;
  active?: boolean;
}

export const Bar = styled.div`
  min-width: 1px;
  min-height: 100%;
  background-color: #bbbbbb;
  cursor: col-resize;
  display: flex;
  justify-content: center;

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};

    // 순서 지정
    if (props.orderNum) styles.order = props.orderNum;
    if (props.active) styles.backgroundColor = "#aa5656";

    return styles;
  }}

  ::after {
    content: "";
    position: absolute;
    min-width: 24px;
    height: 100%;
  }
`;
