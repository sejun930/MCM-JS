import React from "react";
import {
  ArrowButton,
  Contents,
  Items,
  List,
  Page,
  Pagination,
  Timer,
  Wrapper,
} from "./slider.styles";

import { v4 } from "uuid";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";
import { SliderPropsTypes, SliderUIPropsTypes } from "./slider.types";
import { sliderClassList } from "./slider.class";

export default function SliderUIPage({
  children,
  list,
  className,
  id,
  moveSlider,
  useAnimation,
  listRef,
  pagination,
  useAutoPlay,
  selector,
  timerRef,
  useDragMode,
  startDrag,
  moveDrag,
  endDrag,
}: SliderPropsTypes & SliderUIPropsTypes) {
  return (
    (list && list.length && Array.isArray(list) && (
      <Wrapper
        className={getAllComponentsClassName(
          sliderClassList.wrapper,
          className
        )}
        id={id}
      >
        <Items className={sliderClassList.items}>
          <ArrowButton
            onClickEvent={moveSlider({ type: "prev", selector })}
            className={sliderClassList.prevArrow}
          >
            ◀
          </ArrowButton>
          <List
            className={sliderClassList.list}
            useAnimation={useAnimation}
            ref={listRef}
            useDragMode={useDragMode !== undefined}
            onMouseDown={(e) => useDragMode && startDrag(e.pageX || 0)}
            onMouseMove={(e) => useDragMode && moveDrag(e.pageX || 0)}
            onClick={(useDragMode && endDrag) || undefined}
            onTouchStart={(e) =>
              useDragMode && startDrag(e.targetTouches[0].pageX || 0)
            }
            onTouchMove={(e) =>
              useDragMode && moveDrag(e.targetTouches[0].pageX || 0)
            }
            onTouchEnd={(useDragMode && endDrag) || undefined}
          >
            {list.map((el) => (
              <Contents key={v4()} className={sliderClassList.contents}>
                {el}
              </Contents>
            ))}
          </List>

          {/* 페이지네이션 기능을 사용할 경우 */}
          {pagination && pagination.showPageList && (
            <Pagination
              className={sliderClassList.pagination}
              style={{ bottom: useAutoPlay?.showTimer ? "30px" : "10px" }}
            >
              {Array.from(new Array(children.length), (_, idx) => idx).map(
                (page) => {
                  page += 2;

                  return (
                    <Page
                      className={sliderClassList.page}
                      onClickEvent={moveSlider({
                        type: "page",
                        page,
                        selector,
                      })}
                      key={v4()}
                      selected={selector === page}
                    />
                  );
                }
              )}
            </Pagination>
          )}
          <ArrowButton
            onClickEvent={moveSlider({ type: "next", selector })}
            className={sliderClassList.nextArrow}
          >
            ▶
          </ArrowButton>
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
