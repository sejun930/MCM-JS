import _TooltipUIPage from "./tooltip.presenter";

import { _Error } from "mcm-js-commons";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { TooltipPropsType } from "./tooltip.types";

// position의 종류가 아래의 4가지에 일치하는지 검증
const filterPosition = ["top", "bottom", "left", "right"];

export default function _RenderTooltip(props: TooltipPropsType) {
  return (
    <_Error propsList={{ ...props }} requiredList={["children", "tooltipText"]}>
      <_Tooltip {...props} />
    </_Error>
  );
}

function _Tooltip(props: TooltipPropsType) {
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
    if (!isDisable) toggleTail(open || false)();
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
  useEffect(() => {
    if (textRef && textRef.current) {
      // 말풍선 오픈시
      if (tooltipOpen) {
        const targetList = ["top", "bottom", "left", "right"];
        const currentIdx = targetList.indexOf(_position || "top");
        // 현재 위치에서 대응되는 위치값 가져오기 (top <-> bottom, left <-> right)
        const target = targetList[currentIdx + (currentIdx % 2 === 0 ? 1 : -1)];

        let finalPosition = "108%";
        // 말풍선의 최종 위치
        if (textRef.current.style) {
          if (!position || position === "top" || position === "bottom") {
            finalPosition = "120%";
          }
          textRef.current.style[target] = finalPosition;
        }

        if (useShowAnimation) {
          // 애니메이션 사용중일 경우

          // 시작 기준점
          textRef.current.style.setProperty(`--move-start-${target}`, `80%`);
          // 종료 기준점
          textRef.current.style.setProperty(
            `--move-end-${target}`,
            finalPosition
          );
        }

        setRender(true);
      }
    }
  }, [tooltipOpen, children, position]);

  // 마우스 hover시 말풍선 오픈
  const toggleTail = (bool: boolean) => async () => {
    if (bool === tooltipOpen || loading || isDisable) return;
    if (!bool && isFix) return; // 고정된 툴팁은 종료되지 않음

    // 스테이트 변환 시간
    let timer = 0;

    // 말풍선 애니메이션을 사용한다면
    if (useShowAnimation) {
      // 말풍선을 닫는다면
      if (!bool) {
        loading = true; // 중복 실행 방지
        timer = 250; // 변환 시간 지연

        if (textRef && textRef.current) {
          if (!_position || _position === "top" || _position === "bottom")
            // 위 또는 아래 방향일 때
            textRef.current.style.animation = "CLOSE_TOOLTIP_TOP 0.3s";
          // 왼쪽 또는 오른쪽 방향일 때
          else textRef.current.style.animation = "CLOSE_TOOLTIP_LEFT 0.3s";
        }
      }
    }

    window.setTimeout(() => {
      setTooltipOpen(bool);
      loading = false;

      if (!bool && onCloseAfterEvent) onCloseAfterEvent();
      // 툴팁이 종료될 때 실행될 이벤트가 있을 경우
      else if (bool && onOpenAfterEvent) onOpenAfterEvent();
      // 툴팁이 오픈될 때 실행될 이벤트가 있을 경우
    }, timer);
  };

  // 모바일 환경에서 터치 이벤트 감지하여 툴팁 종료하기
  const checkMobileTouchCloseEvent = (e) => {
    if (tooltipOpen) {
      // 말풍선 위치에서 벗어난 경로를 클릭할 경우
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        toggleTail(false)();
      }
    }
  };

  return (
    <_TooltipUIPage
      {...props}
      tooltipOpen={tooltipOpen}
      toggleTail={toggleTail}
      textRef={textRef}
      render={render}
      position={_position}
      wrapperRef={wrapperRef}
    />
  );
}
