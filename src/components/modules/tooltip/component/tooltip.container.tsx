import _TooltipUIPage from "./tooltip.presenter";
import { createRoot } from "react-dom/client";
import { TooltipTailContents, TooltipHoverRange } from "./tooltip.styles";

import { _Error } from "mcm-js-commons";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { TooltipPropsType } from "./tooltip.types";
import { v4 } from "uuid";

// position의 종류가 아래의 4가지에 일치하는지 검증
const filterPosition = ["top", "bottom", "left", "right"];

// 실행 및 종료 타임 이벤트
const timerEvent: {
  [key: string]: {
    open: null | ReturnType<typeof setTimeout>;
    close: null | ReturnType<typeof setTimeout>;
  };
} = {};
export default function _RenderTooltip(props: TooltipPropsType) {
  const _uuid = v4();

  return (
    <_Error propsList={{ ...props }} requiredList={["children", "tooltipText"]}>
      <_Tooltip {...props} _uuid={_uuid} />
    </_Error>
  );
}

function _Tooltip(props: TooltipPropsType & { _uuid: string }) {
  const {
    tooltipText,
    useShowAnimation,
    isDisable,
    position,
    open,
    isFix,
    onCloseAfterEvent,
    onOpenAfterEvent,
    hideMobile,
    offHoverEvent,
    _uuid,
  } = props;

  // 중복 실행 방지 변수
  let loading = false;

  // wrapper ref
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  // text contents ref
  const textRef = useRef() as MutableRefObject<HTMLDivElement>;
  // text contents range ref
  const textRangeRef = useRef() as MutableRefObject<HTMLDivElement>;

  // position이 4가지의 종류에 일치하지 않는다면 기본값 top 부여
  let _position = filterPosition.some((el) => el === position)
    ? position
    : "top";

  // uuid
  const [uuid, setUuid] = useState("");

  // 수동으로 툴팁을 오픈하거나 종료할 경우
  useEffect(() => {
    if (open) openTooltip();
    else closeTooltip();
  }, [open]);

  // uuid 최초 기입
  useEffect(() => {
    console.log(_uuid, uuid);

    if (!uuid && _uuid) {
      // uuid 최초 설정
      setUuid(_uuid);
      // uuid로 구분될 시간 이벤트 설정
      timerEvent[_uuid] = {
        open: null,
        close: null,
      };
    }
  }, []);

  // isDisable 설정시, 말풍선 off
  // useEffect(() => {
  //   if (isDisable) setTooltipOpen(false);
  // }, [isDisable]);

  // 모바일 환경 터치 이벤트 감지
  useEffect(() => {
    if (!hideMobile && !offHoverEvent)
      document.addEventListener("touchend", checkMobileTouchCloseEvent);

    return () => {
      document.removeEventListener("touchend", checkMobileTouchCloseEvent);
    };
  });

  // 마우스 hover시 말풍선 오픈
  const openTooltip = () => {
    if (isDisable || !timerEvent[uuid]) return;

    let doc = document.getElementById(`tooltip-${uuid}`);
    // 툴팁 오픈하기
    if (wrapperRef && wrapperRef.current && !doc) {
      // loading = true; // 중복 실행 방지

      // wrapper에 관한 위치값 저장
      const wrapperRects = wrapperRef.current.getClientRects()[0];
      let top = wrapperRects.top;
      const { left, width, height } = wrapperRects;

      const _tooltipWrapper = document.createElement("div");
      // id 값 부여
      _tooltipWrapper.setAttribute("id", `tooltip-${uuid}`);

      _tooltipWrapper.style.position = "absolute";
      _tooltipWrapper.style.width = `${width}px`;
      _tooltipWrapper.style.display = `flex`;
      _tooltipWrapper.style.justifyContent = `center`;

      _tooltipWrapper.style.top = `${Math.floor(top)}px`;
      _tooltipWrapper.style.left = `${Math.floor(left)}px`;
      _tooltipWrapper.style.opacity = "0";

      // 툴팁 메세지 window 직접 추가
      document.body.append(_tooltipWrapper);

      // 마우스가 올려져 있는지 체크
      const overMouse = () => {
        if (textRangeRef && textRangeRef.current)
          textRangeRef.current.classList.add("over");
      };
      // 마우스가 벗어났는지 체크
      const outMouse = () => {
        if (textRangeRef && textRangeRef.current)
          if (textRangeRef.current.classList.contains("over"))
            textRangeRef.current.classList.remove("over");
      };

      // 툴팁 메세지 태그 적용
      createRoot(_tooltipWrapper).render(
        <>
          <TooltipTailContents ref={textRef} position={position}>
            {tooltipText}
          </TooltipTailContents>
          <TooltipHoverRange
            ref={textRangeRef}
            onMouseOver={overMouse}
            onMouseOut={outMouse}
          />
        </>
      );

      if (timerEvent[uuid].close) clearTimeout(timerEvent[uuid].close);
      timerEvent[uuid].open = setTimeout(() => {
        doc = document.getElementById(`tooltip-${uuid}`);

        if (doc) {
          if (textRef && textRef.current) {
            const textRefRects = textRef.current.getClientRects()[0];

            // 마우스 hover 범위 구하기
            if (textRangeRef && textRangeRef.current) {
              textRangeRef.current.style.minWidth = `${textRefRects.width}px`;
              textRangeRef.current.style.minHeight = `${
                textRefRects.height + height
              }px`;

              if (!textRangeRef.current.classList.contains("over")) {
                // 현재 마우스가 벗어났을 경우 = 툴팁 제거하기
                closeTooltip();
                return;
              }

              // 종료 이벤트 설정
              if (!isFix)
                textRangeRef.current.addEventListener(
                  "mouseleave",
                  closeTooltip
                );
            }

            let allHeight = height;
            let moveRange = 10; // 애니메이션 적용시 이동할 범위값

            if (position === "bottom") {
              // 포지션이 아래로 설정된 경우
              top += wrapperRects.height;
              moveRange = -10;
            } else {
              // 포지션이 설정되지 않거나 위로 설정된 경우
              top -= Math.floor(textRefRects.height);
              allHeight += textRefRects.height;
            }

            // 애니메이션 사용시
            if (useShowAnimation) {
              window.setTimeout(() => {
                doc.style.top = `${top + moveRange}px`;

                window.setTimeout(() => {
                  doc.style.transition = "all .3s";
                  doc.style.top = `${top}px`;
                  doc.style.opacity = "1";
                }, 20);
              }, 10);
            } else {
              // 툴팁 노출 및 최종 위치 이동
              doc.style.top = `${top}px`;
              doc.style.opacity = "1";
            }

            // 실행 후 이벤트가 있다면 이벤트 실행
            if (onOpenAfterEvent) onOpenAfterEvent();
          }
        }
      }, 50);
    }
  };

  // 툴팁 종료하기
  const closeTooltip = () => {
    // 고정된 툴팁이거나 호버 이벤트가 꺼져있다면 종료 방지
    if (isFix || isDisable || !timerEvent[uuid]) return;

    const doc = document.getElementById(`tooltip-${uuid}`);
    console.log(doc);
    if (doc) {
      let timer = 0;

      if (useShowAnimation) {
        timer = 300;
        // 애니메이션 사용시
        const docRects = doc.getClientRects()[0];

        doc.style.top = `${docRects.top + 10}px`;
        doc.style.opacity = "0";
      }

      if (textRangeRef && textRangeRef.current)
        textRangeRef.current.removeEventListener("mouseleave", closeTooltip);
      if (timerEvent[uuid].open) clearTimeout(timerEvent[uuid].open);

      timerEvent[uuid].close = setTimeout(() => {
        loading = false;
        doc.remove();

        // 종료 후 이벤트가 있다면 종료 직후 이벤트 실행
        if (onCloseAfterEvent) onCloseAfterEvent();
      }, timer);
    }
  };

  // 모바일 환경에서 터치 이벤트 감지하여 툴팁 종료하기
  const checkMobileTouchCloseEvent = (e) => {
    // 말풍선 위치에서 벗어난 경로를 클릭할 경우
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      closeTooltip();
    }
  };

  return (
    <_TooltipUIPage
      {...props}
      openTooltip={openTooltip}
      closeTooltip={closeTooltip}
      textRef={textRef}
      position={_position}
      wrapperRef={wrapperRef}
    />
  );
}
