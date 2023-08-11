import React from "react";
import _Modal from "../../../src/components/modules/modal";

export default function ModalExamplePage() {
  return (
    <button
      onClick={() =>
        _Modal.open({
          children: (
            <div>
              <span> 상위 모달 </span>
              <_Modal
                show={true}
                onCloseModal={() => _Modal.close({ id: "parents-modal" })}
                modalSize={{ width: "400px", height: "400px" }}
                mobileModalSize={{ width: "50%", height: "50%" }}
                showBGAnimation={true}
                showModalOpenAnimation={true}
              >
                <span> 하위 모달을 종료하면 상위 모달도 함께 종료됩니다. </span>
              </_Modal>
            </div>
          ),
          id: "parents-modal",
          showBGAnimation: true,
          showModalOpenAnimation: true,
        })
      }
    >
      모달 실행하기
    </button>
  );
}
