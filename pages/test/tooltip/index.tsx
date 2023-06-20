import React from "react";
import _Tootip from "../../../src/components/modules/tooltip/component/tooltip.container";

export default function Test() {
  return (
    <div>
      <div></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "200px",
        }}
      >
        <div>qqqqqqqq</div>
        <div>
          <_Tootip tooltipText={<div>1111231231231</div>} useShowAnimation>
            <div>
              <h1 style={{ margin: "0px" }}>gggggggggg</h1>
              <div>222</div>
              {/* <img src="https://us.123rf.com/450wm/mblach/mblach1402/mblach140200030/25799171-%EC%82%AC%EA%B3%BC.jpg" /> */}
            </div>
          </_Tootip>
        </div>
      </div>
    </div>
  );
}
