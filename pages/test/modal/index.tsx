import React from "react";
import { Modal } from "../../../src";
// import Modal from "../../../src/components/modules/modal/modal.container";
import { useState, useRef } from "react";

import _Modal from "../../../src/components/modules/modal";
import { _Input } from "mcm-js-commons";

export default function ModalExamplePage() {
  const inputRef = useRef();
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
      <p>
        <button onClick={openOuterModal} type="button">
          {" "}
          모달 실행하기 - Use With State
        </button>
        <Modal
          show={outerOpen}
          onCloseModal={() => {
            setOutOpen(false);
          }}
          id="outer-modal"
          showBGAnimation
          showModalOpenAnimation
          name="test"
        >
          <Modal
            show={innerOpen}
            onCloseModal={() => {
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
              onAfterCloseEvent={() => {
                Modal.close({ id: "outer-modal" });
                setOutOpen(false);
              }}
              modalSize={{ width: "100px", height: "100px" }}
              showBGAnimation
              showModalOpenAnimation
              onFixWindow
            ></Modal>
          </Modal>
        </Modal>
      </p>
      <p>
        <button
          onClick={() =>
            Modal.open({
              showBGAnimation: true,
              showModalOpenAnimation: true,
              id: "aaa",
              name: "test",
              offAutoClose: true,
              children: <>111</>,
              modalSize: {
                // width: "400px",
              },
              modalStyles: {
                wrapper: {
                  color: "red",
                },
                items: {
                  width: "200px",
                },
                closeButton: {
                  backgroundColor: "red",
                  width: "200px",
                },
                contents: {
                  backgroundColor: "skyblue",
                  width: "50%",
                },
              },
              mobileModalStyles: {
                wrapper: {
                  color: "blue",
                },
                items: {
                  width: "300px",
                },
                closeButton: {
                  backgroundColor: "blue",
                  width: "100px",
                },
                contents: {
                  backgroundColor: "gray",
                  width: "70%",
                },
              },
            })
          }
          type="button"
        >
          모달 실행하기 - In Function
        </button>
      </p>
      <p style={{ height: "2000px" }}>
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
                onCloseModal={() => Modal.close({ className: "aaa" })}
                showBGAnimation
                showModalOpenAnimation
                modalSize={{ width: "200px", height: "200px" }}
                className="bbb"
                id="ccc"
              ></Modal>
            </Modal>
          </Modal>
        </Modal>
      </p>
      <p>
        <button
          onClick={() =>
            Modal.open({
              show: true,
              showBGAnimation: true,
              showModalOpenAnimation: true,
              id: "a1",
              children: (
                <div>
                  <button
                    onClick={() =>
                      Modal.open({
                        showBGAnimation: true,
                        showModalOpenAnimation: true,
                        children: (
                          <div>
                            <button
                              onClick={() =>
                                Modal.open({
                                  showBGAnimation: true,
                                  showModalOpenAnimation: true,
                                  modalSize: {
                                    width: "100px",
                                    height: "100px",
                                  },
                                  id: "a3",
                                  // offAutoClose: true,
                                  onCloseModal: () => Modal.close({ id: "a1" }),
                                  onAfterCloseEvent: () => {
                                    inputRef.current.focus();
                                  },
                                  children: (
                                    <div>
                                      {/* <button
                                        onClick={() =>
                                          Modal.close({ id: "a3" })
                                        }
                                      >
                                        하나만 닫기
                                      </button>
                                      <p></p>
                                      <button
                                        onClick={() =>
                                          Modal.close({ id: "a1" })
                                        }
                                      >
                                        모두 닫기
                                      </button> */}
                                    </div>
                                  ),
                                })
                              }
                            >
                              하위 모달 오픈 2
                            </button>
                          </div>
                        ),
                        modalSize: { width: "400px", height: "400px" },
                      })
                    }
                  >
                    하위 모달 오픈 1
                  </button>
                </div>
              ),
            })
          }
        >
          모달 실행하기 - Multiple & Close Modal
        </button>
        <input ref={inputRef as any} />
      </p>
      <button
        style={{ position: "fixed", top: 0, zIndex: 99999, color: "white" }}
        onClick={() => setOutOpen(false)}
      >
        모달 닫기
      </button>
    </div>
  );
}
