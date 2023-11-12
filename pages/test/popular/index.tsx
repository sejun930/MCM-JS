import styled from "@emotion/styled";

import React, { useState } from "react";
import Popular from "../../../src/components/modules/popular";
import { v4 } from "uuid";

let num = 4;
export default function PopularTestPage() {
  const [list, setList] = useState([
    <Spen key={v4()}>
      <img src="/img/apple1.png" />
      풋사과
    </Spen>,
    <Spen key={v4()}>
      <img src="/img/apple2.png" />
      빨간 사과
    </Spen>,
    <Spen key={v4()}>
      <img src="/img/apple3.png" />
      썩은 사과
    </Spen>,
    // <Spen key={v4()}>
    //   <img src="/img/apple4.png" />
    //   노란 사과
    // </Spen>,
    // <Spen>1</Spen>,
    // <Spen>2</Spen>,
    // <Spen>3</Spen>,
  ]);
  const [list2] = useState([
    "ㅁㅇㅁㄴㅇqweqweqwdasdasdasdasdasdasdasdasdasdㅁㅇㄴㅁㄴㅇㅁㄴㅇ",
    "ㄱㄱㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅂㅈㄷㅂㅈㄷㅂㅈㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴ",
    "ㄱㄱㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅂㅈㄷㅂㅈㄷㅂㅈㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴ",
  ]);
  //   const list3 = [<div>ㄱ</div>, <div>ㄴ</div>, <div>ㄷ</div>];
  const [list3] = useState([<div>ㄱ</div>, <div>ㄴ</div>, <div>ㄷ</div>]);
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
      <Popular
        list={list2}
        minHeight={{ web: 50 }}
        changeListEvent={(num) => setSelect2(num)}
        setList={{
          showRating: true,
        }}
        useSwipeMode
      />
      <Popular
        list={list2}
        minHeight={{ web: 50 }}
        changeListEvent={(num) => setSelect2(num)}
        setList={{
          showRating: true,
        }}
      />
      <Popular
        list={list2}
        minHeight={{ web: 50 }}
        changeListEvent={(num) => setSelect2(num)}
        setList={{
          showRating: true,
        }}
      />
      {/* <div>{select2}</div>
      
      <div>{select3}</div>
      <Popular
        list={list3}
        minHeight={{ web: 30 }}
        changeListEvent={(num) => setSelect3(num)}
      />
      <div style={{ marginTop: "200px" }}>
        <button onClick={addList}>추가</button>
        <button onClick={removeList}>삭제</button>
      </div> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 100px 300px;
  display: flex;
  flex-direction: column;
  gap: 1000px 0px;
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
