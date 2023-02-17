import styled from "@emotion/styled";
import { CSSProperties } from "react";

import CommonsHooksComponents from "../../hooks";

interface IProps {
  src: string; // 출력될 이미지 경로
  styles?: CSSProperties; // 설정할 스타일
  className?: string;
}

export default function Image({ src, styles, className }: IProps) {
  const { getAllComponentsClassName } = CommonsHooksComponents();

  return (
    <Img
      className={getAllComponentsClassName("cmm-unit-image", className)}
      src={src}
      style={styles}
    />
  );
}

const Img = styled.img`
  width: 100%;
  pointer-events: none; // PC 이미지 다운로드 금지
  -webkit-touch-callout: none; // 아이폰 다운로드 금지
  -webkit-user-select: none; // 드래그 방지
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
