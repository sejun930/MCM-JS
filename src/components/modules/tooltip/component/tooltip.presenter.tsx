import {
  TooltipItems,
  TooltipChildren,
  TooltipTailContents,
  TooltipTextWrapper,
  TooltipWrapper,
} from "./tooltip.styles";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { TooltipPropsType, TooltipUIPropsType } from "./tooltip.types";
import { _SpanText } from "mcm-js-commons";
import { tooltipClassList } from "./tooltip.class";

export default function _TooltipUIPage(
  props: TooltipPropsType & TooltipUIPropsType
) {
  const {
    children,
    className,
    id,
    tooltipText,
    useShowAnimation,
    tooltipOpen,
    textRef,
    wrapperRef,
    render,
    tooltipStyles,
    tooltipMobileStyles,
    position,
    hideMobile,
    offHoverEvent,
    openTooltip,
    closeTooltip,
  } = props;

  return (
    <TooltipWrapper
      className={getAllComponentsClassName(tooltipClassList.wrapper, className)}
      id={id}
      // onMouseOut={(!offHoverEvent && closeTooltip) || undefined}
      hideMobile={hideMobile}
      ref={wrapperRef}
    >
      <TooltipItems className={tooltipClassList.items} position={position}>
        <TooltipChildren
          className={tooltipClassList.children}
          onMouseOver={(!offHoverEvent && openTooltip) || undefined}
        >
          {children}
        </TooltipChildren>
        {/* {(tooltipOpen && (
          <TooltipTextWrapper
            className={tooltipClassList.textWrapper}
            ref={textRef}
            useShowAnimation={useShowAnimation}
            show={render}
            tooltipStyles={tooltipStyles}
            tooltipMobileStyles={tooltipMobileStyles}
            hideMobile={hideMobile}
            position={position || "top"}
          >
            <TooltipTailContents
              className={tooltipClassList.textContents}
              tooltipStyles={tooltipStyles}
              tooltipMobileStyles={tooltipMobileStyles}
              position={position || "top"}
            >
              {(typeof tooltipText === "string" && (
                // 문자열일 경우 span 태그에 감싸서 렌더
                <_SpanText className={tooltipClassList.text}>
                  {tooltipText}
                </_SpanText>
              )) ||
                tooltipText}
            </TooltipTailContents>
          </TooltipTextWrapper>
        )) || <></>} */}
      </TooltipItems>
    </TooltipWrapper>
  );
}
