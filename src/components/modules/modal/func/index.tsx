import { createRoot } from "react-dom/client";

import OriginModal from "../component/modal.container";
import Modal from "../";

import { ModalCloseFuncType } from "../component/modal.types";
import { modalClassList, modalFuncClass } from "../component/modal.class";
import { MutableRefObject, ReactNode } from "react";

// window로 open할 경우 삭제할 수 있는 id값 설정
let idx = 0;

// 모달 오픈하기
const openModal = (props?: ModalCloseFuncType) => {
  const _div = document.createElement("div");
  _div.setAttribute("class", modalFuncClass.windowOpen);
  _div.setAttribute("id", `mcm-modal-${++idx}`);

  const parents = Array.from(
    document.getElementsByClassName("mcm-modal-contents")
  );
  // 최상위 모달이 하나도 없을 경우에는 body에 렌더
  if (!parents.length) document.body.appendChild(_div);
  // 상위 모달에 바로 렌더
  else parents.at(-1)?.appendChild(_div);

  createRoot(_div).render(
    <OriginModal
      show={true}
      onCloseModal={() => props?.onCloseModal}
      // @ts-ignore
      openIdx={idx}
      _wmo={true}
      {...props}
    ></OriginModal>
  );
};

// 모달 종료 (이벤트 적용)하기
const closeModal = (props?: ModalCloseFuncType) => {
  // 해당 노드 데이터 찾기
  const findNode = (className: string, startNode: Element): Element | null => {
    let result = null;

    const getNode = (node: Element) => {
      if (node.classList.contains(className)) {
        // 해당 노드를 찾았다면 바로 종료
        result = node;
        return result;
      }

      const children = Array.from(node.children);
      if (!children) return;

      for (const childrenNode of children) {
        getNode(childrenNode);
      }
    };
    getNode(startNode);

    return result;
  };

  const closeModal = async (node: Element) => {
    const origin = node;
    const wrapper = findNode(modalClassList.wrapper, origin);
    const items = findNode(modalClassList.items, wrapper || origin);
    const contents = findNode(modalClassList.contents, items || origin);

    // let hasAnimation = false;

    // wrapper에 관한 종료 처리
    if (wrapper) {
      if (wrapper?.classList.contains(modalFuncClass.open))
        wrapper.classList.remove(modalFuncClass.open);

      // if (wrapper?.classList.contains(modalFuncClass.animation))
      //   hasAnimation = true;
    }

    if (items) {
      // items에 관한 종료 처리
      if (items?.classList.contains(modalFuncClass.animation)) {
        // hasAnimation = true;
        items.classList.add(modalFuncClass.minimum);
      }
    }

    if (contents) {
      // contents에 관한 종료 처리
      if (contents?.classList.contains(modalFuncClass.itemShow))
        contents.classList.remove(modalFuncClass.itemShow);

      // if (contents?.classList.contains(modalFuncClass.animation))
      //   hasAnimation = true;
    }

    // 모달 최종 종료하기
    if (origin && origin.parentNode) origin.remove();
  };

  const removeDefault = () => {
    // props를 전달받지 않으면 해당 모달만 종료
    const body = document.body;
    const list = Array.from(
      body.getElementsByClassName(modalClassList.wrapper)
    );
    const current = list.at(-1);

    // 제일 마지막 요소가 현재 오픈되어 있는 모달
    if (current !== undefined) {
      if (
        current?.parentElement?.parentElement?.classList.contains(
          modalFuncClass.windowOpen
        )
      ) {
        // window로 오픈했을 경우
        closeModal(current.parentElement?.parentElement);
      } else if (current.parentElement) closeModal(current.parentElement);
    }
  };

  const getIsWindow = (el: Element) => {
    return el.parentElement?.parentElement?.classList.contains(
      modalFuncClass.windowOpen
    );
  };

  if (props?.id) {
    // id가 있다면 우선 적용
    let el: HTMLElement | null = document.getElementById(props.id);

    if (el) {
      // window로 오픈했을 경우
      if (getIsWindow(el)) {
        if (el?.parentElement?.parentElement)
          closeModal(el?.parentElement.parentElement);
      } else {
        // state로 오픈했을 경우
        if (el.parentElement) closeModal(el.parentElement);
      }
    } else {
      Modal.open({
        children: `입력된 "${props.id}" id 선택자를 찾을 수 없습니다.`,
        className: "wrong-modal-select",
      });

      // 입력한 id값이 잘못된 값이라면
      removeDefault();
    }
  } else if (props?.className) {
    // 모든 className 모달 종료
    const list = document.getElementsByClassName(
      props?.className || modalClassList.wrapper
    );
    if (list && list.length)
      Array.from(list).forEach((el) => {
        if (
          el.parentElement?.parentElement?.classList.contains(
            modalFuncClass.windowOpen
          )
        )
          // window로 오픈했을 경우 부모태그까지 접근
          closeModal(el.parentElement?.parentElement);
        // state로 오픈했을 경우
        else if (el.parentElement) closeModal(el.parentElement);
      });
  } else {
    // 선택자 지정이 없다면 자신만 종료
    removeDefault();
  }

  return true;
};

export { openModal, closeModal };
