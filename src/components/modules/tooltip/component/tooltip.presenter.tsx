import {
  TooltipItems,
  TooltipLayout,
  TooltipTailContents,
  TooltipTailWrapper,
  TooltipWrapper,
} from "./tooltip.styles";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { TooltipPropsType, TooltipUIPropsType } from "./tooltip.types";

export default function _TooltipUIPage(
  props: TooltipPropsType & TooltipUIPropsType
) {
  const {
    children,
    className,
    id,
    tooltipText,
    useShowAnimation,
    show,
    toggleTail,
    tailRef,
  } = props;

  return (
    <TooltipWrapper
      className={getAllComponentsClassName("mcm-tooltip-wrapper", className)}
      id={id}
      onMouseLeave={toggleTail(false)}
    >
      <TooltipItems className="mcm-tooltip-items">
        <TooltipLayout
          className="mcm-tooltip-layout"
          onMouseOver={toggleTail(true)}
        >
          {children}
        </TooltipLayout>
        {(show && (
          <TooltipTailWrapper
            className="mcm-tooltip-tail-wrapper"
            ref={tailRef}
            useShowAnimation={useShowAnimation}
            show={show}
          >
            <TooltipTailContents className="mcm-tooltip-tail-contents">
              {tooltipText}
            </TooltipTailContents>
          </TooltipTailWrapper>
        )) || <></>}
      </TooltipItems>
    </TooltipWrapper>
  );
}
