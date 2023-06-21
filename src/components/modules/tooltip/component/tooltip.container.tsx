import _TooltipUIPage from "./tooltip.presenter";

import { _Error } from "mcm-js-commons";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import { TooltipPropsType } from "./tooltip.types";

// 추가 설명을 위한 말풍선 모듈
export default function _Tooltip(props: TooltipPropsType) {
  // 중복 실행 방지 변수
  let loading = false;

  // 말풍선 ref
  const tailRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { children, tooltipText, useShowAnimation, isDisable, position } =
    props;

  // 말풍선 보이기
  const [show, setShow] = useState(false);

  // isDisable 설정시, 말풍선 off
  useEffect(() => {
    if (isDisable) setShow(false);
  }, [isDisable]);

  // 실행 및 종료시 최종 말풍선 위치값 구하기
  useEffect(() => {
    let positionTop = -40; // 기본 위치값
    if (position && position.top) {
      // 위치를 조정할 경우 해당 위치값으로 설정
      positionTop = Number(position.top.split("px")[0]);
    }

    if (tailRef && tailRef.current) {
      if (show) {
        // 말풍선 오픈시
        if (useShowAnimation) {
          // 애니메이션 사용중일 경우
          tailRef.current.style.setProperty(
            "--move-start-positionTop",
            `${positionTop}px`
          );
          tailRef.current.style.setProperty(
            "--move-end-positionTop",
            `${positionTop + 10}px`
          );
        }
        tailRef.current.style.marginTop = `${positionTop + 10}px`;
      }
    }
  }, [show]);

  // 마우스 hover시 말풍선 오픈
  const toggleTail = (bool: boolean) => async () => {
    if (bool === show || loading || isDisable) return;

    // 스테이트 변환 시간
    let timer = 0;

    // 말풍선 애니메이션을 사용한다면
    if (useShowAnimation) {
      // 말풍선을 닫는다면
      if (!bool) {
        loading = true; // 중복 실행 방지
        timer = 250; // 변환 시간 지연

        if (tailRef && tailRef.current) {
          tailRef.current.style.animation = "CLOSE_TOOLTIP 0.3s";
        }
      }
    }

    // 말풍선을 닫을 경우
    window.setTimeout(() => {
      setShow(bool);
      loading = false;
    }, timer);
  };

  return (
    <_Error
      propsList={{ children, tooltipText }}
      requiredList={["children", "tooltipText"]}
    >
      <_TooltipUIPage
        {...props}
        show={show}
        toggleTail={toggleTail}
        tailRef={tailRef}
      />
    </_Error>
  );
}
