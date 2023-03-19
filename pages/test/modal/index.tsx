import React from "react";
import { useState } from "react";
import Modal from "../../../src/components/modules/modal/modal.container";

export default function ModalTestPage() {
  const [modal, setModal] = useState(true);
  const [modal2, setModal2] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const closeModal2 = () => {
    setModal2(false);
  };

  return (
    <>
      <button onClick={() => setModal(true)}>모달 실행하기</button>
      <Modal
        show={modal}
        onCloseModal={closeModal}
        closeButtonSize="20px"
        styles={{ width: "767px" }}
        mobileDefaultStyles={{ width: "80%", height: "60%" }}
        showBGAnimation
        showModalOpenAnimation
        closeMent="Close"
        // hideCloseButton
        // offAutoClose
      >
        {new Array(100).fill(1).map((el) => (
          <p>{1}</p>
        ))}
      </Modal>
      <hr />

      <div style={{ height: "3000px", backgroundColor: "#666666" }}></div>
      <button onClick={() => setModal2(true)}>모달 실행하기2</button>
      <Modal
        show={modal2}
        onCloseModal={closeModal2}
        // showBGAnimation
        // showModalOpenAnimation
        // hideCloseButton
        // closeButtonSize="100"
      >
        모달 실행완료 2
      </Modal>
    </>
  );
}
