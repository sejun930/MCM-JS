import { List, Wrapper, ListItems, AllListWrapper } from "./popular.styles";
import PopularMainPage from "./main/popular.main.container";

import { _Error, _Button } from "mcm-js-commons";
import { useState } from "react";

import { PopularPropsTypes, PopularRenderPropsTypes } from "./popular.types";
import { popularClassList } from "./popular.class";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { initPopularInfo } from "./popular.data";
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
  const {
    children,
    minHeight,
    className,
    id,
    _uuid,
    hideAllList,
    delay,
    useSwipeMode,
  } = props;

  const [info, setInfo] = useState(initPopularInfo);
  const [uuid] = useState(_uuid); // uuid 고정

  // 전체 리스트 보기 토글 함수
  const toggleAllShow = () => {
    setInfo({ ...info, ["showAll"]: !info.showAll });
  };

  return (
    <Wrapper
      className={getAllComponentsClassName(popularClassList.wrapper, className)}
      id={id}
      minHeight={minHeight}
      isShowAll={info.showAll}
    >
      {/* 롤링이 진행되는 메인 페이지 */}
      {uuid && (
        <PopularMainPage
          children={children}
          info={info}
          toggleAllShow={toggleAllShow}
          minHeight={minHeight}
          uuid={uuid}
          delay={delay}
          useSwipeMode={useSwipeMode || false}
        />
      )}
      {info.showAll && !hideAllList && uuid && (
        <ListItems minHeight={minHeight}>
          <AllListWrapper>
            {children.map((el, idx) => (
              <List
                key={`mcm-popular-${uuid}-list-${idx}`}
                id={`mcm-popular-list-${uuid}-${idx}`}
              >
                {el}
              </List>
            ))}
          </AllListWrapper>
        </ListItems>
      )}
    </Wrapper>
  );
}
