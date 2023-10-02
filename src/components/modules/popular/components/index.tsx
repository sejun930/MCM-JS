import {
  List,
  ListWrapper,
  MainWrapper,
  Opener,
  Wrapper,
  ListItems,
  AllListWrapper,
} from "./popular.styles";

import { _Error, _Button } from "mcm-js-commons";
import { useState } from "react";

import { PopularRenderPropsTypes } from "./popular.types";
import { popularClassList } from "./popular.class";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { initPopularInfo } from "./popular.data";

export default function _Popular(props: PopularRenderPropsTypes) {
  const { children, className, id, maxHeight, uuid } = props;

  const [info, setInfo] = useState(initPopularInfo);

  // 전체 리스트 보기 토글 함수
  const toggleAllShow = () => {
    setInfo({ ...info, ["showAll"]: !info.showAll });
  };

  // 상위에 노출될 리스트 (앞 뒤로 2개의 추가 데이터 삽입)
  const mainList = [
    ...children.slice(-2),
    ...children,
    ...children.slice(0, 2),
  ];

  return (
    <Wrapper
      className={getAllComponentsClassName(popularClassList.wrapper, className)}
      id={id}
      maxHeight={maxHeight}
    >
      <MainWrapper className={popularClassList.mainWrapper}>
        <ListWrapper
          className={popularClassList.mainListWrapper}
          current={info.current || 2}
          maxHeight={maxHeight}
        >
          {mainList.map((el, idx) => (
            <List
              key={`mcm-popular-${uuid}-main-list-${idx}`}
              className={popularClassList.mainList}
            >
              {el}
            </List>
          ))}
        </ListWrapper>
        <Opener
          className={popularClassList.opener}
          onClickEvent={toggleAllShow}
          isShowAll={info.showAll}
        />
      </MainWrapper>
      {info.showAll && (
        <ListItems maxHeight={maxHeight}>
          <AllListWrapper>
            {children.map((el, idx) => (
              <List key={`mcm-popular-${uuid}-list-${idx}`}>{el}</List>
            ))}
          </AllListWrapper>
        </ListItems>
      )}
    </Wrapper>
  );
}
