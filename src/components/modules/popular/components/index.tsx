import {
  List,
  Wrapper,
  ListWrapper,
  ListItems,
  Rating,
} from "./popular.styles";
import PopularMainPage from "./main/popular.main.container";

import { _Error, _Button } from "mcm-js-commons";
import { useState } from "react";

import { PopularPropsTypes, PopularRenderPropsTypes } from "./popular.types";
import { popularClassList } from "./popular.class";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { v4 } from "uuid";

// 1. Error 처리하기
export default function _RenderPopular(props: PopularPropsTypes) {
  const uuid = v4();

  return (
    <_Error propsList={{ ...props }} requiredList={["children", "minHeight"]}>
      <_Popular {...props} _uuid={uuid} />
    </_Error>
  );
}

// 2. 최종 페이지 렌더
function _Popular(props: PopularRenderPropsTypes) {
  const { children, minHeight, className, id, _uuid, setList, useSwipeMode } =
    props;

  const hide = setList?.hide || false;

  // 전체 리스트 보기 여부
  const [showAll, setShowAll] = useState(false);
  // 현재 선택된 리스트 번호
  const [current, setCurrent] = useState(0);
  const [uuid] = useState(_uuid); // uuid 고정

  // 전체 리스트 보기 토글 함수
  const toggleAllShow = () => {
    setShowAll((prev) => !prev);
  };

  // 현재 리스트 저장하기
  const changeCurrent = (num: number) => {
    if (!hide) setCurrent(num);
  };

  // 실제로 현재 선택되어 있는 리스트
  let realCur = current;
  if (useSwipeMode) realCur -= children.length;

  // 리스트가 2개 이상인지 검증
  const hasChildren = children.length > 1;

  return (
    <Wrapper
      className={getAllComponentsClassName(popularClassList.wrapper, className)}
      id={id}
      minHeight={minHeight}
      isShowAll={showAll}
    >
      {/* 롤링이 진행되는 메인 페이지 */}
      {uuid && (
        <PopularMainPage
          showAll={showAll}
          toggleAllShow={toggleAllShow}
          uuid={uuid}
          changeCurrent={changeCurrent}
          hasChildren={hasChildren}
          {...props}
        />
      )}
      {hasChildren && showAll && !hide && uuid && (
        <ListWrapper
          minHeight={minHeight}
          className={popularClassList.listWrapper}
        >
          <ListItems className={popularClassList.listItems}>
            {children.map((el, idx) => (
              <List
                key={`mcm-popular-${uuid}-list-${idx}`}
                className={popularClassList.list}
                isSelected={realCur === idx}
                hoverStyles={setList?.hoverStyles}
                isList={true}
              >
                {setList?.showRating && (
                  <Rating className={popularClassList.rating}>
                    {String(idx + 1).padStart(2, "0")}.
                  </Rating>
                )}
                {el}
              </List>
            ))}
          </ListItems>
        </ListWrapper>
      )}
    </Wrapper>
  );
}
