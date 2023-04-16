import {
  Wrapper,
  Items,
  ContentsWrapper,
  CloseButtonWrapper,
} from "./modal.styles";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";
import { _Button, _Text, _CloseButton, _Error } from "mcm-js-commons";
import { getPXForm } from "mcm-js-commons/dist/hooks";

const ModalUIPage = (props: {
  [props: string]: ModalPropsType & ModalPropsUITypes;
}) => {
  const _props = { ...props.props };
  const {
    show,
    showBGAnimation,
    _ref,
    modalSize,
    mobileModalSize,
    children,
    showModalOpenAnimation,
    hideCloseButton,
    onCloseModal,
    closeMent,
    focusContents,
    closeButtonInfo,
  } = _props;

  const _closeButtonSize = getPXForm(
    closeButtonInfo?.buttonSize || "20px",
    "20px"
  );
  const closeBtnTop =
    `-${Number(_closeButtonSize.split("px")[0]) + 10}px` || "-25px";

  return (
    <_Error
      propsList={_props}
      requiredList={["show", "onCloseModal"]}
      mouduleName="Modal"
    >
      <Wrapper
        className="mcm-modal-wrapper"
        isOpen={show}
        showBGAnimation={showBGAnimation || false}
        showModalOpenAnimation={showModalOpenAnimation || false}
      >
        <Items
          className="mcm-modal-items"
          mobileModalSize={mobileModalSize || {}}
          showModalOpenAnimation={showModalOpenAnimation}
          onMouseEnter={focusContents}
          isOpen={show}
          ref={_ref}
          width={modalSize?.width}
          height={modalSize?.height}
        >
          <CloseButtonWrapper
            className="mcm-modal-close-button-wrapper"
            isOpen={show}
            isAnimation={showModalOpenAnimation}
            style={{ top: closeBtnTop }}
            closeMent={closeMent}
          >
            <_Button
              onClickEvent={onCloseModal}
              className="mcm-modal-close-ment-button"
              buttonType="button"
            >
              <_Text className="mcm-modal-close-ment">{closeMent}</_Text>
            </_Button>
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
              buttonType="button"
            />
          </CloseButtonWrapper>
          <ContentsWrapper
            className="mcm-modal-contents"
            isOpen={show}
            showModalOpenAnimation={showModalOpenAnimation}
          >
            {show ? children : undefined}
          </ContentsWrapper>
        </Items>
      </Wrapper>
    </_Error>
  );
};
export default ModalUIPage;
