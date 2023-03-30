import {
  Wrapper,
  Items,
  Layout,
  Content,
  CloseButtonWrapper,
} from "./modal.styles";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";
import { _Button, _Text, _CloseButton } from "mcm-js-commons";
import CommonsHooksComponents from "mcm-js-commons/dist/hooks";

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
    closeMent,
    focusContents,
    closeButtonInfo,
  } = props.props;
  const { getPXForm } = CommonsHooksComponents();

  const _closeButtonSize = getPXForm(
    closeButtonInfo?.buttonSize || "20px",
    "20px"
  );
  const closeBtnTop =
    `-${Number(_closeButtonSize.split("px")[0]) + 10}px` || "-25px";

  console.log(hideCloseButton);
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
          isOpen={show}
          isAnimation={showModalOpenAnimation}
          style={{ top: closeBtnTop }}
        >
          {closeMent && (
            <_Button
              onClickEvent={onCloseModal}
              className="mcm-modal-close-ment-button"
            >
              <_Text className="mcm-modal-close-ment">{closeMent}</_Text>
            </_Button>
          )}
          <_CloseButton
            className="mcm-modal-close-button"
            buttonColor={closeButtonInfo?.buttonColor || "white"}
            buttonSize={_closeButtonSize}
            buttonWeight={getPXForm(
              closeButtonInfo?.buttonWeight || "1px",
              "1px"
            )}
            styles={{ display: hideCloseButton ? "none" : "flex" }}
            onClickEvent={onCloseModal}
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
