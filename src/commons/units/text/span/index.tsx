import { CSSProperties } from "react";
import CommonsHooksComponents from "../../../hooks";

interface IProps {
  text: string;
  styles?: CSSProperties;
  className?: string;
}

// span 태그를 출력하는 컴포넌트
export default function _SpanText({ text, styles, className }: IProps) {
  const { getAllComponentsClassName } = CommonsHooksComponents();

  return (
    <span
      style={styles}
      className={getAllComponentsClassName("_spanText_", className)}
    >
      {text}
    </span>
  );
}
