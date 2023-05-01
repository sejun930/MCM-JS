import React from "react";
import { Modal } from "../../../src";
// import Modal from "../../../src/components/modules/modal/modal.container";
import { useState } from "react";

import _Modal from "../../../src/components/modules/modal";

export default function ModalExamplePage() {
  // 모달을 실행하거나 종료 시킬 수 있는 state 값을 설정합니다.
  const [isOpen, setIsOpen] = useState(true);

  // 모달을 실행하는 함수입니다.
  const openModal = () => {
    setIsOpen(true);
  };

  // 모달을 종료하는 함수입니다.
  const closeModal = () => {
    console.log("click");
    Modal.close({ id: "aaaa" });
    setIsOpen(false);
  };

  const openWindow = () => {
    const a = Modal.close();
  };
  console.log(isOpen);

  return (
    <div id="test">
      <button
        onClick={() => {
          Modal.open({
            showBGAnimation: true,
            showModalOpenAnimation: true,
            id: "aaaa",
            className: "bbb",
            children: (
              <Modal
                show={true}
                onCloseModal={closeModal}
                modalSize={{ width: "100px", height: "100px" }}
                showBGAnimation
                showModalOpenAnimation
              >
                111
              </Modal>
            ),
          });
        }}
      >
        클릭2
      </button>
      <form>
        {/* <button onClick={openModal} type="button">
          {" "}
          모달 실행하기{" "}
        </button>
        <Modal
          show={isOpen}
          className="test-state-modal"
          id="test-state-modal-id"
          onCloseModal={closeModal}
          showBGAnimation
          showModalOpenAnimation
          closeMent="닫기"
        >
          <h1 style={{ textAlign: "center" }}>
            작성된 내용을 삭제하시겠습니까? asd sad sadsa dsadasdsad sadasdasdsa
          </h1>
          <button
            type="button"
            onClick={() =>
              Modal.close({
                onCloseModal: closeModal,
                id: "test-state-modal-id",
              })
            }
          >
            모달 종료
          </button>
        </Modal> */}
      </form>
      {/* <div style={{ height: "2000px" }}></div> */}
      <button onClick={() => alert(2)}>클릭</button>
    </div>
  );
}
