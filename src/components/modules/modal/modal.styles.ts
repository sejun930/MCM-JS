import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { CSSProperties } from "react";

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
  opacity: 0;
  /* transition: all 0.3s ease-out; */

  ${(props: StyleTypes) =>
    props.isOpen && {
      backgroundColor: "rgba(0, 0, 0, .6)",
      zIndex: 999,
      opacity: 1,
    }}

  ${(props) =>
    props.showBGAnimation && {
      transition: "all 0.3s ease-out",
    }}
`;

export const Items = styled.div`
  position: relative;
  background-color: white;
  border-radius: 10px;
  width: 0px;
  height: 0px;

  ${(props: StyleTypes) =>
    props.showModalOpenAnimation && {
      transition: "all 0.3s ease",
    }}

  ${(props) =>
    props.isOpen && {
      width: "500px",
      height: "500px",
    }}

  @media ${breakPoints.mobile} {
    width: 80% !important;
    height: 70% !important;

    ${(props) =>
      props.mobileDefaultStyles && {
        width: `${props.mobileDefaultStyles.width} !important`,
        height: `${props.mobileDefaultStyles.height} !important`,
      }}
  }
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

export const ContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  top: 0;
  transition: unset;
  padding: 1rem;
  opacity: 0;

  ${(props: StyleTypes) => {
    const styles: { [key: string]: number | string } & CSSProperties = {};

    if (props.isOpen) styles.opacity = 1;
    if (props.showModalOpenAnimation) {
      styles.transition = "all 1.6s";
    }

    return styles;
  }}
`;
