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

export const Items = styled.div`
  display: flex;
  width: 100%;
  touch-action: none;
`;

export const Contents = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
  order: 0;
  justify-content: center;
`;
