import { Modal } from "../../../src";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import _Modal from "../../../src/components/modules/modal";
import { _Input } from "mcm-js-commons";

export default function ModalExamplePage() {
  const inputRef = useRef();
  // 모달을 실행하거나 종료 시킬 수 있는 state 값을 설정합니다.
  const [outerOpen, setOutOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);
  const [lastOpen, setLastOpen] = useState(false);

  const [outerOpen2, setOuterOpen2] = useState(false);
  const router = useRouter();

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
      <button onClick={() => setOutOpen(true)}>모달 실행</button>
      <Modal
        show={outerOpen}
        onCloseModal={() => setOutOpen(false)}
        onFixWindow
        offAutoClose
        showBGAnimation
        showModalOpenAnimation
      >
        <button
          onClick={() =>
            Modal.open({
              children: <div>하위 모달</div>,
              modalSize: { width: "100px", height: "100px" },
            })
          }
        >
          하위 모달 열기
        </button>
      </Modal>
      <button
        onClick={() =>
          Modal.open({
            children: (
              <button
                onClick={() =>
                  Modal.open({
                    children: <div>하위 모달</div>,
                    modalSize: { width: "100px", height: "100px" },
                  })
                }
              >
                하위 모달 열기
              </button>
            ),
            onFixWindow: true,
          })
        }
      >
        모달 열기2
      </button>
      <Link
        href={"/test/modal2"}
        style={{
          position: "fixed",
          top: 0,
          zIndex: 99999,
          color: "white",
          left: "300px",
        }}
      >
        페이지 이동
      </Link>
      {/* <button
        style={{
          position: "fixed",
          top: 0,
          zIndex: 99999,
          color: "white",
          left: "300px",
        }}
        onClick={() => router.push("/test/modal2")}
      >
        페이지 이동
      </button> */}
    </div>
  );
}
