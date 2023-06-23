// className과 id 타입
export interface CommonsSelectorTypes {
  className?: string;
  // wrapper에 삽입될 className
  id?: string;
  // wrapper에 삽입될 id
}

// children 타입, optional로 할 경우에는 Partial을 추가한다.
export interface CommonsChildrenTypes {
  children: React.ReactNode;
  // 렌더될 하위 컴포넌트, 디폴트 값으로 설정되며 Component가 있으면 Component를 렌더한다.
}

// name 타입
export interface CommonsNameTypes {
  name?: string;
  // wrapper에 삽입될 data-name
}
