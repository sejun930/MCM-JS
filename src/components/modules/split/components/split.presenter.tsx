import { Wrapper, Items } from "./split.styles";

import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";
import { v4 } from "uuid";
import { splitClassList } from "./split.class";

import SplitBarPage from "./bar";
import SplitContentsPage from "./contents";
import { SplitUIPageTypes } from "./split.types";

export default function SplitUIPage({
  list,
  toggleDisAction,
  uid,
  disActive,
}: SplitUIPageTypes) {
  return (
    <Wrapper
      className={getAllComponentsClassName(
        splitClassList.wrapper || "mcm-split-wrapper"
      )}
      onClick={() => toggleDisAction(true)}
    >
      <Items className={splitClassList.items || "mcm-split-items"}>
        <SplitContentsPage uid={uid} list={list} />
        {Array.from(new Array(list.length - 1), () => 1).map((_, idx) => (
          <SplitBarPage
            orderNum={idx * 2 + 1}
            key={v4()}
            uid={uid}
            disActive={disActive}
            toggleDisAction={toggleDisAction}
          />
        ))}
      </Items>
    </Wrapper>
  );
}
