import React, { useState } from "react";
import _Tooltip from "../../../src/components/modules/tooltip/component/tooltip.container";

export default function Test() {
  const [disAble, setDisAble] = useState(false);
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
        <div style={{ display: "flex", gap: "0px 20px" }}>
          <_Tooltip
            tooltipText="open1"
            useShowAnimation
            position={{ top: "-100px" }}
          >
            📌
          </_Tooltip>
          <_Tooltip
            tooltipText="open2"
            useShowAnimation
            position={{ top: "-50px" }}
          >
            <div>오픈 2</div>
          </_Tooltip>
          <_Tooltip
            tooltipText="open3"
            useShowAnimation
            position={{ top: "-10px" }}
          >
            <div>오픈 3</div>
          </_Tooltip>
        </div>

        {/* <div>qqqqqqqq</div> */}
        <div style={{ marginTop: "50px" }}>
          <_Tooltip
            tooltipText="안녕하세요?"
            useShowAnimation
            isDisable={disAble}
          >
            <div>
              {/* 말풍선 오픈하기 */}
              {/* <span>말풍선 오픈하기</span> */}
              {/* <h1 style={{ margin: "0px" }}>말풍선 오픈하기</h1> */}
              <img src="https://us.123rf.com/450wm/mblach/mblach1402/mblach140200030/25799171-%EC%82%AC%EA%B3%BC.jpg" />
            </div>
          </_Tooltip>
        </div>
      </div>
      <button onClick={() => setDisAble((prev) => !prev)}>
        말풍선 {disAble ? "on" : "off"}
      </button>
    </div>
  );
}
//
//
