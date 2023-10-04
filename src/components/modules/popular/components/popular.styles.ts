import { CSSProperties } from "react";
import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";

// px 문자열 완성하기
const getPx = (px: number) => {
  return `${px}px`;
};

interface StyleTypes {
  minHeight?: {
    web: number;
    mobile?: number;
  };
  isShowAll?: boolean;
  current?: number;
  render?: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  overflow: hidden;

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};

    // 최소 높이값 설정
    if (!props.isShowAll && props.minHeight)
      styles.height = getPx(props.minHeight.web);
    // 전체 보기시 hidden 제거
    if (props.isShowAll) styles.overflow = "unset";

    return styles;
  }}
`;

export const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  border: solid 2px black;
  overflow: hidden;

  ${(props: StyleTypes) =>
    props.minHeight && {
      height: getPx(props.minHeight.web),
    }}
`;

export const ListWrapper = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
`;

export const List = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  height: 100%;

  // 하위 모든 태그의 마진, 패딩값 제거
  * {
    margin: 0;
    padding: 0;
  }
`;

export const Opener = styled(_Button)`
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ::before,
  ::after {
    position: absolute;
    content: "";
    width: 10px;
    height: 3px;
    border-radius: 999px;
    background-color: black;
    transition: all 0.25s ease;
  }

  ::before {
    position: relative;
    transform: rotate(30deg);
    left: 4px;
    /* left: 6px; */

    ${(props: StyleTypes) =>
      props.isShowAll && {
        transform: "rotate(-30deg)",
      }}
  }

  ::after {
    position: relative;
    transform: rotate(-30deg);
    /* right: 6px; */

    ${(props: StyleTypes) =>
      props.isShowAll && {
        transform: "rotate(30deg)",
      }}
  }
`;

export const ListItems = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: ${(props: StyleTypes) => getPx(props.minHeight.web)};
  /* z-index: 11; */
`;

export const AllListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px 0px;
  margin: 0;
  padding: 10px;
  border: solid 2px gray;
  border-top: 0px;
  background-color: white;
`;
