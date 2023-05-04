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

  const [outerOpen2, setOuterOpen2] = useState(false);

  // 모달을 실행하는 함수입니다.
  const openOuterModal = () => {
    setOutOpen(true);
    setInnerOpen(true);
    setLastOpen(false);
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
      {/* <form> */}
      <p>
        <button onClick={openOuterModal} type="button">
          {" "}
          모달 실행하기 - Use With State
        </button>
        <Modal
          show={outerOpen}
          onCloseModal={() => {
            console.log("11");
            setOutOpen(false);
          }}
          id="outer-modal"
          showBGAnimation
          showModalOpenAnimation
        >
          <Modal
            show={innerOpen}
            onCloseModal={() => {
              console.log(22);
              setInnerOpen(false);
            }}
            modalSize={{ width: "250px", height: "250px" }}
            id="inner-modal"
            showBGAnimation
            showModalOpenAnimation
          >
            <button onClick={() => setLastOpen(true)}>모달 실행</button>
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
              onCloseModal: () => {
                Modal.close();
              },
              showBGAnimation: true,
              showModalOpenAnimation: true,
              id: "aaa",
              children: (
                <>111</>
                // <button
                //   onClick={() =>
                //     Modal.open({
                //       showBGAnimation: true,
                //       showModalOpenAnimation: true,
                //       modalSize: { width: "250px", height: "250px" },

                //       children: (
                //         <button
                //           onClick={() =>
                //             Modal.open({
                //               showBGAnimation: true,
                //               showModalOpenAnimation: true,
                //               modalSize: { width: "100px", height: "100px" },
                //               onCloseModal: () => Modal.close(),
                //             })
                //           }
                //         >
                //           최하위 모달 오픈
                //         </button>
                //       ),
                //       // onCloseModal: () => Modal.close({ id: "aaas" }),
                //     })
                //   }
                // >
                //   하위 모달 오픈
                // </button>
              ),
            })
          }
          type="button"
        >
          모달 실행하기 - In Function
        </button>
      </p>
      <div>
        <button onClick={() => setOuterOpen2(true)}>
          모달 실행하기 - Use With State & Close Modal
        </button>
        <Modal
          show={outerOpen2}
          onCloseModal={() => setOuterOpen2(false)}
          showBGAnimation
          showModalOpenAnimation
          className="aaab"
        >
          <Modal
            show={true}
            onCloseModal={() => Modal.close()}
            showBGAnimation
            showModalOpenAnimation
            modalSize={{ width: "400px", height: "400px" }}
            className="aaa"
          >
            <Modal
              show={true}
              onCloseModal={() => Modal.close()}
              showBGAnimation
              showModalOpenAnimation
              modalSize={{ width: "300px", height: "300px" }}
              id="bbbb"
              className="aaa"
            >
              <Modal
                show={true}
                onCloseModal={() => Modal.close({})}
                showBGAnimation
                showModalOpenAnimation
                modalSize={{ width: "200px", height: "200px" }}
                className="bbb"
                id="ccc"
              ></Modal>
            </Modal>
          </Modal>
        </Modal>
      </div>
    </div>
  );
}
