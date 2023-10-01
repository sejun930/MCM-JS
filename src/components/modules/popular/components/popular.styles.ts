import { CSSProperties } from "react";
import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";

interface StyleTypes {
  maxHeight?: number;
  isShowAll?: boolean;
  current?: number;
}

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .mcm-popular-main-wrapper {
    overflow: hidden;
    ${(props: StyleTypes) => {
      const styles: CSSProperties & { [key: string]: string } = {};

      if (props.maxHeight) styles.maxHeight = props.maxHeight;

      return styles;
    }}
  }

  .mcm-popular-main-list {
    ${(props) => {
      const styles: CSSProperties & { [key: string]: string } = {};

      if (props.maxHeight) styles.height = props.maxHeight;

      return styles;
    }}
  }
`;

export const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  border: solid 2px black;
`;

export const ListWrapper = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  transition: all 0.25s ease;

  ${(props: StyleTypes) =>
    props.current && {
      transform: `translateY(-${props.current * props.maxHeight}px)`,
    }}
`;

export const List = styled.li`
  list-style: none;
  display: flex;
  align-items: center;

  // 하위 모든 태그의 마진, 패딩값 제거
  * {
    margin: 0;
    padding: 0;
  }
`;

export const GetHeightWrapper = styled.div`
  max-height: 0px;
  overflow: hidden;
`;

export const GetHeightList = styled.div`
  opacity: 0;
`;

export const Opener = styled(_Button)`
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ::before,
  ::after {
    position: absolute;
    content: "";
    width: 10px;
    height: 2px;
    background-color: black;
    transition: all 0.35s ease;
  }

  ::before {
    transform: rotate(30deg);
    left: 6px;

    ${(props: StyleTypes) =>
      props.isShowAll && {
        transform: "rotate(-30deg)",
      }}
  }

  ::after {
    transform: rotate(-30deg);
    right: 6px;

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
  top: ${(props: StyleTypes) => `${props.maxHeight}px`};
`;

export const AllListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px 0px;
  padding: 10px;
  border: solid 2px gray;
  border-top: 0px;
  background-color: white;
`;
