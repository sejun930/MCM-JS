import { Slider } from "../../../src";
import React, { useState } from "react";

export default function Test() {
  const [test, setTest] = useState(false);

  return (
    <>
      <button onClick={() => setTest((prev) => !prev)}>
        {test ? "changed" : "change"}
      </button>
      <div>
        <Slider
          useAnimation
          // firstPage={3}
          // hideArrow
          useAutoPlay={{ delay: 5000, showTimer: true }}
          listMinHeight={{ web: "400px", mobile: "600px" }}
          pagination={{ showPageList: true }}
        >
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </Slider>
      </div>

      {/* <Slider useAnimation useAutoPlay={{ delay: 3000 }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Slider> */}
    </>
  );
}
