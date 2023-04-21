import { BaseSyntheticEvent, MutableRefObject, useEffect, useRef } from "react";
import _ModalUIPage from "./modal.presenter";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";
import { modalFuncClass } from "./modal.class";

// 1. 1차 모달 렌더 컴포넌트
export default function _Modal(
  props: Omit<ModalPropsType, "openIdx" | "_wmo">
) {
  return <_RenderModal {...props} />;
}

// 2. 최종 모달 렌더 컴포넌트
export function _RenderModal(props: ModalPropsType) {
  const {
    id,
    show,
    offAutoClose,
    onCloseModal,
    openIdx,
    _wmo,
    showBGAnimation,
    showModalOpenAnimation,
  } = props;

  const _modalWrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _itemRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _contentsRef = useRef() as MutableRefObject<HTMLDivElement>;

  const hasAnimation = showBGAnimation || showModalOpenAnimation;

  useEffect(() => {
    if (_itemRef) {
      if (showModalOpenAnimation) {
        _itemRef.current?.classList.add(modalFuncClass.minimum);

        window.setTimeout(() => {
          if (_itemRef.current?.classList.contains(modalFuncClass.minimum)) {
            _itemRef.current?.classList.add(modalFuncClass.animation);
            _itemRef.current?.classList.remove(modalFuncClass.minimum);
          }
        }, 0);
      }

      if (_contentsRef)
        window.setTimeout(() => {
          _contentsRef.current?.classList.add(modalFuncClass.itemShow);
          if (showModalOpenAnimation)
            _contentsRef.current?.classList.add(modalFuncClass.animation);
        }, (showModalOpenAnimation && 200) || 0);
    }

    if (show) {
      window.setTimeout(() => {
        if (_wrapperRef.current) {
          _wrapperRef.current?.classList.add(modalFuncClass.open);

          if (showBGAnimation) {
            _wrapperRef.current?.classList.add(modalFuncClass.animation);
          }

          // wrapper에 id 추가하기
          if (id) _wrapperRef.current.setAttribute("id", id);
        }

        if (_itemRef) {
          if (showBGAnimation) {
            _itemRef.current?.classList.add(modalFuncClass.animation);
          }
          _itemRef.current?.classList.add(modalFuncClass.itemShow);
        }
      }, 0);
    }
  }, [show]);

  // 모달 닫기 이벤트 실행
  const _onCloseModal = () => {
    if (showBGAnimation && _wrapperRef.current)
      _wrapperRef.current.classList.add(modalFuncClass.bgClose);

    if (_itemRef.current) {
      if (showModalOpenAnimation)
        _itemRef.current?.classList.add(modalFuncClass.minimum);

      if (hasAnimation)
        if (_itemRef.current?.classList.contains(modalFuncClass.itemShow))
          _itemRef.current?.classList.remove(modalFuncClass.itemShow);
    }

    if (showModalOpenAnimation && _contentsRef.current)
      if (_contentsRef.current?.classList.contains(modalFuncClass.itemShow))
        _contentsRef.current?.classList.remove(modalFuncClass.itemShow);

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
    handleClickEvent,
    _onCloseModal,
    _modalWrapperRef,
    _itemRef,
    _wrapperRef,
    _contentsRef,
  };

  return <_ModalUIPage props={{ ..._props }} />;
}
