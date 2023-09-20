import { CSSProperties, memo } from "react";
import styled from "@emotion/styled";

import { getOffDrag } from "mcm-js-commons/dist/styled";
import { splitClassList } from "../split.class";
import { SplitContentsPropsTypes } from "../split.types";

const SplitContentsPage = ({
  children,
  width,
  isLast,
}: SplitContentsPropsTypes) => {
  const styles: CSSProperties = { flexBasis: `calc(${width}% + 0px)` };

  return (
    <Contents
      style={styles}
      isLast={isLast}
      className={splitClassList.contents || "mcm-split-contents"}
    >
      {children}
    </Contents>
  );
};

export default memo(SplitContentsPage);

interface StyleTypes {
  isLast?: boolean;
  active?: boolean;
}

export const ListWrapper = styled.ul`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const Contents = styled.li`
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
  order: 0;
  justify-content: center;

  ${(props: StyleTypes) => {
    let styles: CSSProperties & { [key: string]: string } = {};
    // 마지막 컴포넌트는 자동 조절
    if (props.isLast) styles.flex = `1 1 auto`;

    return styles;
  }}
`;
