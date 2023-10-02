import styled from "@emotion/styled";

import React, { useState } from "react";
import Popular from "../../../src/components/modules/popular/components/render";
import { v4 } from "uuid";

let num = 4;
export default function PopularTestPage() {
  const [list, setList] = useState([
    <div key={v4()}>111111</div>,
    <div key={v4()}>22</div>,
    <div key={v4()}>33</div>,
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
      <Popular children={list} />
      {/* <Popular children={["a", "b"]} /> */}
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
