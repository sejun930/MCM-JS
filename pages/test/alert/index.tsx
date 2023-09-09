import React from "react";
import Alert from "../../../src/components/modules/alert";

export default function AlertTestPage() {
  const openAlert1 = () => {
    Alert.openAlert({
      closeDelayTime: 5000000000,
      children: "중복된 id 선택자 입니다. 2222222",
      //   id: "aa",
    });
  };

  const openAlert2 = () => {
    Alert.openAlert({
      closeDelayTime: 5000000000,
      children: "중복된 id 선택자 입니다.",
      id: "aa",
    });
  };

  return (
    <>
      <div>
        <button onClick={openAlert1}>alert 실행하기1</button>
      </div>
      <div>
        <button onClick={openAlert2}>alert 실행하기2</button>
      </div>
      <div>
        <button onClick={() => Alert.removeAlert({ id: "aa" })}>
          alert 삭제하기
        </button>
      </div>
      <div>
        <button onClick={Alert.clearAlert}>초기화</button>
      </div>
    </>
  );
}
