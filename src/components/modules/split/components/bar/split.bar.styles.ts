import { CSSProperties } from "react";
import styled from "@emotion/styled";

interface StyleTypes {
  orderNum?: number;
  active?: boolean;
}

export const Bar = styled.div`
  min-width: 1px;
  min-height: 100%;
  background-color: #bbbbbb;
  cursor: col-resize;
  display: flex;
  justify-content: center;

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};
    // 순서 지정
    // if (props.orderNum) styles.order = props.orderNum;

    return styles;
  }}

  ::after {
    content: "";
    position: absolute;
    min-width: 24px;
    height: 100%;
  }

  &.active {
    background-color: #aa5656;
  }
`;
