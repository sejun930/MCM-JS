import { MutableRefObject, useEffect, useRef, useState } from "react";
import _ModalUIPage from "./modal.presenter";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";

export default function Modal(props: ModalPropsType) {
  const { show, offAutoClose, onCloseModal } = props;
  const [isOpen, setIsOpen] = useState(show || false);

  const _ref = useRef() as MutableRefObject<HTMLDivElement>;

  // show의 값에 따라 모달 오픈 여부 결정
  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  useEffect(() => {
    if (!offAutoClose) {
      // 외부 클릭시 실행되는 이벤트
      document.addEventListener("mousedown", handleClickEvent, true);

      return () => {
        document.removeEventListener("mousedown", handleClickEvent, true);
      };
    }
  }, [show, offAutoClose]);

  const handleClickEvent = (event: any) => {
    if (_ref.current && !_ref.current.contains(event.target)) {
      if (onCloseModal) onCloseModal();
      document.removeEventListener("mousedown", handleClickEvent, true);
    }
  };

  // 마우스 올릴 경우 모달창을 우선 선택 : 스크롤 이벤트 우선 적용
  const focusContents = () => {
    if (_ref.current) _ref?.current?.click();
  };

  const _props: ModalPropsType & ModalPropsUITypes = { ...props };
  _props.show = isOpen;
  _props._ref = _ref;
  _props.focusContents = focusContents;

  return <_ModalUIPage props={{ ..._props }} />;
}
