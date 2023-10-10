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
  const [list2] = useState([<div>A</div>, <div>B</div>, <div>C</div>]);
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
      {/* <div>{select}</div> */}
      <Popular
        list={list}
        minHeight={{ web: 60, mobile: 50 }}
        useSwipeMode
        // delay={200000000}
        // setList={{
        //   showRating: true,
        //   hoverStyles: {
        //     color: "#5CD2E6",
        //     fontWeight: 700,
        //     backgroundColor: "#222222",
        //     paddingLeft: "10px",
        //     borderRadius: "10px",
        //   },
        // }}
        changeListEvent={(num) => setSelect(num)}
        popularStyles={{
          borderRadius: "10px 10px 0px 0px",
          backgroundColor: "black",
          color: "white",
        }}
        popularResponsiveStyles={{
          web: {
            color: "green",
          },
          mobile: {
            color: "yellow",
          },
        }}
      />
      {/* <div>{select2}</div>
      <Popular
        list={list2}
        minHeight={{ web: 30 }}
        changeListEvent={(num) => setSelect2(num)}
      />
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
  padding: 100px 500px;
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
