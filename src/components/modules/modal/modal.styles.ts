import styled from "@emotion/styled";
import { breakPoints } from "../../../commons/breakPoints/responsiveBreakPoints";

interface StyleTypes {
  isOpen?: boolean;
  showBGAnimation?: boolean;
  showModalOpenAnimation?: boolean;
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
  transition: all 0.2s ease-out;

  ${(props) =>
    props.isOpen && {
      backgroundColor: "rgba(0, 0, 0, .6)",
      zIndex: 999,
    }}

  // 배경 애니메이션 설정시 배경에 대한 transition 추가
  transition: ${(props: StyleTypes) => !props.showBGAnimation && "unset"};

  transition: ${(props: StyleTypes) =>
    props.showModalOpenAnimation && "z-index 0.2s ease-out"};
`;

export const Items = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Layout = styled.div`
  position: relative;
  overflow: hidden;
  /* overflow-y: auto; */
  width: 500px;
  height: 500px;

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

export const Content = styled.div`
  border-radius: 10px;
  position: absolute;
  background-color: white;
  width: 0%;
  height: 0%;
  top: 50%;
  left: 50%;
  padding: 1rem;
  opacity: 0;
  overflow: auto;

  ${(props: StyleTypes) =>
    props.isOpen && {
      position: "relative",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      opacity: 1,
    }}

  // 모달 오픈 이벤트를 설정했을 경우
  ${(props) =>
    props.showModalOpenAnimation && {
      transition: "all 0.25s ease",
    }};
`;

export const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: -30px;
  right: 0;
`;

export const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: unset;
  border: unset;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .cmm-unit-image {
    object-fit: cover;
  }

  :after,
  :before {
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    background-color: white;
    cursor: pointer;
  }

  :after {
    transform: rotate(45deg);
  }

  :before {
    transform: rotate(-45deg);
  }
`;
