import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal from "../../../src/components/modules/modal/modal.container";
import { ModalPropsType } from "../../../src/components/modules/modal/modal.types";
import { _Button } from "mcm-js-commons";

export default function SB_Modal(props: ModalPropsType) {
  const {
    show,
    children,
    styles,
    showBGAnimation,
    showModalOpenAnimation,
    mobileDefaultStyles,
    hideCloseButton,
    offAutoClose,
    closeMent,
    closeButtonSize,
  } = props;
  const [_show, _setShow] = useState(show);

  const onOpenModal = () => {
    _setShow(true);
  };

  const _onCloseModal = () => {
    _setShow(false);
  };

  return (
    <>
      <_Button onClickEvent={onOpenModal}>모달 오픈하기</_Button>
      <Modal
        show={_show}
        onCloseModal={_onCloseModal}
        styles={styles}
        mobileDefaultStyles={mobileDefaultStyles}
        showBGAnimation={showBGAnimation}
        showModalOpenAnimation={showModalOpenAnimation}
        hideCloseButton={hideCloseButton}
        offAutoClose={offAutoClose}
        closeMent={closeMent}
        closeButtonSize={closeButtonSize}
      >
        {children}
      </Modal>
    </>
  );
}

SB_Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  showModalOpenAnimation: PropTypes.bool,
  showBGAnimation: PropTypes.bool,
  styles: PropTypes.shape({}),
  mobileDefaultStyles: PropTypes.shape({}),
  hideCloseButton: PropTypes.bool,
  offAutoClose: PropTypes.bool,
  closeMent: PropTypes.string,
  closeButtonSize: PropTypes.number || PropTypes.string,
};

SB_Modal.defaultProps = {
  children: <div>모달 페이지입니다.</div>,
  show: false,
  onCloseModal: () => {
    alert("모달을 닫았습니다.");
  },
  showModalOpenAnimation: false,
  showBGAnimation: false,
  styles: {},
  mobileDefaultStyles: {},
  hideCloseButton: false,
  offAutoClose: false,
} as ModalPropsType;
