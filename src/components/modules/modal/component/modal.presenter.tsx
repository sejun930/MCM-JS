import {
  ModalWrapper,
  Wrapper,
  Items,
  ContentsWrapper,
  CloseButtonWrapper,
} from "./modal.styles";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";
import { _Button, _Text, _CloseButton, _Error } from "mcm-js-commons";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { getPXForm } from "mcm-js-commons/dist/hooks";
import { modalClassList } from "./modal.class";

const ModalUIPage = (props: {
  [props: string]: ModalPropsType & ModalPropsUITypes;
}) => {
  const _props = { ...props.props };
  const {
    className,
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
    onCloseModal,
    _wmo,
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
      requiredList={["show", "onCloseModal"].slice(0, _wmo ? 1 : 2)}
      mouduleName="Modal"
    >
      {(show && (
        <ModalWrapper ref={_modalWrapperRef}>
          <Wrapper
            className={getAllComponentsClassName(
              modalClassList.wrapper,
              className
            )}
            onMouseDown={handleClickEvent}
            ref={_wrapperRef}
          >
            <Items
              className={modalClassList.items}
              modalSize={modalSize || {}}
              mobileModalSize={mobileModalSize || {}}
              showModalOpenAnimation={showModalOpenAnimation}
              isOpen={show}
              ref={_itemRef}
            >
              <CloseButtonWrapper
                className={modalClassList.closeButtonWrapper}
                isOpen={show}
                style={{ top: closeBtnTop }}
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
