import { CSSProperties } from "react";
import styled from "@emotion/styled";

interface StyleTypes {
  orderNum?: number;
  active?: boolean;
}

export const Bar = styled.li`
  min-width: 1px;
  min-height: 100%;
  background-color: #bbbbbb;
  cursor: col-resize;
  display: flex;
  justify-content: center;

  ${(props: StyleTypes) =>
    props.active && {
      backgroundColor: "#aa5656",
    }}

  ::after {
    content: "";
    position: absolute;
    min-width: 24px;
    height: 100%;
  }
`;
