import OriginModal from "./modal.container";
import { modalOpen } from "./func";

type ModalType = typeof OriginModal & {
  open: () => void;
};

const Modal = OriginModal as ModalType;
// 모달 오픈 함수
Modal.open = modalOpen;

export default Modal;
