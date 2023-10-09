import styled from "@emotion/styled";

import React, { useState } from "react";
import Popular from "../../../src/components/modules/popular/components";
import { v4 } from "uuid";

let num = 4;
export default function PopularTestPage() {
  const [list, setList] = useState([
    <Spen key={v4()}>
      <img src="https://img.research-paper.co.kr/resources/2018/09/08/LTyLnM2Wq84dABaN.jpg" />
      풋사과
    </Spen>,

    <Spen key={v4()}>
      <img src="data:image/jpeg;base64,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" />
      빨간 사과
    </Spen>,
    <Spen key={v4()}>
      <img src="https://health.chosun.com/site/data/img_dir/2020/10/19/2020101902307_0.jpg" />
      썩은 사과
    </Spen>,
    <Spen key={v4()}>
      <img src="https://img.newspim.com/news/2021/10/23/2110232021598600.jpg" />
      노란 사과
    </Spen>,
    <Spen>1</Spen>,
    <Spen>2</Spen>,
    <Spen>3</Spen>,
  ]);
  const [list2] = useState([<div>A</div>, <div>B</div>, <div>C</div>]);
  const list3 = [<div>ㄱ</div>, <div>ㄴ</div>, <div>ㄷ</div>];
  //   const [list3] = useState([<div>ㄱ</div>, <div>ㄴ</div>, <div>ㄷ</div>]);
  const [test, setTest] = useState(false);

  const [select, setSelect] = useState(0);
  const [select2, setSelect2] = useState(0);
  const [select3, setSelect3] = useState(0);

  const changeSelect = (num) => {
    setSelect(num);
  };

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
      <div>{select}</div>
      <Popular
        list={list}
        minHeight={{ web: 60, mobile: 50 }}
        useSwipeMode
        // delay={200000000}
        setList={{
          showRating: true,
        }}
        // changeListEvent={(num) => setSelect(num)}
      />
      <div>{select2}</div>
      <Popular
        list={list2}
        minHeight={{ web: 30 }}
        // changeListEvent={(num) => setSelect2(num)}
      />
      <div>{select3}</div>
      <Popular
        list={list3}
        minHeight={{ web: 30 }}
        // changeListEvent={(num) => setSelect3(num)}
      />
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

const Spen = styled.span`
  display: flex;
  align-items: center;
  gap: 0px 10px;

  img {
    height: 40px;
    width: 40px;
    object-fit: cover;
  }
`;
