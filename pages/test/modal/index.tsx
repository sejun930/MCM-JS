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

  const [offAutoClose, setOffAutoClose] = useState(false);

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
    <div
      id="test"
      style={{ padding: "200px", paddingLeft: "650px", paddingTop: "300px" }}
    >
      <button onClick={() => setOutOpen(true)} style={{ fontSize: "24px" }}>
        모달 실행
      </button>
      <Modal
        onCloseModal={() => setOutOpen(false)}
        show={outerOpen}
        offAutoClose={offAutoClose}
        onAfterCloseEvent={() => setOffAutoClose(false)}
        showBGAnimation
        showModalOpenAnimation
        closeMent="모달 닫기"
        modalStyles={{
          items: {
            width: "300px",
            height: "300px",
          },
        }}
      >
        <button onClick={() => setOffAutoClose(true)}>
          {" "}
          Modal Components ...{" "}
        </button>
      </Modal>
    </div>
  );
}
