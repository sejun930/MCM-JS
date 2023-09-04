import { Slider } from "../../../src";
import React, { useState } from "react";

export default function Test() {
  const [test, setTest] = useState(false);

  return (
    <>
      <button onClick={() => setTest((prev) => !prev)}>
        {test ? "changed" : "change"}
      </button>
      <Slider useAnimation useAutoPlay={{ delay: 3000 }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </Slider>
      {/* <Slider useAnimation useAutoPlay={{ delay: 3000 }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Slider> */}
    </>
  );
}
