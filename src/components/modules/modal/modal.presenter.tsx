import React from "react";
import imageList from "../../../commons/images";

import {
  Wrapper,
  Item,
  ContentsWrapper,
  Content,
  CloseButtonWrapper,
  CloseButton,
} from "./modal.styles";
import Image from "../../../commons/units/image";
import { ModalPropsType, ModalPropsUITypes } from "./modal.types";

const _ModalUIPage = (props: {
  [props: string]: ModalPropsType & ModalPropsUITypes;
}) => {
  const {
    show,
    onBGAnimation,
    _ref,
    styles,
    children,
    _contentsRef,
    onModalOpenAnimation,
    hideCloseButton,
    onCloseModal,
    closeButtonSize,
    closeButtonSrc,
  } = props.props;

  const closeModalStyles: { [key: string]: string } = {};
  if (closeButtonSize) {
    let _closeButtonSize = closeButtonSize;
    if (!closeButtonSize.includes("px"))
      _closeButtonSize = closeButtonSize + "px";

    closeModalStyles.width = _closeButtonSize;
    closeModalStyles.height = _closeButtonSize;
  }

  return (
    <Wrapper
      className="cmm-modal-wrapper"
      isOpen={show}
      onBGAnimation={onBGAnimation || false}
    >
      <Item className="cmm-modal-item" ref={_ref}>
        {show && (
          <CloseButtonWrapper className="cmm-modal-close-wrapper">
            {!hideCloseButton && (
              <CloseButton
                className="cmm-modal-close-button"
                onClick={onCloseModal}
                style={closeModalStyles || {}}
              >
                <Image
                  src={closeButtonSrc || imageList["close-button"]}
                  className="cmm-modal-close-img"
                />
              </CloseButton>
            )}
          </CloseButtonWrapper>
        )}
        <ContentsWrapper className="cmm-modal-contents-wrapper" style={styles}>
          <Content
            className="cmm-modal-content"
            ref={_contentsRef}
            onModalOpenAnimation={onModalOpenAnimation}
          >
            {show ? children : null}
          </Content>
        </ContentsWrapper>
      </Item>
    </Wrapper>
  );
};
export default _ModalUIPage;
