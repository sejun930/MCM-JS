import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { CSSProperties } from "react";

interface StyleTypes {
  isOpen?: boolean;
  showBGAnimation?: boolean;
  showModalOpenAnimation?: boolean;
  mobileModalSize?: { width?: string; height?: string };
  isAnimation?: boolean;
  hideCloseButton?: boolean;
  closeMent?: string;
  width?: string;
  height?: string;
}

export const ModalWrapper = styled.div`
  @keyframes MODAL_BG_ANIMATION {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }

  .mcm-modal-open {
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
    opacity: 1;
    display: flex;

    .mcm-modal-items {
      ${(props: StyleTypes) => {
        const styles = {
          width: props.width || "500px",
          height: props.width || "500px",
        };

        return styles;
      }}
    }
  }

  .mcm-modal-animation {
    transition: all 0.3s ease-out;
  }

  .mcm-modal-bg-close-animation {
    transition: all 0.3s ease-out;
    background-color: unset;
  }
`;

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
`;

export const Items = styled.div`
  position: relative;
  background-color: white;
  border-radius: 10px;
  width: 0px;
  height: 0px;

  /* ${(props: StyleTypes) =>
    props.showModalOpenAnimation && {
      transition: "all 0.3s ease",
    }}

  ${(props) =>
    props.isOpen && {
      width: props.width || "500px",
      height: props.height || "500px",
    }} */

  @media ${breakPoints.mobile} {
    width: 80% !important;
    height: 70% !important;

    ${(props) =>
      props.mobileModalSize && {
        width: `${props.mobileModalSize.width} !important`,
        height: `${props.mobileModalSize.height} !important`,
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
