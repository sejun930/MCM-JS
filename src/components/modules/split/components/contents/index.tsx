import { CSSProperties, memo } from "react";
import styled from "@emotion/styled";

import { v4 } from "uuid";
import { SplitContentsPropsTypes } from "../split.types";
import { splitClassList } from "../split.class";

const SplitContentsPage = ({ list, uid }: SplitContentsPropsTypes) => {
  console.log(list);
  return list.map((node, idx) => {
    // 순서 구하기
    const orderNum = idx * 2;

    // 마지막 위치일 경우
    const isLast = idx + 1 === list.length;

    // 시작 최소 위치값 정하기
    const minWidth = Math.floor(100 / list.length);

    // 스타일 지정 (순서도, 시작 위치 등등)
    const styles: CSSProperties = { order: orderNum };
    if (!isLast) styles.flexBasis = `calc(${minWidth}% + 0px)`;
    else styles.flex = `1 1 auto`;

    return (
      <Contents
        id={`${uid}-${orderNum}`}
        className={splitClassList.contents || "mcm-split-contents"}
        key={v4()}
        style={styles}
      >
        {node.children}
      </Contents>
    );
  });
};

export default memo(SplitContentsPage);

export const Contents = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
  order: 0;
  justify-content: center;
`;
