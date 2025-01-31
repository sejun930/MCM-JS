import {
  List,
  Wrapper,
  ListWrapper,
  ListItems,
  Rating,
} from "./popular.styles";
import PopularMainPage from "./main/popular.main.container";

import { _Error, _Button } from "mcm-js-commons";
import { MutableRefObject, memo, useEffect, useRef, useState } from "react";

import { PopularPropsTypes, PopularRenderPropsTypes } from "./popular.types";
import { popularClassList } from "./popular.class";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { v4 } from "uuid";

// 1. Error 처리하기
const _RenderPopular = (props: PopularPropsTypes) => {
  const uuid = v4();

  return (
    <_Error propsList={{ ...props }} requiredList={["list", "minHeight"]}>
      <_Popular {...props} _uuid={uuid} />
    </_Error>
  );
};

let len = 0; // 현재 실행된 모듈의 전체 개수
// 2. 최종 페이지 렌더
function _Popular(props: PopularRenderPropsTypes) {
  const { list, minHeight, className, id, _uuid, setList, changeListEvent } =
    props;

  // 전체 리스트 가리기 여부
  const hide = setList?.hide || false;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  // 전체 리스트 보기 여부
  const [showAll, setShowAll] = useState(false);
  let _showAll = showAll || false;

  // 현재 선택된 리스트 번호
  const [current, setCurrent] = useState(0);
  const [uuid] = useState(_uuid); // uuid 고정

  useEffect(() => {
    // z-index 적용하기
    if (wrapperRef.current && wrapperRef.current.style) {
      // 실행되어 있는 전체 Popular 모듈 가져오기
      const nodes = document.getElementsByClassName("mcm-popular-wrapper");

      // 전체 개수 최초 저장
      if (!len) len = nodes.length;
      wrapperRef.current.style.zIndex = String(len);
      len--; // 1개씩 제거
    }

    return () => {
      document.removeEventListener("click", checkClickWindow);
    };
  }, []);

  // 전체 리스트 보기 토글 함수
  const toggleAllShow = (bool: boolean) => {
    setShowAll(() => {
      if (bool) {
        // 외부 클릭 이벤트 설정
        document.addEventListener("click", checkClickWindow);
      } else {
        // 외부 클릭 이벤트 종료
        document.removeEventListener("click", checkClickWindow);
      }

      _showAll = bool;
      return bool;
    });
  };

  // 외부를 선택했는지 검증, 외부 선택시 전체 리스트 종료하기
  const checkClickWindow = (e: MouseEvent) => {
    if (_showAll) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        toggleAllShow(false);
      }
    } else {
      document.removeEventListener("click", checkClickWindow);
    }
  };

  // 현재 리스트 저장하기
  const changeCurrent = (num: number) => {
    // 변경 감지 이벤트가 있을 경우
    if (changeListEvent !== undefined) changeListEvent(num);

    if (!hide) setCurrent(num);
  };

  // 리스트가 2개 이상인지 검증
  const hasChildren = list.length > 1;

  return (
    <Wrapper
      className={getAllComponentsClassName(popularClassList.wrapper, className)}
      id={id}
      minHeight={minHeight}
      isShowAll={showAll}
      ref={wrapperRef}
    >
      {/* 롤링이 진행되는 메인 페이지 */}
      {uuid && (
        <PopularMainPage
          showAll={showAll}
          toggleAllShow={toggleAllShow}
          uuid={uuid}
          changeCurrent={changeCurrent}
          hasChildren={hasChildren}
          current={current}
          {...props}
        />
      )}
      {hasChildren && showAll && !hide && uuid && (
        <ListWrapper
          minHeight={minHeight}
          className={popularClassList.listWrapper}
        >
          <ListItems
            className={popularClassList.listItems}
            liststyles={setList?.styles || {}}
            listResponsiveStyles={setList?.responsiveStyles || {}}
          >
            {list.map((el, idx) => (
              <List
                key={`mcm-popular-${uuid}-list-${idx}`}
                className={popularClassList.list}
                isSelected={current === idx}
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

export default memo(_RenderPopular);
