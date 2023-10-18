import {
  ArrowButton,
  Items,
  Page,
  Pagination,
  Timer,
  Wrapper,
} from "./slider.styles";

import { v4 } from "uuid";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";
import {
  SliderPropsTypes,
  SliderUIPropsTypes,
  WrapperRef,
} from "./slider.types";
import { sliderClassList } from "./slider.class";

import SliderListPage from "./list/slider.list.container";

export default function SliderUIPage({
  children,
  className,
  id,
  moveSlider,
  useAnimation,
  listRef,
  pagination,
  useAutoPlay,
  timerRef,
  info,
  useSwipeMode,
  timerList,
  listMinHeight,
  wrapperRef,
  setArrow,
  stopInfinite,
}: SliderPropsTypes & SliderUIPropsTypes & WrapperRef) {
  const { selector, isFirst, isLast } = info;

  // 좌, 우 이동 버튼 모양
  const arrowContents: {
    left: string | JSX.Element;
    right: string | JSX.Element;
  } = { left: "◀", right: "▶" };

  // 대체용 버튼이 존재할 경우
  if (setArrow && setArrow?.contents) {
    arrowContents.left = setArrow?.contents.left || "◀"; // 이전 버튼 대체
    arrowContents.right = setArrow?.contents.right || "▶"; // 다음 버튼 대체
  }

  const disablePrev = (stopInfinite && isFirst) || false; // 이전 버튼 비활성화
  const disableNext = (stopInfinite && isLast) || false; // 다음 버튼 비활성화

  return (
    (children && children.length && Array.isArray(children) && (
      <Wrapper
        className={getAllComponentsClassName(
          sliderClassList.wrapper,
          className
        )}
        id={id}
        ref={wrapperRef}
        isSetHoverArrow={setArrow?.showHover || false}
      >
        <Items
          className={sliderClassList.items}
          hideMobile={setArrow?.hideMobile || false}
        >
          {!setArrow?.hide && (
            <ArrowButton
              onClickEvent={
                !disablePrev && moveSlider({ type: "prev", selector })
              }
              className={`${sliderClassList.arrow} ${sliderClassList.prevArrow}`}
              isDisable={disablePrev}
            >
              {arrowContents.left}
            </ArrowButton>
          )}
          <SliderListPage
            useAnimation={useAnimation}
            listRef={listRef}
            timerRef={timerRef}
            useSwipeMode={useSwipeMode}
            timerList={timerList}
            useAutoPlay={useAutoPlay}
            moveSlider={moveSlider}
            children={children}
            hasPageList={pagination?.showPageList || false}
            listMinHeight={listMinHeight}
            info={info}
            stopInfinite={stopInfinite}
          />

          {/* 페이지네이션 기능을 사용할 경우 */}
          {pagination && pagination.showPageList && (
            <Pagination
              className={sliderClassList.pagination}
              style={{ bottom: useAutoPlay?.showTimer && "20px" }}
              hideMobile={pagination?.hideMobile || false}
            >
              {Array.from(new Array(children.length), (_, idx) => idx).map(
                (page) => {
                  page += 2;

                  // 현재 선택되어 있는 페이지 표시
                  const isSelected = selector === page;

                  return (
                    <Page
                      className={sliderClassList.page}
                      // @ts-ignore
                      isSelected={isSelected}
                      onClickEvent={() =>
                        !isSelected &&
                        moveSlider({
                          type: "page",
                          page,
                          selector,
                        })()
                      }
                      key={v4()}
                    />
                  );
                }
              )}
            </Pagination>
          )}
          {!setArrow?.hide && (
            <ArrowButton
              onClickEvent={
                !disableNext && moveSlider({ type: "next", selector })
              }
              className={`${sliderClassList.arrow} ${sliderClassList.nextArrow}`}
              isDisable={disableNext}
            >
              {arrowContents.right}
            </ArrowButton>
          )}
          {useAutoPlay && useAutoPlay.showTimer && useAutoPlay.delay && (
            <Timer
              ref={timerRef}
              className={sliderClassList.timer}
              delay={
                (useAutoPlay.delay >= 3000 ? useAutoPlay.delay : 3000) / 1000
              }
            />
          )}
        </Items>
      </Wrapper>
    )) || <></>
  );
}
