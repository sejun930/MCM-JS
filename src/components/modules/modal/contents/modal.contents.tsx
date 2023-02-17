import {
  ContentWrapper,
  Item,
  Wrapper,
  CloseButtonWrapper,
  CloseButton,
} from "./modal.styles";
import imageList from "../../../../commons/images";
import Image from "../../../../commons/units/image";

import { ModalPropsType } from "../modal.types";
import { MutableRefObject, useEffect, useRef } from "react";

export default function ModalPage({
  children,
  styles,
  hideCloseButton,
  closeButtonStyles,
  onCloseModal,
  offAutoClose,
  show,
}: ModalPropsType) {
  const _ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (!offAutoClose) {
      // 외부 클릭시 실행되는 이벤트
      document.addEventListener("click", handleClickEvent, true);
      return () => {
        document.removeEventListener("click", handleClickEvent, true);
      };
    }
  }, [offAutoClose]);

  const handleClickEvent = (event: any) => {
    if (_ref.current && !_ref.current.contains(event.target)) {
      if (onCloseModal) onCloseModal();
      document.removeEventListener("click", handleClickEvent, true);
    }
  };

  return (
    <Item className="cmm-modal-item" style={styles} ref={_ref}>
      {!hideCloseButton && (
        <CloseButtonWrapper className="cmm-modal-close-wrapper">
          <CloseButton
            className="cmm-modal-close-button"
            onClick={onCloseModal}
          >
            <Image
              src={closeButtonStyles?.src || imageList["close-button"]}
              className="cmm-modal-close-img"
            />
          </CloseButton>
        </CloseButtonWrapper>
      )}
      <ContentWrapper className="cmm-modal-content-wrapper">
        {children}
      </ContentWrapper>
    </Item>
  );
}
