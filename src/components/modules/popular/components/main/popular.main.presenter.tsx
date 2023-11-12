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

  // 버튼 색상 지정 (default : 검정)
  let btnColor = { web: "black", mobile: "black" };
  // 폰트 색상에 따라 버튼 색상 변경
  if (popularStyles && popularStyles?.color)
    btnColor = {
      web: popularStyles.color,
      mobile: popularStyles.color,
    };
  // 웹 환경의 스타일이 지정되어 있는 경우 + 폰트 색상 지정
  if (popularResponsiveStyles) {
    if (popularResponsiveStyles?.web && popularResponsiveStyles.web?.color)
      btnColor.web = popularResponsiveStyles.web?.color;
    if (
      popularResponsiveStyles?.mobile &&
      popularResponsiveStyles?.mobile?.color
    )
      btnColor.mobile = popularResponsiveStyles.mobile?.color;
  }

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
          onClickEvent={() => !hide && toggleAllShow(!showAll)}
          isShowAll={showAll}
          btnColor={btnColor}
        />
      )}
    </MainWrapper>
  );
}
