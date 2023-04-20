import { render as reactRender } from "rc-util/lib/React/render";

import OriginModal from "./modal.container";
import { ModalType, ModalCloseFuncType } from "./modal.types";

// window로 open할 경우 삭제할 수 있는 id값 설정
let idx = 0;
const Modal = OriginModal as ModalType;

// 모달 오픈 함수
Modal.open = (props) => {
  const _div = document.createElement("div");
  _div.setAttribute("class", "mcm-modal-window-type");
  _div.setAttribute("id", `mcm-modal-${++idx}`);

  document.body.appendChild(_div);
  reactRender(
    <OriginModal
      show={true}
      onCloseModal={() => props?.onCloseModal}
      // @ts-ignore
      openIdx={idx}
      _wmo={true}
      {...props}
    ></OriginModal>,
    _div
  );
};

// 모달 종료
Modal.close = (props?: ModalCloseFuncType) => {
  // 모달 종료 (이벤트 적용)하기
  const closeModal = async (node: Element) => {
    const origin = node;
    // const wrapper = findNode("mcm-modal-wrapper", origin, 0);
    const contents = findNode("mcm-modal-contents", origin);

    console.log(
      // wrapper
      contents
      // origin.childNodes[0].childNodes[0].childNodes[0].childNodes[0]
      //   .childNodes[0].childNodes[0].childNodes[0]
    );
  };

  // 해당 노드 데이터 찾기
  const findNode = (className: string, node: Element): Element | null => {
    if (node.classList.contains(className)) return node;
    const children = Array.from(node.children);
    if (!children) return null;

    if (children.length) {
      for (const childrenNode of children) {
        console.log(children, childrenNode);
        // children.forEach((childrenNode) => {
        // window.setTimeout(() => {
        return findNode(className, childrenNode);
        // }, 100);
      }
      // });
    }
    return null;
  };

  if (!props?.id && !props?.className) {
    // 열려있는 모든 모달을 종료
    const list = document.getElementsByClassName("mcm-modal-wrapper");
    if (list && list.length)
      Array.from(list).forEach((el) => {
        if (
          el.parentElement?.parentElement?.classList.contains(
            "mcm-modal-window-type"
          )
        )
          // window로 오픈했을 경우 부모태그까지 접근
          // el.parentElement?.parentElement.remove();
          closeModal(el.parentElement?.parentElement);
        // state로 오픈했을 경우
        else if (el.parentElement) closeModal(el.parentElement);
        // el.parentElement.remove();
      });
  } else {
    // props가 전달받은 경우
  }

  // if (props?.onCloseModal) props.onCloseModal();
  return true;
};

export default Modal;
