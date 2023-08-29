import { useRef, MutableRefObject, useState, useEffect } from "react";
import { SliderPropsTypes, SliderAddProps } from "./slider.types";

import SliderUIPage from "./slider.presenter";
import { _Error, _Button } from "mcm-js-commons";

import { v4 } from "uuid";

// 자동 넘김 반복 이벤트 (컴포넌트 별로 저장)
const timerList: {
  [key: string]: ReturnType<typeof setInterval>;
} = {};

export default function _RenderSlider(props: SliderPropsTypes) {
  const uid = v4();

  return <_Slider {...props} uid={uid} />;
}

const _Slider = (props: SliderPropsTypes & SliderAddProps) => {
  const { children, useAutoPlay, useAnimation, uid, useDragMode } = props;

  const listRef = useRef() as MutableRefObject<HTMLUListElement>;
  const timerRef = useRef() as MutableRefObject<HTMLDivElement>;

  let list: Array<JSX.Element> = [];
  // 슬라이더의 가장 마지막 페이지 넘버
  let lastPage = 0;
  // 슬라이더의 시작 페이지 넘버
  let startPage = 2;
  // 리스트 앞, 뒤로 리스트 구성하기
  if (children) {
    if (Array.isArray(children)) {
      lastPage = children.length + 2;
      list = [
        ...children.slice(children.length - 2),
        ...children,
        ...children.slice(0, 2),
      ];
    }
  }
  // 현재 선택된 슬라이더 위치값
  const [selector, setSelector] = useState(startPage);
  // 일시 중지 변수 (연속 실행 방지)
  const [pause, setPause] = useState(false);

  useEffect(() => {
    setPause(false);
    setSelector(startPage);

    if (selector !== 1)
      moveSlider({ type: "page", page: startPage, selector })();
  }, []);

  // 슬라이더 이동하기
  const moveSlider =
    ({
      type,
      page,
      selector,
    }: {
      type: "next" | "prev" | "page";
      page?: number;
      selector: number;
    }) =>
    () => {
      if (pause) return;
      setPause(true);

      // 자동 넘김을 실행하고 있다면, 자동 넘김 중지
      if (useAutoPlay) {
        // 타이머 일시 정지하기
        if (timerRef.current) timerRef.current.classList.add("pause");
      }

      // 애니메이션 사용시 transition 적용하기
      if (useAnimation) {
        if (listRef.current) listRef.current.style.transition = "all 0.5s ease";
      }

      // 최종적으로 이동할 페이지
      let movePage = page || 0;

      // 애니메이션 사용시, 끝이나 처음 부분에 도달했는지 체크
      let arrived = false;
      if (type === "page" && page) {
        // 페이지를 선택해서 넘어갈 경우
        movePage = page;
      } else if (type === "next") {
        // 다음으로 이동
        movePage = selector + 1;

        // 맨 뒤에 있는 페이지라면, 첫번째 페이지로 이동
        if (!useAnimation && movePage >= lastPage) movePage = startPage;
        // 애니메이션을 사용한다면
        else if (useAnimation && movePage === lastPage) {
          arrived = true;

          // 애니메이션 사용시 : 가장 끝 페이지에 도달했을 때 -> 맨 앞 페이지로 이동
          window.setTimeout(() => {
            if (listRef.current) {
              listRef.current.classList.add("pause-animation");
              listRef.current.style.transform = `translateX(${-200}%)`;
            }
          }, 450);
        }
      } else if (type === "prev") {
        // 앞으로 이동
        movePage = selector - 1;

        // 첫번째 페이지라면, 맨 뒷 페이지로 이동
        if (movePage < startPage) {
          if (!useAnimation) movePage = lastPage - 1;
          else {
            // 애니메이션 사용시
            arrived = true;

            window.setTimeout(() => {
              if (listRef.current) {
                listRef.current.classList.add("pause-animation");
                listRef.current.style.transform = `translateX(${
                  (list.length - 3) * -100
                }%)`;
              }
            }, 450);
          }
        }
      }

      // 최종 저장될 페이지
      let finalSelector = movePage;
      if (arrived) {
        // 슬라이더가 맨 끝 또는 맨 앞에 도달한 적이 있는 경우
        if (movePage === lastPage)
          // 맨 끝에 도달했을 경우
          finalSelector = startPage;
        else if (movePage < startPage)
          // 맨 앞에 도달했을 경우
          finalSelector = lastPage - 1;
      }
      setSelector(finalSelector);

      // 슬라이더 최종 이동하기
      if (listRef.current && listRef.current.style) {
        listRef.current.style.transform = `translateX(calc(${
          movePage * -100
        }%))`;
      }

      // 페이지 이동 후 자동 넘김 실행하기
      if (useAutoPlay) {
        setAutoPlay(finalSelector);

        // 타이머 재개하기
        if (timerRef && timerRef.current)
          window.setTimeout(() => {
            timerRef.current.classList.remove("pause");
          }, 0);
      }
      let timer = useAnimation ? 400 : 100;

      // 다음 페이지 전환시 텀 두기
      window.setTimeout(() => {
        setPause(false);

        if (listRef.current)
          listRef.current.classList.remove("pause-animation");
      }, timer + ((arrived && 100) || 0));
    };

  // 슬라이더 자동 넘김 실행하기
  const setAutoPlay = (selector: number) => {
    if (useAutoPlay) {
      if (timerList[uid]) clearInterval(timerList[uid]);
      // 설정해둔 시간(1초 이상)마다 다음 페이지로 이동 이벤트 시작
      timerList[uid] = setInterval(() => {
        moveSlider({ type: "next", selector })();
      }, (useAutoPlay.delay && useAutoPlay.delay >= 3000 && useAutoPlay.delay) || 3000);
    }
  };

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

  // 드래그 시작 함수
  const startDrag = (pageX: number) => {
    if (!useDragMode || dragDisable) return;
    isStartDrag = true;
    dragDisable = true;

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
      let percent = useDragMode.sideMovePercent || 50;
      if (percent < 10) percent = 10; // 최소값 10%
      if (percent > 90) percent = 90; // 최대값 90%

      // 좌우 사이드 이동 퍼센트 구하기 (default : 50%)
      const moveSide = Math.floor(clientWidth * (percent / 100));

      limitLocation = {
        left: moveSide,
        right: -moveSide,
      };
    }
  };

  // 드래그 이동 함수
  const moveDrag = (pageX: number) => {
    if (!useDragMode) return;

    if (isStartDrag) {
      // 드래그를 통해 위치를 이동했을 경우
      if (moveLocation !== pageX) {
        moveLocation = pageX;

        // 이동한 최종 위치값
        const moveCompleteLocation = -(startLocation - moveLocation);
        finalLocation = moveCompleteLocation;

        // 드래그로 위치 이동하기
        if (listRef && listRef.current) {
          listRef.current.style.transition = "unset";
          listRef.current.style.transform = `translateX(calc(${
            selector * -100
          }% + ${moveCompleteLocation}px))`;
        }
      }
    }
  };

  // 드래그 종료 함수
  const endDrag = () => {
    if (!useDragMode) return;

    if (useAnimation) {
      listRef.current.style.transition = "all 0.5s ease";
    }

    // 자동재생 실행중이라면 재실행
    if (useAutoPlay && useAutoPlay.delay) {
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
      if (listRef) {
        listRef.current.style.transition = "all 0.5s ease";
        listRef.current.style.transform = `translateX(calc(${
          selector * -100
        }%))`;
      }
    }

    if (listRef) {
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
    <_Error
      propsList={{ children }}
      requiredList={["children"]}
      mouduleName="Slider"
    >
      <SliderUIPage
        {...props}
        list={list}
        moveSlider={moveSlider}
        listRef={listRef}
        timerRef={timerRef}
        selector={selector}
        startDrag={startDrag}
        moveDrag={moveDrag}
        endDrag={endDrag}
      />
    </_Error>
  );
};
