import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { CSSProperties } from "react";

interface StyleTypes {
  isOpen?: boolean;
  showBGAnimation?: boolean;
  showModalOpenAnimation?: boolean;
  modalSize?: { width?: string; height?: string };
  mobileModalSize?: { width?: string; height?: string };
  isAnimation?: boolean;
  hideCloseButton?: boolean;
  closeMent?: string;
  modalCount?: number;
  modalStyle?: CSSProperties;
  mobileModalStyles?: CSSProperties;
}

export const ModalWrapper = styled.div`
  .mcm-modal-open {
    background-color: rgba(0, 0, 0, 0.6);
    z-index: ${(props: StyleTypes) => (props.modalCount || 0) + 999};
    opacity: 1;
    display: flex;
  }

  .mcm-modal-animation {
    transition: all 0.3s;
  }

  .mcm-modal-bg-close {
    background-color: unset;
  }

  .mcm-modal-item-show {
    opacity: 1;
  }

  .mcm-modal-item-minimum {
    width: 0px !important;
    height: 0px !important;
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

  // (웹) modal wrapper style 적용하기
  ${(props: StyleTypes) => {
    let styles = {};
    if (props.modalStyle) styles = props.modalStyle;

    // 배경색 (background-color)는 최우선 순위로 변경
    if (props?.modalStyle && props?.modalStyle.backgroundColor) {
      styles = {
        ...styles,
        ["backgroundColor"]: `${props.modalStyle.backgroundColor} !important`,
      };
    }

    return styles;
  }}

  @media ${breakPoints.mobileLarge} {
    // (모바일) modal wrapper style 적용하기
    ${(props: StyleTypes) => {
      let styles = {};
      if (props.mobileModalStyles) styles = props.mobileModalStyles;

      // 배경색 (background-color)는 최우선 순위로 변경
      if (
        props.mobileModalStyles &&
        props?.mobileModalStyles?.backgroundColor
      ) {
        styles = {
          ...styles,
          ["backgroundColor"]: `${props.mobileModalStyles.backgroundColor} !important`,
        };
      }

      return styles;
    }}
  }
`;

export const Items = styled.div`
  position: relative;
  background-color: white;
  border-radius: 10px;
  opacity: 0;
  width: 500px;
  height: 500px;

  // (웹) modal items style 적용하기
  ${(props: StyleTypes) => {
    let styles = {};

    if (props.modalStyle) styles = props.modalStyle;
    // modal Size가 있다면 modalStyle의 스타일보다 더 우선 순위를 가진다.
    if (props.modalSize) styles = { ...styles, ...props.modalSize };

    return styles;
  }}

  @media ${breakPoints.mobileLarge} {
    width: 80%;
    height: 70%;

    // (모바일) modal items style 적용하기
    ${(props: StyleTypes) => {
      let styles = {};

      if (props.mobileModalStyles) styles = props.mobileModalStyles;
      // modal Size가 있다면 mobileModalStyle의 스타일보다 더 우선 순위를 가진다.
      if (props.mobileModalSize)
        styles = { ...styles, ...props.mobileModalSize };

      return styles;
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

  ${(props: StyleTypes) => {
    let styles: { [key: string]: string | number } & CSSProperties = {};

    // 닫기 버튼 보이기
    if (props.isOpen) {
      styles.opacity = 1;

      if (props.hideCloseButton) {
        // 버튼 숨기기
        styles.display = "none";
      } else {
        // 애니메이션 적용하기
        if (props.isAnimation) styles.transition = "all .3s ease-out";

        if (props.modalStyle)
          // (웹) modal closeButton style 적용하기
          styles = { ...styles, ...props.modalStyle };
      }
    }
    return styles;
  }}

  .mcm-modal-close-ment-button {
    background-color: unset;
    border: unset;
    padding: 0;
    margin: 0;
    margin-right: 6px;
    display: none;
    white-space: pre;

    // 클로징 멘트가 있을 경우 보이기
    ${(props) =>
      props.closeMent && {
        display: "block",
      }}
  }

  .mcm-modal-close-ment {
    color: white;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media ${breakPoints.mobileLarge} {
    ${(props: StyleTypes) => {
      // (모바일) modal closeButton style 적용하기
      let styles = {};

      if (props.mobileModalStyles) styles = props.mobileModalStyles;
      return styles;
    }}
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

  // (웹) modal contents style 적용하기
  ${(props: StyleTypes) => {
    let styles = {};

    if (props.modalStyle) styles = props.modalStyle;
    return styles;
  }}

  @media ${breakPoints.mobileLarge} {
    // (모바일) modal contents style 적용하기
    ${(props) => {
      let styles = {};

      if (props.mobileModalStyles) styles = props.mobileModalStyles;
      return styles;
    }}
  }
`;
