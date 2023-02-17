import styled from "@emotion/styled";
import { breakPoints } from "../../../../commons/breakPoints/responsiveBreakPoints";

interface StyleTypes {
  isOpen?: boolean;
  offAnimation?: boolean;
}

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;

  transition: ${(props) =>
    props.offAnimation ? "unset" : "all 0.3s ease-out"};

  ${(props: StyleTypes) =>
    props.isOpen && {
      backgroundColor: "rgba(0, 0, 0, .45)",
      zIndex: 999,
    }}
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 560px;
  height: 560px;
  position: relative;
  /* transition: all 0.3s ease-out;
  position: absolute;
  width: 1%;
  height: 1%; */

  @media ${breakPoints.mobile} {
    width: 80%;
    height: 300px;
  }
`;

export const ContentWrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 1rem;
  position: relative;
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  top: -30px;
  right: 0px;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  width: 25px;
  height: 25px;

  .cmm-unit-image {
    object-fit: cover;
  }
`;
