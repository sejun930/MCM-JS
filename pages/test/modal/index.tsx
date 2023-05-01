import React from "react";
import { Modal } from "../../../src";
// import Modal from "../../../src/components/modules/modal/modal.container";
import { useState } from "react";

import _Modal from "../../../src/components/modules/modal";

export default function ModalExamplePage() {
  // 모달을 실행하거나 종료 시킬 수 있는 state 값을 설정합니다.
  const [outerOpen, setOutOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);
  const [lastOpen, setLastOpen] = useState(false);

  // 모달을 실행하는 함수입니다.
  const openOuterModal = () => {
    setOutOpen(true);
    setInnerOpen(true);
    setLastOpen(true);
  };

  // 모달을 종료하는 함수입니다.
  const closeModal = () => {
    setOutOpen(false);
  };

  const closeInnerOpen = () => {
    Modal.close();
    // setInnerOpen(false);
  };

  return (
    <div id="test">
      <form>
        <p>
          <button onClick={openOuterModal} type="button">
            {" "}
            모달 실행하기 - Use With State
          </button>
          <Modal
            show={outerOpen}
            onCloseModal={() => setOutOpen(false)}
            id="outer-modal"
            showBGAnimation
            showModalOpenAnimation
          >
            <Modal
              show={innerOpen}
              onCloseModal={() => setInnerOpen(false)}
              modalSize={{ width: "250px", height: "250px" }}
              id="inner-modal"
              showBGAnimation
              showModalOpenAnimation
            >
              <Modal
                show={lastOpen}
                onCloseModal={() => setLastOpen(false)}
                modalSize={{ width: "100px", height: "100px" }}
                showBGAnimation
                showModalOpenAnimation
              ></Modal>
            </Modal>
          </Modal>
        </p>
        <p>
          <button
            onClick={() =>
              Modal.open({
                onCloseModal: () => Modal.close(),
                showBGAnimation: true,
                showModalOpenAnimation: true,
                id: "aaa",
                children: (
                  <Modal
                    show={true}
                    onCloseModal={() => Modal.close()}
                    modalSize={{ width: "300px", height: "300px" }}
                    showBGAnimation
                    showModalOpenAnimation
                  >
                    333
                  </Modal>
                ),
              })
            }
            type="button"
          >
            모달 실행하기 - In Function
          </button>
        </p>
      </form>
    </div>
  );
}
