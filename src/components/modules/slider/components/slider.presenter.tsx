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
          >
            {list.map((el) => {
              return (
                <Contents key={v4()} className={sliderClassList.contents}>
                  {el}
                </Contents>
              );
            })}
          </List>

          {/* 페이지네이션 기능을 사용할 경우 */}
          {pagination && pagination.showPageList && (
            <Pagination
              className={sliderClassList.pagination}
              style={{ bottom: useAutoPlay?.showTimer ? "30px" : "10px" }}
            >
              {Array.from(new Array(children.length), (_, idx) => idx).map(
                (page) => {
                  page += useAnimation ? 2 : 0;

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
