// 공용으로 사용되는 함수들이 저장되는 컴포넌트입니다.

export default function CommonsHooksComponents() {
  // 컴포넌트 렌더하기
  const componentRender = (Component: () => JSX.Element) => {
    return <Component />;
  };

  return {
    componentRender,
  };
}
