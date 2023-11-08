import React, { useState } from "react";
import _Tooltip from "../../../src/components/modules/tooltip/component/tooltip.container";

import { _Title } from "mcm-js-commons";

export default function Test() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={(prev) => setOpen(!open)}>button</button>

      <div style={{ padding: "280px", display: "flex", gap: "0px 100px" }}>
        <div style={{ height: "100px" }}>
          <_Tooltip
            tooltipText={
              // "ㅁㄴㅇㅁㄴㅇㄴㅁㅇ"
              // <div style={{ height: "200px" }}>
              //   <p>ㄱㄱㄱㄱ</p>
              //   <p>ㄴㄴㄴㄴ</p>
              //   <p>ㄷㄷㄷㄷ</p>
              //   <p>ㄹㄹㄹㄹ</p>
              //   <p>ㅁㅁㅁㅁ</p>
              //   <p>ㅂㅂㅂㅂ</p>
              // </div>
              <img
                style={{ width: "140px", height: "140px" }}
                src="https://s3.ap-northeast-2.amazonaws.com/img.kormedi.com/news/article/__icsFiles/artimage/2018/01/31/c_km601/650445_540.jpg"
              />
            }
            useShowAnimation
            // position="bottom"
            // open={open}
            // isFix
            onOpenAfterEvent={() => console.log("실행")}
            onCloseAfterEvent={() => console.log("종료")}
          >
            <button style={{ fontSize: "24px", width: "120px" }}>
              사진 보기
            </button>
          </_Tooltip>
        </div>

        <div>
          <_Tooltip
            tooltipText={"12312312"}
            useShowAnimation
            // open
            // position="bottom"
            // isFix
            // tooltipStyles={{
            //   // backgroundColor: "black",
            //   padding: "200px",
            //   border: {
            //     color: "#9BE8D8",
            //     width: "4px",
            //     radius: "0px",
            //   },
            //   font: {
            //     color: "#9BE8D8",
            //     size: "20px",
            //     weight: 900,
            //   },
            // }}
            // tooltipMobileStyles={{
            //   padding: "30px",
            //   // backgroundColor: "white",
            //   border: {
            //     color: "red",
            //   },
            //   font: {
            //     color: "red",
            //     size: "100px",
            //   },
            // }}
          >
            <button style={{ fontSize: "24px" }}>내용 보기</button>
          </_Tooltip>
        </div>
      </div>
    </>
  );
}
//
