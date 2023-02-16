import styled from "@emotion/styled";
import { breakPoints } from "../../../commons/breakPoints/responsiveBreakPoints";

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  height: 620px;
  position: relative;
`;

export const ContentWrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 1rem;

  @media ${breakPoints.mobile} {
    width: 320px;
    height: 320px;
  }
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  top: -20px;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  cursor: pointer;
`;
