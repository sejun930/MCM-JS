import { Wrapper, Items, Contents } from "./split.styles";

import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";
import { splitClassList } from "./split.class";

import SplitBarPage from "./bar";
import { SplitUIPageTypes } from "./split.types";
import { CSSProperties } from "react";

export default function SplitUIPage({
  list,
  uid,
  widthList,
}: SplitUIPageTypes) {
  return (
    <Wrapper
      className={getAllComponentsClassName(
        splitClassList.wrapper || "mcm-split-wrapper"
      )}
    >
      <Items className={splitClassList.items || "mcm-split-items"}>
        {list.map((el, idx) => {
          // 순서 지정
          const orderNum = idx * 2;
          const styles: CSSProperties = { order: idx * 2 };
          // 마지막 컴포넌트 체크
          const isLast = idx + 1 === list.length;
          // 최소 넓이값 지정
          if (widthList[idx]) styles.minWidth = `${widthList[idx]}%`;

          let className = splitClassList.contents || "mcm-split-contents";
          //   if (active) className += " offDrag";

          return (
            <Contents
              key={`split-contents-${uid}-${orderNum}`}
              id={`split-contents-${uid}-${orderNum}`}
              className={className}
              style={styles}
              isLast={isLast}
            >
              {el.children}
            </Contents>
          );
        })}
        {list.length > 1 &&
          Array.from(new Array(list.length - 1), (_, idx) => 1 + idx * 2).map(
            (num) => {
              return (
                <SplitBarPage
                  key={`split-bar-${uid}-${num}`}
                  orderNum={num}
                  uid={uid}
                />
              );
            }
          )}
      </Items>
    </Wrapper>
  );
}
