// 말풍선의 애니메이션 시작점-끝점과 최종 위치값 구하기
export const positionList: {
  [key: string]: {
    target: string; // 애니메이션 작동시, 작동될 스타일 타겟
    startPoint: number; // 애니메이션 작동시 시작 지점
  };
} = {
  top: {
    target: "bottom",
    startPoint: 60,
  },
  bottom: {
    target: "top",
    startPoint: 60,
  },
  left: {
    target: "right",
    startPoint: 80,
  },
  right: {
    target: "left",
    startPoint: 80,
  },
};
