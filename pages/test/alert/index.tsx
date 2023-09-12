import React, { useState } from "react";
import Alert from "../../../src/components/modules/alert";
import { Modal } from "../../../src";

import styled from "@emotion/styled";

export default function AlertTestPage() {
  const [concept, setConcept] = useState("info");

  const changeConcept = (e) => {
    setConcept(e.target.value);
  };

  const openAlert1 = () => {
    Alert.openAlert({
      closeDelayTime: "infinite",
      children: "Hello",
      alertConcept: {
        // @ts-ignore
        type: concept,
        // custom: {
        //   color: "green",
        //   icon: {
        //     src: "🕹",
        //     size: 1,
        //     color: "origin",
        //   },
        // },
      },
      className: "test",
      useCloseMode: { useSwipeMode: true },
      // alertStyles: { width: "360px" },
      //   alertResponsiveStyles: {
      //     web: { width: "500px" },
      //     mobile: { width: "200px", backgroundColor: "white" },
      //   },
    });
  };

  const openAlert2 = () => {
    Alert.openAlert({
      closeDelayTime: "infinite",
      children: "World",
      id: "aa",
      //   useCloseMode: { useSwipeMode: true },
      alertConcept: {
        type: "success",
      },
    });
  };

  return (
    <Wrapper>
      {/* <button onClick={openAlert1}>Hello</button>
      <button onClick={openAlert2}>World</button> */}
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 240px;
  gap: 0px 60px;

  button {
    font-size: 18px;
    border: solid 1px black;
    border-radius: 10px;
    padding: 10px;
  }
`;
