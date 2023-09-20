import styled from "@emotion/styled";

interface StyleTypes {
  minWidth?: number;
  orderNum?: number;
  isLast?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const Items = styled.ul`
  display: flex;
  width: 100%;
  touch-action: none;
  margin: 0;
  padding: 0;
`;

export const Contents = styled.li`
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
  order: 0;
  justify-content: center;

  ${(props: StyleTypes) =>
    props.isLast && {
      flex: "1 1 auto",
    }}

  /* 드래그 방지 */
  &.offDrag {
    pointer-events: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-use-select: none;
    user-select: none;
  }

  ::selection {
    background-color: transparent;
  }
`;
