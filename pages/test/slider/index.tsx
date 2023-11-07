import { Slider, Modal } from "../../../src";
import React, { useEffect, useState } from "react";

export default function Test() {
  const [test, setTest] = useState(false);
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setPage(4);
  }, []);

  return (
    <>
      <Modal show={open} onCloseModal={() => setOpen(false)} onFixWindow>
        <div>
          {/* {page} */}
          <Slider
            useAnimation
            firstPage={page}
            // hideArrow
            useSwipeMode={{ sideMovePercent: 50 }}
            useAutoPlay={{ delay: 5000, showTimer: true }}
            setArrow={{
              hide: false,
              // showHover: true,
              contents: {
                left: "➖",
                right: "➕",
              },
              // hideMobile: true,
            }}
            listMinHeight={{ web: "400px", mobile: "200px" }}
            useCurrentPage={{ hideMobile: false }}
            usePagination={{ hideMobile: true }}
            stopInfinite={true}
          >
            <div>1</div>
            <div>2</div>
          </Slider>
          <Slider useAnimation>
            <div>1</div>
            <div>2</div>
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
