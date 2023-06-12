import { createRoot } from "react-dom/client";
import OriginModal from "../component/modal.container";

import { ModalCloseFuncType } from "../component/modal.types";
import { modalClassList, modalFuncClass } from "../component/modal.class";

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
      // @ts-ignore
      onCloseModal={props?.onCloseModal}
      // @ts-ignore
      openIdx={idx}
      _wmo={true}
      {...props}
    ></OriginModal>
  );
};

// 모달 종료 (이벤트 적용)하기
const closeModal = (props?: ModalCloseFuncType) => {
  let target: Array<HTMLElement> = [];

  // window 오픈 여부 확인하기
  const getIsWindow = (el: Element) => {
    return el.parentElement?.parentElement?.classList.contains(
      modalFuncClass.windowOpen
    );
  };

  // 해당 노드 데이터 찾기
  const findNode = (
    className: string,
    startNode: Element
  ): HTMLDivElement | null => {
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

  // 종료시킬 모달이 있는 경우
  if (props) {
    // id 선택자 추적하기
    if (props.id) {
      const element = document.getElementById(props.id);
      if (element) {
        target = [element];
      }
    }
    // class 선택자 추적하기
    if (props.className && !target.length) {
      const elements = document.getElementsByClassName(props.className);
      if (elements.length) target = Array.from(elements) as Array<HTMLElement>;
    }
  }

  if (target.length) {
    target.forEach((node) => {
      if (node?.parentElement) {
        const origin = getIsWindow(node)
          ? node.parentElement.parentElement
          : node.parentElement;

        if (origin) {
          const wrapper = findNode(modalClassList.wrapper, origin);
          const items = findNode(modalClassList.items, wrapper || origin);
          const contents = findNode(modalClassList.contents, items || origin);

          let showBGAnimation = false; // 배경 애니메이션 사용 여부
          let showModalOpenAnimation = false; // 모달 애니메이션 사용 여부

          if (wrapper && items && contents) {
            // 배경 애니메이션을 사용중이라면
            showBGAnimation =
              wrapper.classList.contains(modalFuncClass.hasBGAnimtaion) ||
              items.classList.contains(modalFuncClass.hasBGAnimtaion);

            // 오픈 애니메이션을 사용중이라면
            showModalOpenAnimation =
              items.classList.contains(modalFuncClass.hasOpenAnimation) ||
              contents.classList.contains(modalFuncClass.hasOpenAnimation);

            return closeModalFn({
              wrapperRef: wrapper,
              itemRef: items,
              contentsRef: contents,
              showBGAnimation,
              showModalOpenAnimation,
              target: origin,
            });
          }
        }
      }
    });
  }
  return true;
};

// 모달 닫기 최종 함수
export const closeModalFn = async ({
  wrapperRef, // wrapper 태그
  itemRef, // item 태그
  contentsRef, // contents 태그
  showBGAnimation, // 배경 애니메이션 사용 여부
  showModalOpenAnimation, // 모달 애니메이션 사용 여부
  openIdx, // window로 실행시 부여되는 번호
  _wmo, // window 실행 여부
  target,
}: {
  wrapperRef: HTMLDivElement;
  itemRef: HTMLDivElement;
  contentsRef: HTMLDivElement;
  showBGAnimation: boolean;
  showModalOpenAnimation: boolean;
  openIdx?: number;
  _wmo?: boolean;
  target?: Element;
}) => {
  if (showBGAnimation && wrapperRef)
    wrapperRef.classList.add(modalFuncClass.bgClose);

  if (itemRef) {
    if (showModalOpenAnimation) itemRef?.classList.add(modalFuncClass.minimum);

    if (showBGAnimation || showModalOpenAnimation)
      if (itemRef?.classList.contains(modalFuncClass.itemShow))
        itemRef?.classList.remove(modalFuncClass.itemShow);
  }

  if (showModalOpenAnimation && contentsRef)
    if (contentsRef?.classList.contains(modalFuncClass.itemShow))
      contentsRef?.classList.remove(modalFuncClass.itemShow);

  const wait = (time: number) => new Promise((res) => setTimeout(res, time));
  await wait(((showBGAnimation || showModalOpenAnimation) && 100) || 0);
  if (target) {
    target.remove();
  } else if (_wmo && openIdx) {
    // window로 오픈했을 경우
    const el = document.getElementById(`mcm-modal-${openIdx}`);
    if (el) return el;
  } else {
    // 그외 state를 이용해서 오픈했을 경우
    if (wrapperRef.parentElement) return wrapperRef.parentElement;
  }

  const extraModal = document.getElementsByClassName("mcm-modal-wrapper");
  if (!extraModal.length) document.body.style.overflow = "auto";

  return true;
};

export { openModal, closeModal };
