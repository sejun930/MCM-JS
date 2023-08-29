import React from "react";

import styled from "@emotion/styled";
import { Slider } from "../../../src";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export default function SliderTestPage() {
  return (
    <Div>
      <Slider
        useAnimation
        useAutoPlay={{ delay: 3000, showTimer: false }}
        pagination={{ showPageList: true }}
        useDragMode={{
          sideMovePercent: 23,
        }}
      >
        <div style={{ backgroundColor: "green" }} className="test">
          4444
        </div>
        <div
          style={{
            backgroundImage:
              'url("https://i.namu.wiki/i/SIHnHey__5syElRWvXqBpod_uf9OtCtB1lgWnxTIn7kxelOGRf-fKrW89m0nmHZ7UtDGkUL8z3rgUqRq_I_exg.webp")',
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
          }}
        />
        <div style={{ backgroundColor: "blue" }} className="test">
          333
        </div>
      </Slider>
      {/* <Slider
        pagination={{ showPageList: true }}
        useAutoPlay={{ delay: 4000, showTimer: true }}
      >
        <div className="test">1</div>
        <div className="test">2</div>
      </Slider> */}
    </Div>
  );
}

const Div = styled.div`
  padding: 100px;
  /* height: 600px; */

  .test,
  img {
    width: 100%;
    height: 100%;
    min-height: 300px;
    object-fit: fill;
  }

  @media ${breakPoints.mobileLarge} {
    padding: 20px;
  }
`;
