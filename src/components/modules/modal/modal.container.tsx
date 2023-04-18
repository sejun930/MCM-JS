import { BaseSyntheticEvent, MutableRefObject, useEffect, useRef } from "react";
import _ModalUIPage from "./modal.presenter";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";

// 1. 1차 모달 렌더 컴포넌트
export default function _Modal(
  props: Omit<ModalPropsType, "openIdx" | "_wmo">
) {
  console.log(props);
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

  useEffect(() => {
    if (show) {
      if (_wrapperRef) {
        window.setTimeout(() => {
          _wrapperRef.current?.classList.add("mcm-modal-open");

          if (showBGAnimation) {
            _wrapperRef.current?.classList.add("mcm-modal-animation");
          }
        }, 0);
      }

      // if (_itemRef) {
      //   if (showModalOpenAnimation) {
      //     _itemRef.current.classList.add("mcm-modal-item-animation");
      //   }
      // }
    }
  }, [show]);

  // 모달 닫기 이벤트 실행
  const _onCloseModal = () => {
    const hasAnimation = showBGAnimation || showModalOpenAnimation;
    if (_wmo) {
      if (openIdx) {
        const el = document.getElementById(`mcm-modal-${openIdx}`);
        if (el)
          setTimeout(() => {
            el.remove();
          }, (hasAnimation && 200) || 0);
      }
    }

    if (_wrapperRef) {
      if (_wrapperRef.current.classList.contains("mcm-modal-bg-open-animation"))
        _wrapperRef.current.classList.remove("mcm-modal-bg-open-animation");
      _wrapperRef.current.classList.add("mcm-modal-bg-close-animation");
    }

    if (_itemRef) {
    }

    if (onCloseModal)
      setTimeout(() => {
        onCloseModal();
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
  };

  return <_ModalUIPage props={{ ..._props }} />;
}
