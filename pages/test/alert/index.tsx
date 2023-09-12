import React, { useState } from "react";
import Alert from "../../../src/components/modules/alert";
import { Modal } from "../../../src";

export default function AlertTestPage() {
  const [concept, setConcept] = useState("info");

  const changeConcept = (e) => {
    setConcept(e.target.value);
  };

  const openAlert1 = () => {
    Alert.openAlert({
      closeDelayTime: "infinite",
      children: "aasdasdasdasdasdasdasdas",
      alertConcept: concept,
      className: "test",
      //   id: "aa",
      useCloseMode: { useSwipeMode: true },
      //   alertStyles: { width: "360px" },
      //   alertResponsiveStyles: {
      //     web: { width: "500px" },
      //     mobile: { width: "200px", backgroundColor: "white" },
      //   },
    });
  };

  const openAlert2 = () => {
    Alert.openAlert({
      closeDelayTime: "infinite",
      children: "중복된 id 선택자 입니다.",
      id: "aa",
    });
  };

  return (
    <>
      <select onChange={changeConcept} name="concept">
        <option value="info">info</option>
        <option value="warning">warning</option>
        <option value="error">error</option>
        <option value="success">success</option>
      </select>
      <div>
        <button
          onClick={() =>
            Modal.open({
              children: <button onClick={openAlert1}>alert 실행</button>,
            })
          }
        >
          모달 실행하기
        </button>
      </div>
      <div>
        <button onClick={openAlert1}>alert 실행하기1</button>
      </div>
      <div>
        <button onClick={openAlert2}>alert 실행하기2</button>
      </div>
      <div>
        <button onClick={() => Alert.closeAlert({ className: "test" })}>
          alert 삭제하기 1
        </button>
      </div>
      <div>
        <button onClick={() => Alert.closeAlert({ id: "aa" })}>
          alert 삭제하기 2
        </button>
      </div>
      <div>
        <button onClick={Alert.clearAlert}>초기화</button>
      </div>
    </>
  );
}
