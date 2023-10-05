import { popularClassList } from "../popular.class";
import { List, MainItems, MainWrapper, Opener, Empty } from "../popular.styles";
import { PopularMainUIPropsTypes } from "./popular.main.types";

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
  } = props;
  const hide = props?.setList?.hide || false;

  // 상위에 노출될 리스트
  const mainList = useSwipeMode
    ? [...children, ...children, ...children] // 스와이프 모드 사용시 앞 뒤로 추가 데이터 삽입
    : [...children, ...children.slice(0, 1)]; // 사용하지 않을 경우 끝에 첫번째 리스트만 추가

  const isEmpty = mainList.length === 0;

  return (
    <MainWrapper
      className={popularClassList.mainWrapper}
      minHeight={minHeight}
      useSwipeMode={useSwipeMode}
      hasChildren={hasChildren}
      isEmpty={isEmpty}
    >
      <MainItems className={popularClassList.mainItems} ref={mainRef}>
        {(mainList.length &&
          mainList.map((el, idx) => (
            <List
              key={`mcm-popular-${uuid}-main-list-${idx}`}
              className={popularClassList.mainList}
            >
              {el}
            </List>
          ))) || <Empty>"children" props가 비어있습니다.</Empty>}
      </MainItems>
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
