import { CSSProperties } from "react";

// 전달된 props로 적용된 스타일 가져오기 (wrapper)
export const getPropsWrapperStyles = (_styles, props) => {
  const styles: CSSProperties & { [key: string]: string } = {};

  // 말풍선 실행했을 경우
  if (props.show) styles.opacity = 1;

  // 실행 애니메이션을 사용하는 경우
  if (props.useShowAnimation) {
    if (props.show) {
      // 실행 애니메이션 스타일 적용
      if (props.position === "top" || props.position === "bottom") {
        // 상, 하 애니메이션 적용
        styles.animation = "SHOW_TOOLTIP_TOP 0.3s";
      } else {
        // 좌, 우 애니메이션 적용
        styles.animation = "SHOW_TOOLTIP_LEFT 0.3s";
      }
    }
  }

  // 스타일이 적용되었을 경우
  if (_styles) {
    const { backgroundColor, border } = _styles;

    // 배경색 변경
    if (backgroundColor) styles.backgroundColor = backgroundColor;

    // 테두리 변경
    if (border) {
      const { color, width, radius } = border;
      // 테두리 색상 변경
      if (color) styles.borderColor = color;
      // 테두리 두께 변경
      if (width) styles.borderWidth = width;
      // 테두리 라운드 변경
      if (radius) styles.borderRadius = radius;
    }
  }
  return styles;
};

// contents 섹션의 스타일 변경하기
export const getPropsContentsStyles = (tooltipStyles) => {
  const styles: CSSProperties & { [key: string]: string } = {};

  if (tooltipStyles) {
    if (tooltipStyles.padding)
      // padding 스타일 적용하기
      styles.padding = tooltipStyles.padding;
  }

  return styles;
};

// tooltip text 스타일 변경하기
export const getPropsTooltipTextStyles = (tooltipStyles) => {
  const styles: { [key: string]: string } & CSSProperties = {};

  // 폰트 정보 변경하기
  if (tooltipStyles) {
    const { font } = tooltipStyles;

    // 폰트 크기 변경
    if (font?.size) styles.fontSize = font.size;
    // 폰트 색상 변경
    if (font?.color) styles.color = font.color;
    // 폰트 굵기 변경
    if (font?.weight) styles.fontWeight = font.weight;
  }

  return styles;
};

// contents:after 스타일 변경하기
export const getPropsTooltipContentsAfterStyles = (tooltipStyles, position) => {
  const styles: { [key: string]: string } & CSSProperties = {};

  if (tooltipStyles) {
    const { backgroundColor } = tooltipStyles;

    // 말풍선 배경색 변경
    if (backgroundColor) styles.borderColor = `${backgroundColor} transparent`;
  }

  if (position === "bottom") {
    // 배치가 아래인 경우
    styles.bottom = "auto";
    styles.top = "-6.5px";
    styles.transform = "rotate(0deg)";
  } else if (position === "left" || position === "right") {
    // 배치가 좌, 우인 경우
    styles.bottom = "50%";
    styles.right = "-9px";
    styles.transform = "rotate(90deg)";

    // 오른쪽 배치 처리
    if (position === "right") {
      styles.left = "-9px";
      styles.transform = "rotate(270deg)";
    }
  }

  return styles;
};

// contents:before 스타일 변경하기
export const getPropsTooltipContentsBeforeStyles = (
  tooltipStyles,
  position
) => {
  const styles: { [key: string]: string } & CSSProperties = {};

  if (position === "bottom") {
    // 배치가 아래일 경우
    styles.bottom = "auto";
    styles.top = "-8px";
    styles.transform = "rotate(0deg)";
  } else if (position === "left" || position === "right") {
    // 배치가 왼쪽인 경우
    styles.bottom = "50%";
    styles.right = "-10px";
    styles.transform = "rotate(90deg)";

    if (position === "right") {
      styles.left = "-10px";
      styles.transform = "rotate(270deg)";
    }
  }

  if (tooltipStyles) {
    // 테두리 스타일 변경
    if (tooltipStyles.border) {
      // 테두리 색상 변경
      if (tooltipStyles.border.color)
        styles.borderColor = `${tooltipStyles.border.color} transparent`;

      // 테두리 두께 변경
      if (tooltipStyles.border.width) {
        const width = Number(tooltipStyles.border.width.split("px")[0]);
        // 0이하라면 테두리 표시 안함
        if (width <= 0) styles.display = "none";
        // 설정된 테두리만큼 위치값 변경
        styles.bottom = `${-8 + -width}px`;

        if (position === "bottom") {
          // 배치가 아래인 경우
          styles.bottom = "auto";
          styles.top = `${-8 + -width}px`;
        } else if (position === "left" || position === "right") {
          // 배치가 좌, 우인 경우
          styles.bottom = "50%";

          if (position === "left") styles.right = `${-11 + (-width + 1)}px`;
          if (position === "right") styles.left = `${-11 + (-width + 1)}px`;
        }
      }
    }
  }

  return styles;
};
