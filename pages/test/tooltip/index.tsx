import React, { useState } from "react";
import _Tooltip from "../../../src/components/modules/tooltip/component/tooltip.container";

import { _Title } from "mcm-js-commons";

export default function Test() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={(prev) => setOpen(!open)}>button</button>

      <div style={{ padding: "280px", display: "flex", gap: "0px 100px" }}>
        <_Tooltip
          tooltipText={
            <img style={{ width: "140px" }} src="/images/watermelon.webp" />
          }
          useShowAnimation
          position="left"
          // open={open}
          // isFix
          isDisable={open}
          hideMobile
        >
          <button style={{ fontSize: "24px" }}>사진 보기</button>
        </_Tooltip>

        <_Tooltip
          tooltipText={"12312312"}
          useShowAnimation
          // position="bottom"
          isFix
          tooltipStyles={{
            // backgroundColor: "black",
            padding: "200px",
            border: {
              color: "#9BE8D8",
              width: "4px",
              radius: "0px",
            },
            font: {
              color: "#9BE8D8",
              size: "20px",
              weight: 900,
            },
          }}
          tooltipMobileStyles={{
            padding: "30px",
            // backgroundColor: "white",
            border: {
              color: "red",
            },
            font: {
              color: "red",
              size: "100px",
            },
          }}
        >
          <button style={{ fontSize: "24px" }}>내용 보기</button>
        </_Tooltip>
      </div>
    </>
  );
}
//
