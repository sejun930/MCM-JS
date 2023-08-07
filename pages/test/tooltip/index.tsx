import React, { useState } from "react";
import _Tooltip from "../../../src/components/modules/tooltip/component/tooltip.container";

import { _Title } from "mcm-js-commons";

export default function Test() {
  const [disAble, setDisAble] = useState(false);
  return (
    <div style={{ padding: "280px", display: "flex", gap: "0px 100px" }}>
      <_Tooltip
        tooltipText={
          <img style={{ width: "140px" }} src="/images/watermelon.webp" />
        }
        useShowAnimation
      >
        <button style={{ fontSize: "24px" }}>사진 보기</button>
      </_Tooltip>

      <_Tooltip
        tooltipText={
          <span style={{ fontSize: "20px" }}>수박 (Watermelon)</span>
        }
        useShowAnimation
      >
        <button style={{ fontSize: "24px" }}>내용 보기</button>
      </_Tooltip>
    </div>
  );
}
//
//
