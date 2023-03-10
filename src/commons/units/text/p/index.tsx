import { CSSProperties } from "react";
import CommonsHooksComponents from "../../../hooks";
import styled from "@emotion/styled";

interface IProps {
  text: string;
  styles?: CSSProperties;
  className?: string;
}

// p 태그를 출력하는 컴포넌트
export default function _PText({ text, styles, className }: IProps) {
  const { getAllComponentsClassName } = CommonsHooksComponents();

  return (
    <P style={styles} className={getAllComponentsClassName("_p_", className)}>
      {text}
    </P>
  );
}

const P = styled.p`
  margin: 0px;
`;
