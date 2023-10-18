import { useRef, MutableRefObject, useState, useEffect, memo } from "react";
import {
  SliderPropsTypes,
  SliderAddProps,
  initSliderInfo,
} from "./slider.types";

import SliderUIPage from "./slider.presenter";
import { _Error, _Button } from "mcm-js-commons";

import { v4 } from "uuid";

// 자동 넘김 반복 이벤트 (컴포넌트 별로 저장)
const timerList: {
  [key: string]: ReturnType<typeof setInterval>;
} = {};

const _RenderSlider = (props: SliderPropsTypes) => {
  const { children } = props;

  const uid = v4();
  return (
    <_Error
      propsList={{ children }}
      requiredList={["children"]}
      mouduleName="Slider"
    >
      <_Slider {...props} _uid={uid} />
    </_Error>
  );
};

const _Slider = (props: SliderPropsTypes & SliderAddProps) => {
  const {
    children,
    useAutoPlay,
    useAnimation,
    _uid,
    firstPage,
    changePageEvent,
  } = props;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const listRef = useRef() as MutableRefObject<HTMLUListElement>;
  const timerRef = useRef() as MutableRefObject<HTMLDivElement>;

  // 슬라이더의 가장 마지막 페이지 넘버
  let lastPage = 0;
  // 슬라이더의 시작 페이지 넘버
  let startPage = 2;

  // 리스트 앞, 뒤로 리스트 구성하기
  if (children) {
    if (Array.isArray(children)) {
      lastPage = children.length + 2;
    }
  }

  // 모듈에 필요한 기능 모음
  const [info, setInfo] = useState({ ...initSliderInfo, ["uid"]: _uid });
  // 일시 중지 변수 (연속 실행 방지)
  const [pause, setPause] = useState(false);

  const { selector, uid } = info;

  useEffect(() => {
    // 정보 초기화
    const _info = { ...initSliderInfo };
    // uid는 고정
    _info.uid = info.uid;

    setInfo(_info);
    startPage = 2;

    // 제일 먼저 시작되는 페이지
    let _firstPage = startPage;
    // 시작 페이지가 정해져 있는 경우
    if (firstPage) {
      // 시작 페이지가 컴포넌트의 개수를 넘지 않고, 0보다 클 경우
      if (children.length >= firstPage && firstPage > 0) {
        _firstPage = firstPage + 1;
      }
    }

    const { selector } = info;
    if (selector !== 1)
      window.setTimeout(() => {
        moveSlider({
          type: "page",
          page: _firstPage,
          selector,
          offAnimtaion: true,
        })();
      }, 0);

    if (wrapperRef && wrapperRef.current)
      wrapperRef.current.style.visibility = "visible";
  }, [firstPage]);

  // 슬라이더 이동하기
  const moveSlider =
    ({
      type,
      page,
      selector,
      offAnimtaion,
    }: {
      type: "next" | "prev" | "page";
      page?: number;
      selector: number;
      offAnimtaion?: boolean; // 애니메이션 일시 비활성화
    }) =>
    () => {
      const _info = { ...info };

      if (pause) return;
      setPause(true);

      // 자동 넘김을 실행하고 있다면, 자동 넘김 중지
      if (useAutoPlay) {
        // 타이머 일시 정지하기
        if (timerRef.current) timerRef.current.classList.add("pause");
      }

      // 애니메이션 사용시 transition 적용하기
      if (listRef.current) {
        if (useAnimation && !offAnimtaion)
          listRef.current.style.transition = "all 0.5s ease";
        else listRef.current.style.transition = "unset";
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
                  (children.length + 4 - 3) * -100
                }%)`;
              }
            }, 450);
          }
        }
      }

      // 현재 페이지가 끝에 도달했는지 체크
      _info.isLast = movePage === lastPage - 1;
      if (_info.isLast) stop();

      // 현재 페이지가 처음에 도착했는지 체크
      _info.isFirst = movePage === startPage;

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
      _info.selector = finalSelector;

      // 슬라이더 최종 이동하기
      if (listRef.current && listRef.current.style) {
        listRef.current.style.transform = `translateX(calc(${
          movePage * -100
        }%))`;
      }

      // 변경 이벤트가 있을 경우, 함수 실행
      if (changePageEvent) changePageEvent(finalSelector - 2);

      if (useAutoPlay && !_info.isLast) {
        // 페이지 이동 후 자동 넘김 실행하기
        setAutoPlay(finalSelector);

        // 타이머 재개하기
        if (timerRef && timerRef.current)
          window.setTimeout(() => {
            timerRef.current.classList.remove("pause");
          }, 0);
      }
      let timer = useAnimation && !offAnimtaion ? 400 : 100;

      // 다음 페이지 전환시 텀 두기
      window.setTimeout(() => {
        setPause(false);

        if (listRef.current)
          listRef.current.classList.remove("pause-animation");
      }, timer + ((arrived && 100) || 0));
      setInfo(_info);
    };

  // 슬라이더 자동 넘김 실행하기
  const setAutoPlay = (selector: number) => {
    if (useAutoPlay) {
      // 페이지 전환 정지
      stop();

      // 설정해둔 시간(1초 이상)마다 다음 페이지로 이동 이벤트 시작
      timerList[uid] = setInterval(() => {
        moveSlider({ type: "next", selector })();
      }, (useAutoPlay.delay && useAutoPlay.delay >= 3000 && useAutoPlay.delay) || 3000);
    }
  };

  // 페이지 자동 전환 중지
  const stop = () => {
    if (timerList[uid]) clearInterval(timerList[uid]);
  };

  return (
    <SliderUIPage
      {...props}
      moveSlider={moveSlider}
      listRef={listRef}
      timerRef={timerRef}
      info={info}
      timerList={timerList}
      wrapperRef={wrapperRef}
    />
  );
};

export default memo(_RenderSlider);
