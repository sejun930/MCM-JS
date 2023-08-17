import React, { useRef, MutableRefObject, useState, useEffect } from "react";
import styled from "@emotion/styled";

import { _Error, _Button } from "mcm-js-commons";
import { SliderPropsTypes } from "./components/slider.types";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { v4 } from "uuid";

// 자동 넘김 변수
let autoPlay: ReturnType<typeof setInterval> | number;

export default function _Slider(props: SliderPropsTypes) {
  const { children, className, id, pagination, useAutoPlay } = props;
  // 현재 선택된 슬라이더 위치값
  const [selector, setSelector] = useState(1);

  const listRef = useRef() as MutableRefObject<HTMLUListElement>;
  const timerRef = useRef() as MutableRefObject<HTMLDivElement>;

  let list: Array<JSX.Element> = [];
  // 슬라이더의 가장 마지막 페이지 넘버
  let lastPage = 0;
  // 리스트 앞, 뒤로 리스트 구성하기
  if (children) {
    if (Array.isArray(children)) {
      lastPage = children.length;
      list = [children[children.length - 1], ...children, children[0]];
    }
  }

  useEffect(() => {
    if (useAutoPlay) clearInterval(autoPlay);
    // 리스트가 변경되면 무조건 첫번째 페이지로 이동
    if (selector !== 1) moveSlider({ type: "page", page: 1 })();
    // 자동 최초 실행하기
    if (useAutoPlay) setAutoPlay();
  }, [children, useAutoPlay]);

  // 슬라이더 이동하기
  const moveSlider =
    ({ type, page }: { type: "next" | "prev" | "page"; page?: number }) =>
    () => {
      // 자동 넘김을 실행하고 있다면, 자동 넘김 중지
      if (useAutoPlay) {
        clearInterval(autoPlay);

        // 타이머 일시 정지하기
        if (timerRef.current) timerRef.current.classList.add("pause");
      }

      if (type === "page" && page) {
        // 페이지를 선택해서 넘어갈 경우
        if (page && selector !== page) setSelector(page);
      } else if (type === "next") {
        // 다음으로 이동
        setSelector((prev) => (prev + 1 > lastPage ? 1 : prev + 1));
      } else if (type === "prev") {
        // 앞으로 이동
        setSelector((prev) => (prev - 1 < 1 ? lastPage : prev - 1));
      }

      // 페이지 이동 후 자동 넘김 실행하기
      if (useAutoPlay) {
        setAutoPlay();

        // 타이머 재개하기
        if (timerRef.current)
          window.setTimeout(() => {
            timerRef.current.classList.remove("pause");
          }, 0);
      }
    };

  // 슬라이더 자동 넘김 실행하기
  const setAutoPlay = () => {
    if (useAutoPlay) {
      clearInterval(autoPlay);
      // 설정해둔 시간(1초 이상)마다 다음 페이지로 이동 이벤트 시작
      autoPlay = setInterval(() => {
        moveSlider({ type: "next" })();
      }, (useAutoPlay.delay && useAutoPlay.delay >= 1000 && useAutoPlay.delay) || 1000);
    }
  };

  return (
    <_Error
      propsList={{ children }}
      requiredList={["children"]}
      mouduleName="Slider"
    >
      {(list && list.length && Array.isArray(list) && (
        <Wrapper
          className={getAllComponentsClassName("mcm-slider-wrapper", className)}
          id={id}
        >
          <Items className="mcm-slider-items">
            <List left={selector * -100}>
              {list.map((el) => {
                return (
                  <Contents key={v4()} className="mcm-slider-contents">
                    {el}
                  </Contents>
                );
              })}
            </List>
            {useAutoPlay && useAutoPlay.showTimer && useAutoPlay.delay && (
              <Timer
                ref={timerRef}
                className="mcm-slider-timer"
                delay={
                  (useAutoPlay.delay >= 1000 ? useAutoPlay.delay : 1000) / 1000
                }
              />
            )}
          </Items>

          <Pagination className="mcm-slider-pagination-wrapper">
            <_Button
              onClickEvent={moveSlider({ type: "prev" })}
              className="mcm-slider-prev-button"
            >
              ◀
            </_Button>
            {/* 페이지네이션 기능을 사용할 경우 */}
            {pagination && pagination.usePageList && (
              <PageList>
                {Array.from(
                  new Array(children.length),
                  (_, idx) => idx + 1
                ).map((page) => (
                  <Page
                    onClickEvent={moveSlider({ type: "page", page })}
                    key={v4()}
                    selected={selector === page}
                  />
                ))}
              </PageList>
            )}
            <_Button
              onClickEvent={moveSlider({ type: "next" })}
              className="mcm-slider-next-button"
            >
              ▶
            </_Button>
          </Pagination>
        </Wrapper>
      )) || <></>}
    </_Error>
  );
}

interface StyleTypes {
  left?: number;
  selected?: boolean;
  delay?: number;
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Items = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
`;

export const List = styled.ul`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;

  ${(props: StyleTypes) =>
    props.left !== undefined && {
      transform: `translateX(${props.left}%)`,
    }}
`;

export const Contents = styled.li`
  min-width: 100%;
  width: 100%;
  display: flex;
`;

export const Pagination = styled.div`
  width: 100%;
  /* position: absolute; */
  display: flex;
  justify-content: space-between;

  button {
    font-size: 20px;
  }
`;

export const PageList = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 8px;
`;

export const Page = styled(_Button)`
  min-width: 16px;
  height: 16px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 100%;
  opacity: 0.4;
  transition: all 0.2s ease;

  ${(props: StyleTypes) =>
    props.selected && {
      cursor: "default",
      opacity: 1,
    }}
`;

export const Timer = styled.div`
  width: 100%;
  min-height: 20px;
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  /* transform: translateY(-px); */

  @keyframes SLIDER_TIMER_ANIMTAION {
    from {
      min-width: 10px;
    }
    to {
      min-width: 100%;
    }
  }

  ::after {
    content: "";
    position: absolute;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    ${(props: StyleTypes) =>
      props.delay && {
        animation: `SLIDER_TIMER_ANIMTAION ${props.delay}s infinite`,
      }}
  }

  &.pause {
    ::after {
      animation: none;
    }
  }
`;
