import React from "react";

import styled from "@emotion/styled";
import _Slider from "../../../src/components/modules/slider";

export default function SliderTestPage() {
  return (
    <Div>
      <_Slider useAutoPlay={{ delay: 3000, showTimer: true }}>
        <img src="https://i.namu.wiki/i/SIHnHey__5syElRWvXqBpod_uf9OtCtB1lgWnxTIn7kxelOGRf-fKrW89m0nmHZ7UtDGkUL8z3rgUqRq_I_exg.webp" />
        {/* <div style={{ backgroundColor: "red" }} className="test">
          111
        </div> */}
        <div style={{ backgroundColor: "green" }} className="test">
          222
        </div>
        <div style={{ backgroundColor: "blue" }} className="test">
          333
        </div>
        <div style={{ backgroundColor: "yellow" }} className="test">
          444
        </div>
      </_Slider>
    </Div>
  );
}

const Div = styled.div`
  padding: 100px;
  height: 600px;

  .test,
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;
