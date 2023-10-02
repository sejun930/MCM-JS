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
import { MutableRefObject, useEffect, useRef, useState } from "react";

import { PopularRenderPropsTypes } from "./popular.types";
import { popularClassList } from "./popular.class";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { initPopularInfo } from "./popular.data";

let timerEvent = null;
let current = 0;

export default function _Popular(props: PopularRenderPropsTypes) {
  const { children, className, id, maxHeight, uuid } = props;

  const [info, setInfo] = useState(initPopularInfo);
  const mainRef = useRef() as MutableRefObject<HTMLUListElement>;

  // 전체 리스트 보기 토글 함수
  const toggleAllShow = () => {
    setInfo({ ...info, ["showAll"]: !info.showAll });
  };

  // 상위에 노출될 리스트 (앞 뒤로 2개의 추가 데이터 삽입)
  const mainList = [
    // ...children.slice(-2),
    ...children,
    ...children.slice(0, 2),
  ];

  // 무한 롤링 이벤트
  const rolling = () => {
    const len = children.length;
    let delay = 0;

    if (mainRef.current && mainRef.current?.style) {
      current++;

      // 맨 마지막 리스트에 도달한 경우
      if (current >= len) {
        return reset();
      }
      setInfo({ ...info, current });
    }
  };

  // 타이머 리셋
  const reset = () => {
    window.clearInterval(timerEvent);
    current = 0;

    if (mainRef.current && mainRef.current?.style) {
      //   mainRef.current.style.transition = "unset";
      //   mainRef.current.style.transform = "";
    }

    setInfo({ ...info, current });
  };

  useEffect(() => {
    // 타이머 초기화
    // if (timerEvent) {
    //   reset();
    // }
    // console.log(disable, timerEvent);

    timerEvent = window.setInterval(rolling, 3000);
  }, [children]);

  return (
    <Wrapper
      className={getAllComponentsClassName(popularClassList.wrapper, className)}
      id={id}
      maxHeight={maxHeight}
    >
      <MainWrapper className={popularClassList.mainWrapper}>
        <ListWrapper
          className={popularClassList.mainListWrapper}
          current={info.current}
          maxHeight={maxHeight}
          ref={mainRef}
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
