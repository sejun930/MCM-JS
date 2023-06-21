import OriginModal from "./component/modal.container";
import { ModalType } from "./component/modal.types";
import { openModal, closeModal } from "./func";

const Modal = OriginModal as ModalType;

// 모달 오픈 함수
Modal.open = openModal;

// 모달 종료
Modal.close = closeModal;

export default Modal;
