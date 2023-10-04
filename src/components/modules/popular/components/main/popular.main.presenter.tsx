import { popularClassList } from "../popular.class";
import { List, ListWrapper, MainWrapper, Opener } from "../popular.styles";
import { PopularMainUIPropsTypes } from "./popular.main.types";

export default function PopuplarMainUIPage(props: PopularMainUIPropsTypes) {
  const {
    children,
    minHeight,
    uuid,
    mainRef,
    toggleAllShow,
    info,
    useSwipeMode,
  } = props;

  // 상위에 노출될 리스트
  const mainList = useSwipeMode
    ? [...children, ...children, ...children] // 스와이프 모드 사용시 앞 뒤로 추가 데이터 삽입
    : [...children, ...children.slice(0, 1)]; // 사용하지 않을 경우 끝에 첫번째 리스트만 추가

  return (
    <MainWrapper className={popularClassList.mainWrapper} minHeight={minHeight}>
      <ListWrapper className={popularClassList.mainListWrapper} ref={mainRef}>
        {mainList.length &&
          mainList.map((el, idx) => (
            <List
              key={`mcm-popular-${uuid}-main-list-${idx}`}
              className={popularClassList.mainList}
            >
              {el}
            </List>
          ))}
      </ListWrapper>
      <Opener
        className={popularClassList.opener}
        onClickEvent={toggleAllShow}
        isShowAll={info.showAll}
      />
    </MainWrapper>
  );
}
