import React from "react";
import { useState } from "react";
import _Modal from "../../../src/components/modules/modal";

export default function ModalTestPage() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const closeModal2 = () => {
    setModal2(false);
  };
  console.log(modal);

  return (
    <>
      <button onClick={() => setModal(true)}>모달 실행하기</button>
      <_Modal show={modal} onCloseModal={closeModal}>
        123
      </_Modal>
      <hr />
      <button onClick={() => setModal2(true)}>모달 실행하기2</button>
      <_Modal
        show={modal2}
        onCloseModal={closeModal2}
        // offAutoClose
        // offAnimation
        // hideCloseButton
      >
        모달 실행완료 2
      </_Modal>
    </>
  );
}
