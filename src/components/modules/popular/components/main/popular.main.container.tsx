import { useEffect, useRef, memo } from "react";
import { PopularMainPropsTypes, MainRefTypes } from "./popular.main.types";

import PopuplarMainUIPage from "./popular.main.presenter";

let current = 0; // 현재 선택되어 있는 리스트
const timerEvent: { [key: string]: ReturnType<typeof setInterval> } = {}; // 타이머 이벤트 리스트

const PopularMainPage = (props: PopularMainPropsTypes) => {
  const mainRef = useRef() as MainRefTypes;

  const {
    children,
    uuid,
    delay,
    useSwipeMode,
    changeCurrent,
    setList,
    hasChildren,
  } = props;
  const hide = setList?.hide || false;

  // 타이머 제어 함수
  const handler = () => {
    return {
      // 기존에 실행되고 있는 타이머 이벤트 종료
      stop: () => {
        if (timerEvent[uuid]) {
          clearInterval(timerEvent[uuid]);
          delete timerEvent[uuid];
        }
      },
      // 타이머 이벤트 실행
      running: () => {
        if (mainRef.current && mainRef.current.style) {
          // 3초 이하일 경우 최소 3초 적용
          let _delay = delay || 3000;
          if (_delay < 3000) _delay = 3000;

          if (!timerEvent[uuid])
            timerEvent[uuid] = setInterval(rollingHandler, _delay);
        }
      },
      // 첫 위치로 이동
      init: () => {
        if (mainRef.current && mainRef.current.style) {
          current = useSwipeMode ? children.length : 0;
          if (!hide) changeCurrent(current);

          mainRef.current.style.transition = "unset";
          mainRef.current.style.transform = `translateY(-${current * 100}%)`;
        }
      },
      // 롤링 이벤트 실행
      move: (moveCurrent?: number) => {
        if (mainRef.current && mainRef.current.style) {
          current = moveCurrent || current + 1;

          mainRef.current.style.transition = "all 0.25s ease";
          mainRef.current.style.transform = `translateY(-${current * 100}%)`;
        }
      },
    };
  };
  const { stop, running, init, move } = handler();

  // 무한 롤링 이벤트
  const rollingHandler = () => {
    move(); // 아래로 1칸 이동

    // 마지막 리스트에서 첫번째 리스트로 이동할 때
    if (current >= children.length * (Number(useSwipeMode || false) + 1)) {
      current = useSwipeMode ? children.length : 0;
      stop(); // 타이머 중지 후

      setTimeout(() => {
        init(); // 첫 위치로 이동

        running(); // 타이머 재시작
      }, 200);
    }
    if (!hide) changeCurrent(current);
  };

  useEffect(() => {
    // 기존에 실행되고 있는 타이머 이벤트 종료
    if (timerEvent[uuid]) stop();
    if (mainRef.current && mainRef.current.style) {
      init(); // 첫 리스트로 이동
      if (hasChildren) window.setTimeout(running, 50); // 타이머 가동
    }
  }, [children]);

  // presenter 전달용 props 객체
  const UIProps = { ...props, mainRef, stop, running };
  return <PopuplarMainUIPage {...UIProps} />;
};

export default memo(PopularMainPage);
