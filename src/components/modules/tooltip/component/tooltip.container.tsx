import _TooltipUIPage from "./tooltip.presenter";
import { createRoot } from "react-dom/client";
import { TooltipTextWrapper, TooltipTailContents } from "./tooltip.styles";

import { _Error } from "mcm-js-commons";
import {
  MouseEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { TooltipPropsType } from "./tooltip.types";
import { v4 } from "uuid";

// position의 종류가 아래의 4가지에 일치하는지 검증
const filterPosition = ["top", "bottom", "left", "right"];

export default function _RenderTooltip(props: TooltipPropsType) {
  const uuid = v4();

  return (
    <_Error propsList={{ ...props }} requiredList={["children", "tooltipText"]}>
      <_Tooltip {...props} uuid={uuid} />
    </_Error>
  );
}

function _Tooltip(props: TooltipPropsType & { uuid: string }) {
  // 중복 실행 방지 변수
  let loading = false;

  // wrapper ref
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  // 말풍선 ref
  const textRef = useRef() as MutableRefObject<HTMLDivElement>;

  const {
    children,
    useShowAnimation,
    isDisable,
    position,
    open,
    isFix,
    onCloseAfterEvent,
    onOpenAfterEvent,
    hideMobile,
    offHoverEvent,
    uuid,
  } = props;

  // position이 4가지의 종류에 일치하지 않는다면 기본값 top 부여
  let _position = filterPosition.some((el) => el === position)
    ? position
    : "top";

  // 말풍선 실행 여부
  const [tooltipOpen, setTooltipOpen] = useState(open || false);
  // 말풍선 최종 렌더
  const [render, setRender] = useState(false);

  // 수동으로 툴팁을 오픈하거나 종료할 경우
  useEffect(() => {
    openTooltip();
    // if (!isDisable) toggleTail(open || false)();
  }, [open]);

  // isDisable 설정시, 말풍선 off
  useEffect(() => {
    if (isDisable) setTooltipOpen(false);
  }, [isDisable]);

  // 모바일 환경 터치 이벤트 감지
  useEffect(() => {
    if (!hideMobile && !offHoverEvent)
      document.addEventListener("touchend", checkMobileTouchCloseEvent);

    return () => {
      document.removeEventListener("touchend", checkMobileTouchCloseEvent);
    };
  });

  // 실행 및 종료시 최종 말풍선 위치값 구하기
  // useEffect(() => {
  //   if (textRef && textRef.current) {
  //     // 말풍선 오픈시
  //     if (tooltipOpen) {
  //       const targetList = ["top", "bottom", "left", "right"];
  //       const currentIdx = targetList.indexOf(_position || "top");
  //       // 현재 위치에서 대응되는 위치값 가져오기 (top <-> bottom, left <-> right)
  //       const target = targetList[currentIdx + (currentIdx % 2 === 0 ? 1 : -1)];

  //       let finalPosition = "108%";
  //       // 말풍선의 최종 위치
  //       if (textRef.current.style) {
  //         if (!position || position === "top" || position === "bottom") {
  //           finalPosition = "120%";
  //         }
  //         textRef.current.style[target] = finalPosition;
  //       }

  //       if (useShowAnimation) {
  //         // 애니메이션 사용중일 경우

  //         // 시작 기준점
  //         textRef.current.style.setProperty(`--move-start-${target}`, `80%`);
  //         // 종료 기준점
  //         textRef.current.style.setProperty(
  //           `--move-end-${target}`,
  //           finalPosition
  //         );
  //       }

  //       setRender(true);
  //     }
  //   }
  // }, [tooltipOpen, children, position]);

  // 마우스 hover시 말풍선 오픈
  const openTooltip = async () => {
    if (isDisable) return;
    // if (!bool && isFix) return; // 고정된 툴팁은 종료되지 않음

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
      _tooltipWrapper.style.minWidth = `${width}px`;

      _tooltipWrapper.style.top = `${Math.floor(top)}px`;
      _tooltipWrapper.style.left = `${Math.floor(left)}px`;
      _tooltipWrapper.style.opacity = "0";

      // 툴팁 메세지 window 직접 추가
      document.body.append(_tooltipWrapper);

      // 툴팁 메세지 태그 적용
      createRoot(_tooltipWrapper).render(
        <TooltipTailContents ref={textRef}>
          <div style={{ height: "200px" }}>2222</div>
        </TooltipTailContents>
      );

      window.setTimeout(() => {
        doc = document.getElementById(`tooltip-${uuid}`);
        if (textRef && textRef.current && doc) {
          const textRefRects = textRef.current.getClientRects()[0];
          top -= Math.floor(textRefRects.height);

          const allHeight = height + textRefRects.height;
          doc.style.height = `${allHeight}px`;

          // 애니메이션 사용시
          if (useShowAnimation) {
            window.setTimeout(() => {
              doc.style.top = `${top + 10}px`;

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

          // 종료 이벤트 설정
          if (!isFix) doc.addEventListener("mouseleave", closeTooltip);
          // 실행 후 이벤트가 있다면 이벤트 실행
          if (onOpenAfterEvent) onOpenAfterEvent();
        }
      }, 0);
    }
  };

  // 툴팁 종료하기
  const closeTooltip = () => {
    // 고정된 툴팁이거나 호버 이벤트가 꺼져있다면 종료 방지
    if (isFix || isDisable) return;

    const doc = document.getElementById(`tooltip-${uuid}`);
    if (doc) {
      let timer = 0;

      if (useShowAnimation) {
        timer = 300;
        // 애니메이션 사용시
        const docRects = doc.getClientRects()[0];

        doc.style.top = `${docRects.top + 10}px`;
        doc.style.opacity = "0";
      }

      window.setTimeout(() => {
        loading = false;
        doc.remove();

        // 종료 후 이벤트가 있다면 종료 직후 이벤트 실행
        if (onCloseAfterEvent) onCloseAfterEvent();
      }, timer);
    }
  };

  // 모바일 환경에서 터치 이벤트 감지하여 툴팁 종료하기
  const checkMobileTouchCloseEvent = (e) => {
    if (tooltipOpen) {
      // 말풍선 위치에서 벗어난 경로를 클릭할 경우
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        // toggleTail(false)();
      }
    }
  };

  return (
    <_TooltipUIPage
      {...props}
      tooltipOpen={tooltipOpen}
      openTooltip={openTooltip}
      closeTooltip={closeTooltip}
      textRef={textRef}
      render={render}
      position={_position}
      wrapperRef={wrapperRef}
    />
  );
}
