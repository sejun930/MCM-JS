import { Slider, Modal } from "../../../src";
import React, { useState } from "react";

export default function Test() {
  const [test, setTest] = useState(false);
  const [page, setPage] = useState(2);

  const [open, setOpen] = useState(true);

  return (
    <>
      <Modal show={open} onCloseModal={() => setOpen(false)} onFixWindow>
        <div>
          {page}
          <Slider
            useAnimation
            firstPage={2}
            // hideArrow
            useSwipeMode={{ sideMovePercent: 50 }}
            useAutoPlay={{ delay: 5000, showTimer: true }}
            setArrow={{
              hide: false,
              showHover: false,
              contents: <b>222</b>,
              // hideMobile: true,
            }}
            listMinHeight={{ web: "400px", mobile: "200px" }}
            pagination={{ showPageList: true, hideMobile: true }}
            changePageEvent={(idx) => {
              setPage(idx);
            }}
          >
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
          </Slider>
        </div>
      </Modal>
      <div style={{ height: "300px" }}></div>

      <button onClick={() => setOpen(true)}>
        {test ? "changed" : "change"}
      </button>

      {/* <Slider useAnimation useAutoPlay={{ delay: 3000 }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Slider> */}
      <div style={{ height: "1000px" }}></div>
    </>
  );
}
