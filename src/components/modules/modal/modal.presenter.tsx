import {
  Wrapper,
  Items,
  Layout,
  Content,
  CloseButtonWrapper,
  CloseButton,
} from "./modal.styles";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";
import { _Text } from "mcm-js-commons";

const ModalUIPage = (props: {
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

  const closeModalStyles: { [key: string]: string } = {};
  let closeBtnTop = "-35px";
  if (closeButtonSize) {
    let _closeButtonSize = String(closeButtonSize).split("px")[0] + "px";

    closeModalStyles.width = _closeButtonSize;
    closeModalStyles.height = _closeButtonSize;
    closeBtnTop = `-${Number(_closeButtonSize.split("px")[0]) + 10}px`;
  }

  return (
    <Wrapper
      className="mcm-modal-wrapper"
      isOpen={show}
      showBGAnimation={showBGAnimation || false}
      showModalOpenAnimation={showModalOpenAnimation || false}
    >
      <Items
        className="mcm-modal-items"
        style={styles}
        mobileDefaultStyles={mobileDefaultStyles || {}}
        onMouseEnter={focusContents}
      >
        <CloseButtonWrapper
          className="mcm-modal-close-button-wrapper"
          hideCloseButton={hideCloseButton}
          onClick={onCloseModal}
          isOpen={show}
          isAnimation={showModalOpenAnimation}
          style={{ top: closeBtnTop }}
        >
          {closeMent && (
            <_Text className="mcm-modal-close-ment">{closeMent}</_Text>
          )}
          <CloseButton
            className="mcm-modal-close-button"
            style={closeModalStyles}
          />
        </CloseButtonWrapper>
        <Layout className="mcm-modal-layout" ref={_ref}>
          <Content
            className="mcm-modal-content"
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
export default ModalUIPage;
