import styled from "@emotion/styled";

export const Bar = styled.li`
  min-width: 1px;
  min-height: 100%;
  background-color: #bbbbbb;
  cursor: col-resize;
  display: flex;
  justify-content: center;

  ::after {
    content: "";
    position: absolute;
    min-width: 24px;
    height: 100%;
  }

  &.action {
    background-color: #aa5656;
  }
`;
