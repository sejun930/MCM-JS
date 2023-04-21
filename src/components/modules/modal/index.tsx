import OriginModal from "./component/modal.container";
import { ModalType } from "./component/modal.types";
import { openModal, closeModal } from "./func";

// window로 open할 경우 삭제할 수 있는 id값 설정
const Modal = OriginModal as ModalType;

// 모달 오픈 함수
Modal.open = openModal;

// 모달 종료
Modal.close = closeModal;

export default Modal;
