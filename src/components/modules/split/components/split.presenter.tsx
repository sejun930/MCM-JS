import { Wrapper, Items } from "./split.styles";

import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";
import { v4 } from "uuid";
import { splitClassList } from "./split.class";

import SplitBarPage from "./bar";
import SplitContentsPage from "./contents";
import { SplitUIPageTypes } from "./split.types";

export default function SplitUIPage({
  list,
  toggleActive,
  uid,
  active,
}: SplitUIPageTypes) {
  return (
    <Wrapper
      className={getAllComponentsClassName(
        splitClassList.wrapper || "mcm-split-wrapper"
      )}
      onClick={() => toggleActive(false)}
    >
      <Items className={splitClassList.items || "mcm-split-items"}>
        {/* 컴포넌트 리스트 페이지 */}
        <SplitContentsPage list={list} uid={uid} />
        {/* {Array.from(new Array(list.length - 1), () => 1).map((_, idx) => (
          <SplitBarPage
            orderNum={idx * 2 + 1}
            key={v4()}
            uid={uid}
            active={active}
            toggleActive={toggleActive}
          />
        ))} */}
      </Items>
    </Wrapper>
  );
}
