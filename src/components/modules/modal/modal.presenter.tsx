// import imageList from "../../../commons/images";

import {
  Wrapper,
  Items,
  Layout,
  Content,
  CloseButtonWrapper,
  CloseButton,
} from "./modal.styles";
// import Image from "../../../commons/units/image";
import { ModalPropsType, ModalPropsUITypes } from "./modal.types";

const _ModalUIPage = (props: {
  [props: string]: ModalPropsType & ModalPropsUITypes;
}) => {
  const {
    show,
    showBGAnimation,
    _ref,
    styles,
    children,
    _contentsRef,
    showModalOpenAnimation,
    hideCloseButton,
    onCloseModal,
    closeButtonSize,
  } = props.props;

  const closeBtnWrapper: { [key: string]: string } = {};
  const closeModalStyles: { [key: string]: string } = {};
  if (closeButtonSize) {
    let _closeButtonSize = String(closeButtonSize).split("px")[0] + "px";

    closeModalStyles.width = _closeButtonSize;
    closeModalStyles.height = _closeButtonSize;
    closeBtnWrapper.top = `-${Number(_closeButtonSize.split("px")[0]) + 10}px`;
  }

  return (
    <Wrapper
      className="cmm-modal-wrapper"
      isOpen={show}
      showBGAnimation={showBGAnimation || false}
      showModalOpenAnimation={showModalOpenAnimation || false}
    >
      <Items className="cmm-modal-items">
        <CloseButtonWrapper
          className="cmm-modal-close-wrapper"
          style={closeBtnWrapper}
        >
          {!hideCloseButton && (
            <CloseButton
              className="cmm-modal-close-button"
              onClick={onCloseModal}
              style={closeModalStyles}
            ></CloseButton>
          )}
        </CloseButtonWrapper>
        <Layout className="cmm-modal-layout" ref={_ref} style={styles}>
          {/* <ContentsWrapper className="cmm-modal-contents-wrapper"> */}
          <Content
            className="cmm-modal-content"
            ref={_contentsRef}
            showModalOpenAnimation={showModalOpenAnimation}
            isOpen={show}
          >
            {show ? children : null}
          </Content>
          {/* </ContentsWrapper> */}
        </Layout>
      </Items>
    </Wrapper>
  );
};
export default _ModalUIPage;
