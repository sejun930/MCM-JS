export interface TooltipPropsType {
  // 말풍선 사이에 렌더될 내용
  children: React.ReactNode;
  // 말풍선 내용
  tooltipText: string | React.ReactNode;
  // 말풍선 실행 애니메이션 사용 여부, true 전달하면 적용됨 (default : false)
  useShowAnimation?: boolean;
}
