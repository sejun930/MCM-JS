import React from "react";
import {
  TooltipItems,
  TooltipLayout,
  TooltipTailContents,
  TooltipTailWrapper,
  TooltipWrapper,
} from "./tooltip.styles";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { TooltipPropsType, TooltipUIPropsType } from "./tooltip.types";
import { _SpanText } from "mcm-js-commons";

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
    toggleTail,
    tailRef,
    wrapperRef,
    render,
    tooltipStyles,
    tooltipMobileStyles,
    position,
    hideMobile,
    offHoverEvent,
  } = props;

  return (
    <TooltipWrapper
      className={getAllComponentsClassName("mcm-tooltip-wrapper", className)}
      id={id}
      onMouseLeave={(!offHoverEvent && toggleTail(false)) || undefined}
      hideMobile={hideMobile}
      ref={wrapperRef}
    >
      <TooltipItems className="mcm-tooltip-items" position={position}>
        <TooltipLayout
          className="mcm-tooltip-layout"
          onMouseOver={(!offHoverEvent && toggleTail(true)) || undefined}
        >
          {children}
        </TooltipLayout>
        {(tooltipOpen && (
          <TooltipTailWrapper
            className="mcm-tooltip-tail-wrapper"
            ref={tailRef}
            useShowAnimation={useShowAnimation}
            show={render}
            tooltipStyles={tooltipStyles}
            tooltipMobileStyles={tooltipMobileStyles}
            hideMobile={hideMobile}
            position={position || "top"}
          >
            <TooltipTailContents
              className="mcm-tooltip-tail-contents"
              tooltipStyles={tooltipStyles}
              tooltipMobileStyles={tooltipMobileStyles}
              position={position || "top"}
            >
              {(typeof tooltipText === "string" && (
                // 문자열일 경우 span 태그에 감싸서 렌더
                <_SpanText className="mcm-tooltip-text">
                  {tooltipText}
                </_SpanText>
              )) ||
                tooltipText}
            </TooltipTailContents>
          </TooltipTailWrapper>
        )) || <></>}
      </TooltipItems>
    </TooltipWrapper>
  );
}
