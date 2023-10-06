import { CSSProperties } from "react";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import styled from "@emotion/styled";
import { _Button, _SpanText } from "mcm-js-commons";

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
  isSelected?: boolean;
  hoverStyles?: CSSProperties;
  isList?: boolean;
  isEmpty?: boolean;
  ableUseSwipe?: boolean; // 스와이프 사용 가능 여부
  grabbing?: boolean; // 스와이프 사용 중 여부
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

  @media ${breakPoints.mobileLarge} {
    ${(props) =>
      !props.isShowAll &&
      props.minHeight &&
      props.minHeight?.mobile && {
        height: getPx(props.minHeight.mobile),
      }}
  }
`;

export const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  border: solid 2px black;
  overflow: hidden;
  height: 100%;

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};

    // 높이값 지정
    if (props.minHeight.web) styles.height = getPx(props.minHeight.web);

    return styles;
  }}

  @media ${breakPoints.mobileLarge} {
    ${(props) =>
      props.minHeight &&
      props.minHeight?.mobile && {
        height: getPx(props.minHeight.mobile),
      }}
  }
`;

export const MainItems = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};

    if (props.minHeight) styles.height = getPx(props.minHeight.web);

    // 리스트가 비어있는 경우
    if (props.isEmpty) styles.cursor = "not-allowed";
    if (props.ableUseSwipe) {
      styles.cursor = "grab";
      if (props.grabbing) styles.cursor = "grabbing";
    }

    return styles;
  }}
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

  ${(props: StyleTypes) => {
    let styles: CSSProperties & { [key: string]: string | number } = {};

    if (props.isList) styles.color = "#777777";
    if (props.isSelected) {
      if (props.hoverStyles) styles = { ...props.hoverStyles };
      else
        styles = {
          color: "#aa5656 !important",
          fontWeight: 700,
        };
    }

    return styles;
  }}
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

export const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: ${(props: StyleTypes) => getPx(props.minHeight.web)};

  @media ${breakPoints.mobileLarge} {
    ${(props) =>
      props.minHeight?.mobile && {
        top: getPx(props.minHeight?.mobile),
      }}
  }
`;

export const ListItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
  margin: 0;
  padding: 10px;
  border: solid 2px gray;
  border-top: 0px;
  background-color: white;
`;

export const Rating = styled(_SpanText)`
  min-width: 36px;
`;

export const Empty = styled(_SpanText)`
  display: flex;
  align-items: center;
  height: 100%;
  color: #aa5656;
  font-weight: 700;
`;
