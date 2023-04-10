import React from "react";
import Modal from "../../../src/components/modules/modal/modal.container";
import { useState } from "react";

export default function ModalExamplePage() {
  // 모달을 실행하거나 종료 시킬 수 있는 state 값을 설정합니다.
  const [isOpen, setIsOpen] = useState(false);

  // 모달을 실행하는 함수입니다.
  const openModal = () => {
    setIsOpen(true);
  };

  // 모달을 종료하는 함수입니다.
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}> 모달 실행하기 </button>
      <Modal show={isOpen} onCloseModal={closeModal}>
        <span> 기본 모달 페이지입니다. </span>
      </Modal>
    </div>
  );
}
