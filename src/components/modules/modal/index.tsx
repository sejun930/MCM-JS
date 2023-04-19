import { render as reactRender } from "rc-util/lib/React/render";

import OriginModal from "./modal.container";
import { ModalPropsType } from "./modal.types";

type ModalType = typeof OriginModal & {
  open: (props?: Omit<ModalPropsType, "show" | "openIdx" | "_mwo">) => void;
};

// window로 open할 경우 삭제할 수 있는 id값 설정
let idx = 0;
const Modal = OriginModal as ModalType;

// 모달 오픈 함수
Modal.open = (props) => {
  const _div = document.createElement("div");
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

export default Modal;
