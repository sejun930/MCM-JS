import {
  ModalWrapper,
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
    _modalWrapperRef,
    _itemRef,
    _wrapperRef,
    _contentsRef,
    modalSize,
    mobileModalSize,
    children,
    showModalOpenAnimation,
    hideCloseButton,
    _onCloseModal,
    closeMent,
    closeButtonInfo,
    handleClickEvent,
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
      {(show && (
        <ModalWrapper ref={_modalWrapperRef}>
          <Wrapper
            className="mcm-modal-wrapper"
            onMouseDown={handleClickEvent}
            ref={_wrapperRef}
          >
            <Items
              className="mcm-modal-items"
              modalSize={modalSize || {}}
              mobileModalSize={mobileModalSize || {}}
              showModalOpenAnimation={showModalOpenAnimation}
              isOpen={show}
              ref={_itemRef}
            >
              <CloseButtonWrapper
                className="mcm-modal-close-button-wrapper"
                isOpen={show}
                style={{ top: closeBtnTop }}
                closeMent={closeMent}
              >
                <_Button
                  onClickEvent={_onCloseModal}
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
                  onClickEvent={_onCloseModal}
                  buttonType="button"
                />
              </CloseButtonWrapper>
              <ContentsWrapper
                className="mcm-modal-contents"
                ref={_contentsRef}
              >
                {show ? children : undefined}
              </ContentsWrapper>
            </Items>
          </Wrapper>
        </ModalWrapper>
      )) || <></>}
    </_Error>
  );
};
export default ModalUIPage;
