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
    // tooltipOpen,
    textRef,
    wrapperRef,
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
      </TooltipItems>
    </TooltipWrapper>
  );
}
