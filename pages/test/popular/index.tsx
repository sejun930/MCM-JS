import styled from "@emotion/styled";

import React, { useState } from "react";
import Popular from "../../../src/components/modules/popular/components";
import { v4 } from "uuid";

let num = 4;
export default function PopularTestPage() {
  const [list, setList] = useState([
    <span key={v4()}>111111</span>,
    <span key={v4()}>22</span>,
    <span key={v4()}>33</span>,
  ]);

  const addList = () => {
    const _list = [...list];
    _list.push(<h1 key={v4()}>{num}</h1>);
    num++;

    setList(_list);
  };

  const removeList = () => {
    const _list = [...list];
    _list.pop();
    num--;

    setList(_list);
  };

  return (
    <Wrapper>
      <Popular children={list} minHeight={{ web: 40 }} useSwipeMode />
      {/* <Popular children={["a", "b"]} minHeight={{ web: 30 }} /> */}
      {/* <Popular children={[<div>A</div>, <div>B</div>, <div>C</div>]} /> */}
      <div style={{ marginTop: "200px" }}>
        <button onClick={addList}>추가</button>
        <button onClick={removeList}>삭제</button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 100px;
`;
