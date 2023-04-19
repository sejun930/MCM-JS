import { BaseSyntheticEvent, MutableRefObject, useEffect, useRef } from "react";
import _ModalUIPage from "./modal.presenter";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";

// 1. 1차 모달 렌더 컴포넌트
export default function _Modal(
  props: Omit<ModalPropsType, "openIdx" | "_wmo">
) {
  return <_RenderModal {...props} />;
}

// 2. 최종 모달 렌더 컴포넌트
export function _RenderModal(props: ModalPropsType) {
  const {
    show,
    offAutoClose,
    onCloseModal,
    openIdx,
    _wmo,
    showBGAnimation,
    showModalOpenAnimation,
  } = props;

  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _itemRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _contentsRef = useRef() as MutableRefObject<HTMLDivElement>;

  const hasAnimation = showBGAnimation || showModalOpenAnimation;

  useEffect(() => {
    if (_itemRef) {
      if (showModalOpenAnimation) {
        _itemRef.current?.classList.add("mcm-modal-item-minimum");

        window.setTimeout(() => {
          if (_itemRef.current?.classList.contains("mcm-modal-item-minimum")) {
            _itemRef.current?.classList.add("mcm-modal-animation");
            _itemRef.current?.classList.remove("mcm-modal-item-minimum");
          }
        }, 0);
      }

      if (_contentsRef)
        window.setTimeout(() => {
          _contentsRef.current?.classList.add("mcm-modal-item-show");
          if (showModalOpenAnimation)
            _contentsRef.current?.classList.add("mcm-modal-animation");
        }, (showModalOpenAnimation && 200) || 0);
    }

    if (show) {
      window.setTimeout(() => {
        if (_wrapperRef.current) {
          _wrapperRef.current?.classList.add("mcm-modal-open");

          if (showBGAnimation) {
            _wrapperRef.current?.classList.add("mcm-modal-animation");
          }
        }

        if (_itemRef) {
          if (showBGAnimation) {
            _itemRef.current?.classList.add("mcm-modal-animation");
          }
          _itemRef.current?.classList.add("mcm-modal-item-show");
        }
      }, 0);
    }
  }, [show]);

  // 모달 닫기 이벤트 실행
  const _onCloseModal = () => {
    if (showBGAnimation && _wrapperRef.current)
      _wrapperRef.current.classList.add("mcm-modal-bg-close-animation");

    if (_itemRef.current) {
      if (showModalOpenAnimation)
        _itemRef.current?.classList.add("mcm-modal-item-minimum");

      if (hasAnimation)
        if (_itemRef.current?.classList.contains("mcm-modal-item-show"))
          _itemRef.current?.classList.remove("mcm-modal-item-show");
    }

    if (showModalOpenAnimation && _contentsRef.current)
      if (_contentsRef.current?.classList.contains("mcm-modal-item-show"))
        _contentsRef.current?.classList.remove("mcm-modal-item-show");

    setTimeout(() => {
      // window로 오픈 했을 경우
      if (_wmo && openIdx) {
        const el = document.getElementById(`mcm-modal-${openIdx}`);
        if (el) el.remove();
      }

      if (onCloseModal) onCloseModal();
    }, (hasAnimation && 200) || 0);
  };

  const handleClickEvent = (event: BaseSyntheticEvent) => {
    if (_itemRef.current && !_itemRef.current.contains(event.target)) {
      if (!offAutoClose) _onCloseModal();
    }
  };

  const _props: ModalPropsType & ModalPropsUITypes = {
    ...props,
    show,
    handleClickEvent,
    _onCloseModal,
    _itemRef,
    _wrapperRef,
    _contentsRef,
  };

  return <_ModalUIPage props={{ ..._props }} />;
}
