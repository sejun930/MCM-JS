import {
  Wrapper,
  Items,
  AlertConcept,
  CloseMode,
  AlertMessage,
} from "./alert.styles";
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
    startSwipe,
    moveSwipe,
    endSwipe,
    hasSwipeMode,
  } = props;

  // Alert 콘셉의 이모지 및 색상 지정
  const conceptInfo: {
    [key: string]: { icon: string; color: string; size: number };
  } = {
    info: { icon: "ℹ", color: "#279EFF", size: 18 },
    warning: { icon: "❗", color: "#FD8D14", size: 14 },
    error: { icon: "❌", color: "#BB2525", size: 10 },
    success: { icon: "✔", color: "#35A29F", size: 14 },
  };

  // 콘셉트가 사용중일 경우 현재 선택된 콘셉트 정보 저장
  const currentConcept: { icon: string; color: string; size: number } =
    conceptInfo[alertConcept?.type] || { icon: "", color: "", size: 0 };

  // 알럿 컨셉에 컬러 등 커스텀 적용
  if (alertConcept && alertConcept?.custom) {
    // 색상 적용
    if (alertConcept.custom.color)
      currentConcept.color = alertConcept.custom.color;
    // 아이콘 변경
    if (alertConcept.custom.icon) {
      const iconInfo = alertConcept.custom.icon;
      if (iconInfo.src)
        // 아이콘 이모지 변경
        currentConcept.icon = iconInfo.src;
      if (iconInfo.size)
        // 아이콘 크기 변경
        currentConcept.size = iconInfo.size;
    }
  }

  return (
    <_Error propsList={{ ...props }} requiredList={["children"]}>
      <Wrapper
        className={getAllComponentsClassName(alertClassList.wrapper, className)}
        id={id}
        ref={wrapperRef}
        alertStyles={alertStyles}
        alertResponsiveStyles={alertResponsiveStyles}
        conceptColor={currentConcept.color}
        useCloseMode={useCloseMode !== undefined}
        onMouseDown={(e) => hasSwipeMode && startSwipe(e.pageX || 0)}
        onMouseMove={(e) => hasSwipeMode && moveSwipe(e.pageX || 0)}
        onClick={(hasSwipeMode && endSwipe) || undefined}
        onMouseOut={(hasSwipeMode && endSwipe) || undefined}
        onTouchStart={(e) =>
          hasSwipeMode && startSwipe(e.targetTouches[0].pageX || 0)
        }
        onTouchMove={(e) =>
          hasSwipeMode && moveSwipe(e.targetTouches[0].pageX || 0, true)
        }
        onTouchEnd={(hasSwipeMode && endSwipe) || undefined}
      >
        <Items
          className={alertClassList.items}
          alertConcept={alertConcept?.type}
        >
          {alertConcept && currentConcept.icon && (
            <AlertConcept
              className={alertClassList.concept}
              currentConcept={currentConcept}
              iconColor={alertConcept?.custom?.icon?.color || null}
            >
              {currentConcept.icon}
            </AlertConcept>
          )}
          {children && (
            <AlertMessage
              className={alertClassList.text}
              textStyles={alertConcept?.custom?.text || {}}
            >
              {children}
            </AlertMessage>
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
