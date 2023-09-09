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
import { SliderPropsTypes, SliderUIPropsTypes } from "./slider.types";
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
  selector,
  timerRef,
  useSwipeMode,
  uid,
  timerList,
  hideArrow,
  listMinHeight,
}: SliderPropsTypes & SliderUIPropsTypes) {
  return (
    (children && children.length && Array.isArray(children) && (
      <Wrapper
        className={getAllComponentsClassName(
          sliderClassList.wrapper,
          className
        )}
        id={id}
      >
        <Items className={sliderClassList.items}>
          {!hideArrow && (
            <ArrowButton
              onClickEvent={moveSlider({ type: "prev", selector })}
              className={sliderClassList.prevArrow}
            >
              ◀
            </ArrowButton>
          )}
          <SliderListPage
            useAnimation={useAnimation}
            listRef={listRef}
            timerRef={timerRef}
            useSwipeMode={useSwipeMode}
            uid={uid}
            timerList={timerList}
            useAutoPlay={useAutoPlay}
            selector={selector}
            moveSlider={moveSlider}
            children={children}
            hasPageList={pagination?.showPageList || false}
            listMinHeight={listMinHeight}
          />

          {/* 페이지네이션 기능을 사용할 경우 */}
          {pagination && pagination.showPageList && (
            <Pagination
              className={sliderClassList.pagination}
              style={{ bottom: useAutoPlay?.showTimer && "20px" }}
            >
              {Array.from(new Array(children.length), (_, idx) => idx).map(
                (page) => {
                  page += 2;

                  const selected = selector === page;

                  return (
                    <Page
                      className={sliderClassList.page}
                      onClickEvent={() =>
                        !selected
                          ? moveSlider({
                              type: "page",
                              page,
                              selector,
                            })()
                          : undefined
                      }
                      key={v4()}
                      selected={selected}
                    />
                  );
                }
              )}
            </Pagination>
          )}
          {!hideArrow && (
            <ArrowButton
              onClickEvent={moveSlider({ type: "next", selector })}
              className={sliderClassList.nextArrow}
            >
              ▶
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
