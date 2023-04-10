import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  isOpen?: boolean;
  showBGAnimation?: boolean;
  showModalOpenAnimation?: boolean;
  mobileDefaultStyles?: { width?: string; height?: string };
  isAnimation?: boolean;
  hideCloseButton?: boolean;
  closeMent?: string;
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
  transition: all 0.3s ease-out;

  ${(props) =>
    props.isOpen && {
      backgroundColor: "rgba(0, 0, 0, .6)",
      zIndex: 999,
    }}

  // 배경 애니메이션 설정시 배경에 대한 transition 추가
  transition: ${(props: StyleTypes) => !props.showBGAnimation && "unset"};

  transition: ${(props: StyleTypes) =>
    props.showModalOpenAnimation && "z-index .3s ease-out"};

  transition: ${(props: StyleTypes) =>
    props.showModalOpenAnimation &&
    props.showBGAnimation &&
    "all .3s ease-out"};
`;

export const Items = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 500px;

  @media ${breakPoints.mobile} {
    width: 80% !important;
    height: 70% !important;

    ${(props: StyleTypes) =>
      props.mobileDefaultStyles && {
        width: `${props.mobileDefaultStyles.width} !important`,
        height: `${props.mobileDefaultStyles.height} !important`,
      }}
  }
`;

export const Layout = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  .oepn-modal-animation {
    width: 100%;
    height: 100%;
    left: 0%;
    top: 0%;
  }

  @media ${breakPoints.mobile} {
    width: 100% !important;
    height: 100% !important;
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
  /* padding: 1rem; */
  opacity: 0;
  overflow: auto;

  ${(props: StyleTypes) =>
    props.isOpen && {
      position: "relative",
      width: "100%",
      height: "inherit",
      top: 0,
      left: 0,
      opacity: 1,
      padding: "1rem",
    }}

  // 모달 오픈 이벤트를 설정했을 경우
  ${(props) =>
    props.showModalOpenAnimation && {
      transition: "all .3s ease-out",
    }};
`;

export const CloseButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  opacity: 0;
  background-color: unset;
  border: unset;

  ${(props: StyleTypes) =>
    props.isOpen && {
      opacity: 1,
    }};

  ${(props) =>
    props.isAnimation && {
      transition: "all .3s ease-out",
    }};

  ${(props) =>
    props.hideCloseButton && {
      display: "none",
    }};

  .mcm-modal-close-ment-button {
    background-color: unset;
    border: unset;
    padding: 0;
    margin: 0;
    margin-right: 6px;
    display: none;

    // 클로징 멘트가 있을 경우 보이기
    ${(props) =>
      props.closeMent && {
        display: "block",
      }}
  }

  .mcm-modal-close-ment {
    color: white;
  }
`;

export const CloseButton = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

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
