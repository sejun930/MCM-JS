import { Bar } from "./split.bar.styles";
import { splitClassList } from "../split.class";
import { useEffect, memo, useRef, MutableRefObject, MouseEvent } from "react";
import { SplitBarPropsTypes } from "../split.types";

let startLocation = 0; // 시작 위치 거리값
let maxWidth = 0; // 왼쪽 영역의 전체 크기값
const distance = 10; // 이동 거리

// Split 거리 조정바 페이지
const SplitBarPage = (props: SplitBarPropsTypes) => {
  const barRef = useRef() as MutableRefObject<HTMLLIElement>;
  const { toggleActive, orderNum, active, uid } = props;

  // 이동한 위치
  let moveLocation = 0;

  useEffect(() => {
    // if (!active) setBarInfo({ ...barInfo, action: false });
  }, [active]);

  // 현재 적용되어 있는 스타일 정보 가져오기
  const setWidth = ({ node, move }: { node: HTMLElement; move: number }) => {
    if (node.style && node.style.flexBasis) {
      const split = node.style.flexBasis.split("+");
      const percent = split[0].replace("calc(", "").trim();

      let px = Number(split[1].replace("px)", "").trim()) + move;
      const result = `calc(${percent} + ${px}px)`;

      node.style.flexBasis = result;
    }
  };

  // 드래그 시작
  const startDarg = (e: MouseEvent) => {
    const { pageX } = e;
    toggleActive(true);

    if (barRef && barRef.current) {
      barRef.current.classList?.add("action");
    }

    // 드래그 시작 여부
    // let isStart = true;
    // 왼쪽 영역 저장
    const leftNode = document.getElementById(
      `split-contents-${uid}-${orderNum - 1}`
    );
    // 오른쪽 영역 저장
    const rightNode = document.getElementById(
      `split-contents-${uid}-${orderNum + 1}`
    );
    // 왼쪽 영역의 전체 크기
    // maxWidth = Math.floor(leftNode.getClientRects()[0].width);

    // 시작 위치 저장
    startLocation = pageX;

    // 드래그 이동 이벤트
    const moveDrag = (e) => {
      // 이동한 거리값
      const { clientX } = e;

      // 1px 이상 이동한 경우
      if (startLocation !== clientX) {
        moveLocation = clientX;

        // 이동한 최종 거리값
        const move = moveLocation - startLocation;
        // 이동 방향
        const moveDirection = move > 0 ? "right" : "left";

        if (leftNode && rightNode) {
          if (moveDirection === "left") {
            // 왼쪽으로 이동한 경우 (왼쪽은 -  오른쪽은 +)
            setWidth({ node: leftNode, move: -distance });
            setWidth({ node: rightNode, move: distance });

            startLocation -= distance;
          } else {
            // 오른쪽으로 이동한 경우
            setWidth({ node: leftNode, move: distance });
            setWidth({ node: rightNode, move: -distance });

            startLocation += distance;
          }
        }
      }
      // 추가적인 드래그 방지 이벤트
      e.preventDefault();
    };

    // 드래그 종료 이벤트
    const endDrag = () => {
      startLocation = 0;
      maxWidth = 0;

      if (barRef && barRef.current) {
        barRef.current.classList?.remove("action");
      }

      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("click", endDrag);
    };

    window.addEventListener("mousemove", moveDrag); // 드래그 이동 이벤트
    window.addEventListener("click", endDrag); // 드래그 종료 이벤트
  };

  return (
    <Bar
      className={splitClassList.bar || "mcm-split-bar"}
      style={{ order: orderNum }}
      ref={barRef}
      onMouseDown={startDarg}
      //   onTouchStart={(e) => startDarg(e.changedTouches[0].pageX)(e)}
    />
  );
};

export default memo(SplitBarPage);
