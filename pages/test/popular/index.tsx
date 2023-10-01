import styled from "@emotion/styled";

import React, { useState } from "react";
import Popular from "../../../src/components/modules/popular/components/popular.render";
import { v4 } from "uuid";

let num = 4;
export default function PopularTestPage() {
  const [list, setList] = useState([
    <div key={v4()}>111111</div>,
    <h2 key={v4()}>22</h2>,
    <h3 key={v4()}>33</h3>,
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
      <button onClick={addList}>추가</button>
      <button onClick={removeList}>삭제</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 100px;
`;
