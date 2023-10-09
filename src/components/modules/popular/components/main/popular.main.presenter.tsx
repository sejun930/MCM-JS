import { popularClassList } from "../popular.class";
import { MainWrapper, Opener } from "../popular.styles";
import { PopularMainUIPropsTypes } from "./popular.main.types";

import PopularMainListPage from "./list";

export default function PopuplarMainUIPage(props: PopularMainUIPropsTypes) {
  const {
    list,
    minHeight,
    toggleAllShow,
    showAll,
    hasChildren,
    popularStyles,
    popularResponsiveStyles,
  } = props;
  const hide = props?.setList?.hide || false;

  // 상위에 노출될 리스트 (맨 뒤에 첫번째 리스트만 추가)
  const mainList = [...list, ...list.slice(0, 1)];

  return (
    <MainWrapper
      className={popularClassList.mainWrapper}
      minHeight={minHeight}
      popularStyles={popularStyles}
      popularResponsiveStyles={popularResponsiveStyles}
    >
      {/* Main 롤링 페이지*/}
      <PopularMainListPage {...props} mainList={mainList} />
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
