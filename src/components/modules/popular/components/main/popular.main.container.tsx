import { useEffect, useRef } from "react";
import { PopularMainPropsTypes, MainRefTypes } from "./popular.main.types";

import PopuplarMainUIPage from "./popular.main.presenter";

const timerEvent: { [key: string]: ReturnType<typeof setInterval> } = {}; // 타이머 이벤트 리스트
export default function PopularMainPage(props: PopularMainPropsTypes) {
  const mainRef = useRef() as MainRefTypes;

  const { list, uuid, delay, changeCurrent, setList, hasChildren, current } =
    props;

  const hide = setList?.hide || false;
  let render = false; // 최초 렌더 여부
  let _current = 0; // 현재 선택되어 있는 리스트

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
          // 2초 이하일 경우 최소 2초 적용
          let _delay = delay || 2000;
          if (_delay < 2000 || typeof _delay !== "number") _delay = 2000;

          if (!timerEvent[uuid])
            timerEvent[uuid] = setInterval(rollingHandler, _delay);
        }
      },
      // 첫 위치로 이동
      init: () => {
        if (mainRef.current && mainRef.current.style) {
          _current = 0;
          if (!hide) changeCurrent(0);

          mainRef.current.style.transition = "unset";
          mainRef.current.style.transform = `translateY(-${
            _current * 100
            // currentList[uuid] * 100
          }%)`;
        }
      },
      // 롤링 이벤트 실행
      move: () => {
        if (mainRef.current && mainRef.current.style) {
          // currentList[uuid] = moveCurrent || currentList[uuid] + 1;
          _current++;

          mainRef.current.style.transition = "all 0.25s ease";
          mainRef.current.style.transform = `translateY(-${
            _current * 100
            // currentList[uuid] * 100
          }%)`;
        }
      },
    };
  };
  const { stop, running, init, move } = handler();

  // 무한 롤링 이벤트
  const rollingHandler = () => {
    move(); // 아래로 1칸 이동

    // 마지막 리스트에서 첫번째 리스트로 이동할 때
    if (_current > list.length - 1) {
      stop(); // 타이머 중지 후

      setTimeout(() => {
        init(); // 첫 위치로 이동

        running(); // 타이머 재시작
      }, 150);
      // 그 외의 경우 + 리스트를 보이고 있을 경우
    } else if (!hide) changeCurrent(_current);
  };

  useEffect(() => {
    // 기존에 실행되고 있는 타이머 이벤트 종료
    if (timerEvent[uuid]) stop();
    if (mainRef.current && mainRef.current.style && !render) {
      render = true;
      init(); // 첫 리스트로 이동
      if (hasChildren) window.setTimeout(running, 50); // 타이머 가동
    }
  }, [list]);

  // _current 변경
  const changeTempCurrent = (num: number) => {
    _current = num;
  };

  // presenter 전달용 props 객체
  const UIProps = { ...props, mainRef, stop, running };
  return (
    <PopuplarMainUIPage
      {...UIProps}
      current={current}
      changeTempCurrent={changeTempCurrent}
    />
  );
}
