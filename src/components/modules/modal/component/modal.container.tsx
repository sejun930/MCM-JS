import { BaseSyntheticEvent, MutableRefObject, useEffect, useRef } from "react";
import _ModalUIPage from "./modal.presenter";

import { ModalPropsType, ModalPropsUITypes } from "./modal.types";
import { modalClassList, modalFuncClass } from "./modal.class";
import { closeModalFn } from "../func";

// 모달을 닫을 수 있는 시점 계산
let ableClose = false;

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
    onAfterCloseEvent,
  } = props;
  const _modalWrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _itemRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _contentsRef = useRef() as MutableRefObject<HTMLDivElement>;

  const hasAnimation = showBGAnimation || showModalOpenAnimation;

  useEffect(() => {
    if (show) {
      ableClose = false;
      window.setTimeout(() => {
        ableClose = true;
      }, (hasAnimation && 200) || 0);

      window.setTimeout(() => {
        if (_wrapperRef.current) {
          _wrapperRef.current?.classList.add(modalFuncClass.open);

          if (showBGAnimation) {
            _wrapperRef.current?.classList.add(modalFuncClass.animation);
            _wrapperRef.current?.classList.add(modalFuncClass.hasBGAnimtaion);
          }
          // wrapper에 id 추가하기
          if (id) _wrapperRef.current.setAttribute("id", id);
        }

        if (_itemRef) {
          if (showBGAnimation) {
            _itemRef.current?.classList.add(modalFuncClass.animation);
            _itemRef.current?.classList.add(modalFuncClass.hasBGAnimtaion);
          }

          _itemRef.current?.classList.add(modalFuncClass.itemShow);
        }
      }, 0);
    }

    if (_itemRef) {
      if (showModalOpenAnimation) {
        _itemRef.current?.classList.add(modalFuncClass.minimum);
        _itemRef.current?.classList.add(modalFuncClass.hasOpenAnimation);

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
          if (showModalOpenAnimation) {
            _contentsRef.current?.classList.add(modalFuncClass.animation);
            _contentsRef.current?.classList.add(
              modalFuncClass.hasOpenAnimation
            );
          }
        }, (showModalOpenAnimation && 200) || 0);
    }
  }, [show]);

  // 모달 닫기 이벤트 실행
  const _onCloseModal = async () => {
    if (!ableClose) return;
    ableClose = false;

    // 1. 현재 실행중인 모달은 우선 제거
    await closeModalFn({
      wrapperRef: _wrapperRef.current,
      itemRef: _itemRef.current,
      contentsRef: _contentsRef.current,
      showBGAnimation: showBGAnimation || false,
      showModalOpenAnimation: showModalOpenAnimation || false,
      openIdx,
      _wmo,
    }).then((target: Element | boolean) => {
      // 2. 해당 모달 삭제가 완료되면 onCloseEvent 처리하기
      window.setTimeout(() => {
        // 3. onCloseModal 이벤트 실행
        if (onCloseModal !== undefined) onCloseModal();

        window.setTimeout(() => {
          // 4. 삭제 후 남은 모달의 개수 체크하기
          const wrapperList = document.getElementsByClassName(
            modalClassList.wrapper
          );

          // 5. 이벤트로 인해 제거되지 않았다면
          if (typeof target !== "boolean") {
            if (document.body.contains(target)) {
              target.remove();
            }
          }
          // 6. 다른 모달이 남아 있다면 다음 모달 제거 가능으로 변경
          if (wrapperList.length) ableClose = true;
          // 7. 모달 종료 직후에 실행할 이벤트가 있다면 실행
          if (onAfterCloseEvent) onAfterCloseEvent();
        }, 100);
      }, 0);
    });
  };

  const handleClickEvent = (event: BaseSyntheticEvent) => {
    if (_itemRef.current && !_itemRef.current.contains(event.target)) {
      if (!offAutoClose && ableClose) {
        _onCloseModal();
      }
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
    _wmo,
  };

  return <_ModalUIPage props={{ ..._props }} />;
}
