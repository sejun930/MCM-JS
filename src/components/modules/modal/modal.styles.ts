import styled from "@emotion/styled";
import { breakPoints } from "../../../commons/breakPoints/responsiveBreakPoints";

interface StyleTypes {
  isOpen?: boolean;
  onBGAnimation?: boolean;
  onModalOpenAnimation?: boolean;
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
    !props.onBGAnimation ? "unset" : "all 0.2s ease-out"};

  ${(props: StyleTypes) =>
    props.isOpen && {
      backgroundColor: "rgba(0, 0, 0, .45)",
      zIndex: 999,
    }}
`;

export const Item = styled.div`
  position: relative;

  .oepn-modal-animation {
    width: 100%;
    height: 100%;
    left: 0%;
    top: 0%;
  }

  @media ${breakPoints.mobile} {
    width: 90%;
  }
`;

export const ContentsWrapper = styled.div`
  width: 500px;
  height: 500px;

  @media ${breakPoints.mobile} {
    width: 100%;
  }
`;

export const Content = styled.div`
  background-color: white;
  border-radius: 10px;
  position: relative;
  overflow: auto;
  transition: all 0.2s ease-out;
  width: 0px;
  height: 0px;
  left: 50%;
  top: 50%;
  padding: 1rem;

  ${(props: StyleTypes) =>
    !props.onModalOpenAnimation && {
      width: "100%",
      height: "100%",
      left: "auto",
      top: "auto",
    }}
`;

export const CloseButtonWrapper = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: unset;
  border: unset;

  .cmm-unit-image {
    object-fit: cover;
  }
`;
