import ModalPage from "./contents/modal.contents";
import { ModalPropsType } from "./modal.types";

import { useEffect, useState } from "react";
import { Wrapper } from "./contents/modal.styles";

export default function _Modal({
  children,
  show,
  onCloseModal,
  styles,
  hideCloseButton,
  closeButtonStyles,
  offAutoClose,
  offAnimation,
}: ModalPropsType) {
  const [_show, setShow] = useState<boolean>(false);

  // show의 변화에 따라 모달 toggle
  useEffect(() => {
    setShow(show);
  }, [show]);

  return (
    <Wrapper
      className="cmm-modal-wrapper"
      isOpen={show}
      offAnimation={offAnimation || false}
    >
      {(_show && (
        <ModalPage
          show={_show}
          styles={styles}
          children={children}
          hideCloseButton={hideCloseButton}
          onCloseModal={onCloseModal}
          closeButtonStyles={closeButtonStyles}
          offAutoClose={offAutoClose || false}
        />
      )) || <></>}
    </Wrapper>
  );
}
