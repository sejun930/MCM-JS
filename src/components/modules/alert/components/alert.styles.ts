import { CSSProperties } from "react";
import styled from "@emotion/styled";

import { breakPoints } from "mcm-js-commons/dist/responsive";
import { getOffDrag } from "mcm-js-commons/dist/styled";
import { _Button, _SpanText } from "mcm-js-commons";

interface StyleTypes {
  sequence?: number;
  alertStyles?: CSSProperties;
  alertResponsiveStyles?: {
    web: CSSProperties;
    mobile?: CSSProperties;
  };
  alertConcept?: string | "success" | "error" | "warning" | "info";
  conceptColor?: string;
  useTextChildren?: boolean;
  useCloseMode?: boolean;
  currentConcept?: {
    color: string;
    icon: string;
    size: number;
  };
  iconColor?: string;
}

export const Wrapper = styled.div`
  border: double 3px black;
  border-radius: 999px;
  width: 100%;
  min-height: 40px;
  min-width: 100px;
  background-color: white;
  position: relative;
  overflow: hidden;

  ${(props) => {
    let styles: CSSProperties & { [key: string]: any } = {};

    if (props.conceptColor) styles.borderColor = props.conceptColor;

    // 웹과 모바일에 동일 적용되는 스타일 지정
    if (props.alertStyles) styles = { ...styles, ...props.alertStyles };

    return styles;
  }};

  @media ${breakPoints.web} {
    ${(props: StyleTypes) => {
      const { alertResponsiveStyles } = props;
      let styles = {};

      // 웹 사이즈에만 적용되는 스타일 지정
      if (alertResponsiveStyles && alertResponsiveStyles?.web)
        styles = alertResponsiveStyles.web;

      return styles;
    }}
  }

  @media ${breakPoints.mobileLarge} {
    width: 100%;

    ${(props: StyleTypes) => {
      const { alertResponsiveStyles } = props;
      let styles = {};

      // 모바일 사이즈에만 적용되는 스타일 지정
      if (alertResponsiveStyles && alertResponsiveStyles?.mobile)
        styles = alertResponsiveStyles.mobile;

      return styles;
    }}
  }

  :hover {
    .mcm-alert-items {
      ${(props) =>
        props.useCloseMode && {
          filter: "blur(4px)",
        }};
    }

    .mcm-alert-close-wrapper {
      ${(props) =>
        props.useCloseMode && {
          opacity: 1,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }};
    }
  }
`;

export const Items = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 0px 8px;
  padding: 8px 10px;
  padding-right: 16px;
  width: 100%;
  transition: all 0.25s ease;
  z-index: 10;

  ${(props: StyleTypes) => {
    let styles: CSSProperties & { [key: string]: any } = {};

    // 컨셉 모드가 적용되지 않는 일반 모드 적용
    if (!props.alertConcept)
      styles = {
        padding: "8px 16px",
        justifyContent: "center",
        textAlign: "center",
      };

    return styles;
  }}
`;

export const AlertConcept = styled(_SpanText)`
  width: 24px;
  max-width: 24px;
  height: 24px;
  max-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: pre;
  border: double 3px black;
  border-radius: 100%;
  padding: 4px;

  ${(props: StyleTypes) => {
    // @ts-ignore
    const styles: CSSProperties & { [key: string]: string } = getOffDrag();

    const { currentConcept, iconColor } = props;
    if (currentConcept) {
      // 콘셉트에 따른 폰트 사이즈 조절
      styles.fontSize = `${currentConcept.size}px`;
    }

    if (currentConcept) {
      if (iconColor !== "origin") styles.color = "transparent";
      styles.borderColor = currentConcept.color;
      styles.textShadow = `0 0 0 ${iconColor || currentConcept.color}`;
    }

    return styles;
  }};
`;

export const AlertContents = styled.div``;

export const CloseMode = styled(_Button)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.35s;
  opacity: 0;
  color: white;
  font-weight: 700;
  word-spacing: -0.03rem;
  z-index: 11;
`;
