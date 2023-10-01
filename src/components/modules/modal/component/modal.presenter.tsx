import {
  ModalWrapper,
  Wrapper,
  Items,
  ContentsWrapper,
  CloseButtonWrapper,
} from "./modal.styles";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";
import { _Button, _Text, _CloseButton } from "mcm-js-commons";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { getPXForm } from "mcm-js-commons/dist/hooks";
import { modalClassList } from "./modal.class";

const ModalUIPage = (props: {
  [props: string]: ModalPropsType & ModalPropsUITypes;
}) => {
  const _props = { ...props.props };
  const {
    className,
    id,
    name,
    show,
    _modalWrapperRef,
    _itemRef,
    _wrapperRef,
    _contentsRef,
    modalSize,
    modalStyles,
    mobileModalStyles,
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

  const buttonWrapperStyles = modalStyles?.closeButton || {};
  buttonWrapperStyles.top = closeBtnTop;

  return (
    (show && (
      <ModalWrapper ref={_modalWrapperRef}>
        <Wrapper
          className={getAllComponentsClassName(
            modalClassList.wrapper,
            className
          )}
          id={id}
          data-name={name}
          onMouseDown={handleClickEvent}
          ref={_wrapperRef}
          modalStyle={modalStyles?.wrapper || {}}
          mobileModalStyles={mobileModalStyles?.wrapper || {}}
        >
          <Items
            className={modalClassList.items}
            modalSize={modalSize || {}}
            mobileModalSize={mobileModalSize || {}}
            showModalOpenAnimation={showModalOpenAnimation}
            isOpen={show}
            ref={_itemRef}
            modalStyle={modalStyles?.items || {}}
            mobileModalStyles={mobileModalStyles?.items || {}}
          >
            <CloseButtonWrapper
              className={modalClassList.closeButtonWrapper}
              isOpen={show}
              modalStyle={buttonWrapperStyles}
              mobileModalStyles={mobileModalStyles?.closeButton || {}}
              closeMent={closeMent}
            >
              <_Button
                onClickEvent={_onCloseModal}
                className={modalClassList.closeButtonMentButton}
                buttonType="button"
              >
                <_Text className={modalClassList.closeButtonMent}>
                  {closeMent}
                </_Text>
              </_Button>
              <_CloseButton
                className={modalClassList.closeButton}
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
              className={modalClassList.contents}
              ref={_contentsRef}
              modalStyle={modalStyles?.contents || {}}
              mobileModalStyles={mobileModalStyles?.contents || {}}
            >
              {show ? children : undefined}
            </ContentsWrapper>
          </Items>
        </Wrapper>
      </ModalWrapper>
    )) || <></>
  );
};
export default ModalUIPage;
