import {
  Wrapper,
  Items,
  Layout,
  Content,
  CloseButtonWrapper,
  CloseButton,
} from "./modal.styles";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";
import _SpanText from "../../../commons/units/text/span";

const _ModalUIPage = (props: {
  [props: string]: ModalPropsType & ModalPropsUITypes;
}) => {
  const {
    show,
    showBGAnimation,
    _ref,
    styles,
    mobileDefaultStyles,
    children,
    _contentsRef,
    showModalOpenAnimation,
    hideCloseButton,
    onCloseModal,
    closeButtonSize,
    closeMent,
    focusContents,
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
      <Items
        className="cmm-modal-items"
        style={styles}
        mobileDefaultStyles={mobileDefaultStyles || {}}
        onMouseEnter={focusContents}
      >
        <CloseButtonWrapper
          className="cmm-modal-close-button-wrapper"
          hideCloseButton={hideCloseButton}
          onClick={onCloseModal}
          isOpen={show}
          onAnimation={showModalOpenAnimation}
        >
          {closeMent && (
            <_SpanText text={closeMent} className="cmm-modal-close-ment" />
          )}
          <CloseButton
            className="cmm-modal-close-button"
            style={closeModalStyles}
          />
        </CloseButtonWrapper>
        <Layout className="cmm-modal-layout" ref={_ref}>
          <Content
            className="cmm-modal-content"
            ref={_contentsRef}
            showModalOpenAnimation={showModalOpenAnimation}
            isOpen={show}
          >
            {show ? children : null}
          </Content>
        </Layout>
      </Items>
    </Wrapper>
  );
};
export default _ModalUIPage;
