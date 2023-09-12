import { Wrapper, Items, AlertConcept, CloseMode } from "./alert.styles";
import { alertClassList } from "./alert.class";

import { _Error, _SpanText } from "mcm-js-commons";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";
import { AlertPropsType, AlertAddIProps, AlertUIProps } from "./alert.types";

export default function AlertUIPage(
  props: AlertAddIProps & AlertPropsType & AlertUIProps
) {
  const {
    children,
    alertConcept,
    className,
    id,
    alertStyles,
    alertResponsiveStyles,
    useCloseMode,
    closeAlertEvent,
    wrapperRef,
    startDrag,
    moveDrag,
    endDrag,
    hasSwipeMode,
  } = props;

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
        ref={wrapperRef}
        alertStyles={alertStyles}
        alertResponsiveStyles={alertResponsiveStyles}
        conceptColor={currentConcept.color}
        useTextChildren={useTextChildren}
        useCloseMode={useCloseMode !== undefined}
        onMouseDown={(e) => hasSwipeMode && startDrag(e.pageX || 0)}
        onMouseMove={(e) => hasSwipeMode && moveDrag(e.pageX || 0)}
        onClick={hasSwipeMode && endDrag}
        onMouseOut={hasSwipeMode && endDrag}
        onTouchStart={(e) =>
          hasSwipeMode && startDrag(e.targetTouches[0].pageX || 0)
        }
        onTouchMove={(e) =>
          hasSwipeMode && moveDrag(e.targetTouches[0].pageX || 0)
        }
        onTouchEnd={hasSwipeMode && endDrag}
      >
        <Items className={alertClassList.items} alertConcept={alertConcept}>
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
            onClickEvent={closeAlertEvent}
          >
            Close
          </CloseMode>
        )}
      </Wrapper>
    </_Error>
  );
}
