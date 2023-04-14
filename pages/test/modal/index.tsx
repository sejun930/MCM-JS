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
      <form>
        <button onClick={openModal} type="button">
          {" "}
          모달 실행하기{" "}
        </button>
        <Modal
          show={isOpen}
          onCloseModal={closeModal}
          showBGAnimation
          showModalOpenAnimation
          // styles={{ width: "100px", height: "100px" }}
        >
          <h1 style={{ textAlign: "center" }}>
            작성된 내용을 삭제하시겠습니까? asd sad sadsa dsadasdsad sadasdasdsa
          </h1>
        </Modal>
      </form>
    </div>
  );
}
