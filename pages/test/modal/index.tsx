import React from "react";
import { useState } from "react";
import _Modal from "../../../src/components/modules/modal/modal.container";

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
      <_Modal
        show={modal}
        onCloseModal={closeModal}
        // styles={{ width: "400px", height: "300px" }}
        // closeButtonSize="25"
      >
        <div style={{ height: "1000px" }}>모달 실행완료 1</div>
      </_Modal>
      <hr />

      <div style={{ height: "3000px" }}></div>
      <button onClick={() => setModal2(true)}>모달 실행하기2</button>
      <_Modal
        show={modal2}
        onCloseModal={closeModal2}
        onBGAnimation
        onModalOpenAnimation
        // hideCloseButton
      >
        모달 실행완료 2
      </_Modal>
    </>
  );
}
