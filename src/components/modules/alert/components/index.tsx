import {
  Wrapper,
  Items,
  AlertConcept,
  AlertContents,
  CloseMode,
} from "./alert.styles";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { AlertIProps, AlertPropsType } from "./alert.types";
import { _Error, _SpanText } from "mcm-js-commons";
import { alertClassList } from "./alert.class";
import { MouseEvent, useState } from "react";

export default function _Alert(props: AlertPropsType & AlertIProps) {
  const {
    className,
    id,
    alertStyles,
    alertResponsiveStyles,
    children,
    alertConcept,
    useCloseMode,
    searchSequence,
    closeAlert,
  } = props;
  // 닫기 이벤트 처리를 위한 호버 여부
  const [target, setTarget] = useState(0);

  // 마우스 호버 이벤트 실행
  const hoverEvent = (bool: boolean) => (e: MouseEvent) => {
    if (useCloseMode) {
      if (bool) {
        const parents = e.currentTarget.parentElement;
        setTarget(searchSequence(parents));
      } else setTarget(0);
    }
  };

  // 알럿 닫기 이벤트
  const closeAlertEvent = () => {
    if (useCloseMode && target) closeAlert(target);
  };

  // Alert 콘셉의 이모지 및 색상 지정
  const conceptInfo: { [key: string]: { text: string; color: string } } = {
    info: { text: "ℹ", color: "#279EFF" },
    warning: { text: "❗", color: "#FD8D14" },
    error: { text: "❌", color: "#BB2525" },
    success: { text: "✔", color: "#35A29F" },
  };

  // 콘셉트가 사용중일 경우 현재 선택된 콘셉트 정보 저장
  const currentConcept: { text: string; color: string } = conceptInfo[
    alertConcept
  ] || { text: "", color: "" };

  // 전달된 children props가 태그가 아닌 문자열을 사용하고 있는지 체크
  const useTextChildren = typeof children === "string";

  return (
    <_Error propsList={{ ...props }} requiredList={["children"]}>
      <Wrapper
        className={getAllComponentsClassName(alertClassList.wrapper, className)}
        id={id}
        alertStyles={alertStyles}
        alertResponsiveStyles={alertResponsiveStyles}
        conceptColor={currentConcept.color}
        useTextChildren={useTextChildren}
        onMouseEnter={hoverEvent(true)}
        onMouseLeave={hoverEvent(false)}
      >
        <Items
          className={alertClassList.items}
          alertConcept={alertConcept}
          hover={target !== 0}
        >
          {alertConcept && (
            <AlertConcept
              alertConcept={alertConcept}
              conceptColor={currentConcept.color}
              className={alertClassList.concept}
            >
              {currentConcept.text}
            </AlertConcept>
          )}
          {children && useTextChildren ? (
            // 문자열로 전달받을 경우 텍스트 형태로 렌더
            <_SpanText className={alertClassList.text}>{children}</_SpanText>
          ) : (
            // 태그 형태로 별도 렌더
            children
          )}
        </Items>

        {useCloseMode && (
          <CloseMode
            className={alertClassList.close}
            hover={target !== 0}
            onClickEvent={closeAlertEvent}
          >
            Close
          </CloseMode>
        )}
      </Wrapper>
    </_Error>
  );
}
