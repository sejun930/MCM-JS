import { popularClassList } from "../popular.class";
import { MainWrapper, Opener } from "../popular.styles";
import { PopularMainUIPropsTypes } from "./popular.main.types";

import PopularMainListPage from "./list";

export default function PopuplarMainUIPage(props: PopularMainUIPropsTypes) {
  const {
    children,
    minHeight,
    uuid,
    mainRef,
    toggleAllShow,
    showAll,
    useSwipeMode,
    hasChildren,
    stop,
    running,
  } = props;
  const hide = props?.setList?.hide || false;

  // 상위에 노출될 리스트
  const mainList = useSwipeMode
    ? [...children, ...children, ...children] // 스와이프 모드 사용시 앞 뒤로 추가 데이터 삽입
    : [...children, ...children.slice(0, 1)]; // 사용하지 않을 경우 끝에 첫번째 리스트만 추가

  return (
    <MainWrapper className={popularClassList.mainWrapper} minHeight={minHeight}>
      {/* Main 롤링 페이지*/}
      <PopularMainListPage
        mainRef={mainRef}
        mainList={mainList}
        uuid={uuid}
        useSwipeMode={useSwipeMode}
        hasChildren={hasChildren}
        stop={stop}
        running={running}
      />
      {!hide && hasChildren && (
        <Opener
          className={popularClassList.opener}
          onClickEvent={(!hide && toggleAllShow) || undefined}
          isShowAll={showAll}
        />
      )}
    </MainWrapper>
  );
}
