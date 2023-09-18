import { CSSProperties, memo, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { ListTypeWithIdx, SplitContentsPropsTypes } from "../split.types";
import { splitClassList } from "../split.class";

const SplitContentsPage = ({ list, uid }: SplitContentsPropsTypes) => {
  const [minWidthList, setMinWidthList] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    const _minWidthList: { [key: number]: number } = {};

    let percent = 100;
    let min = Math.floor(100 / list.length); // 리스트 개수만큼 나눈 값이 최소값

    // 각각의 리스트에 순번 지정하기
    list = list.map((el: ListTypeWithIdx, idx) => {
      el.idx = idx;

      if (el.startWidth !== undefined) {
        // 0이 전달된다면 무효화 처리
        if (el.startWidth === 0) delete el.startWidth;
        else {
          if (el.startWidth > 90) el.startWidth = 90; // 90% 초과시 90% 적용
          else if (el.startWidth <= 10) el.startWidth = 10; // 10% 미만시 10% 적용
        }
      }

      return el;
    });

    // 최소값이 높은 순서대로 정렬
    const sortMax = [...list].sort((a, b) => {
      const num1 = a.startWidth || 0;
      const num2 = b.startWidth || 0;

      return num1 < num2 ? 1 : -1;
    });
    console.log(sortMax);

    // (startWidth) 최소값 우선 계산
    const filterStartWithList = sortMax.filter((el) => el.startWidth);
    let startWithLen = filterStartWithList.length;

    if (filterStartWithList.length)
      filterStartWithList.forEach((el: ListTypeWithIdx) => {
        let { startWidth, idx } = el;

        if (startWidth !== undefined) {
          // 수동으로 조절할 경우

          if (percent - startWidth >= 0) {
            percent -= startWidth;
            startWithLen--;

            _minWidthList[idx] = startWidth;
          } else {
            // 0프로 미만으로 넘어갈 경우
            min = Math.floor(percent / startWithLen);
            _minWidthList[idx] = min;
          }
        }
      });

    // 수동으로 조정되지 않는 컴포넌트일 경우
    const originList = sortMax.filter((el) => el.startWidth === undefined);
    min = Math.floor(percent / originList.length);
    if (min < 10) min = 10; // 10%보다 작다면 최소값 10% 적용
    if (min > 90) min = 90; // 90%보다 크다면 최대값 90% 적용

    if (originList.length)
      originList.forEach((el: ListTypeWithIdx) => {
        const { idx } = el;
        _minWidthList[idx] = min;
      });

    setMinWidthList(_minWidthList);
  }, [list]);

  console.log(minWidthList);

  return (
    <ListWrapper>
      {list.map((node, idx) => {
        // 마지막 체크하기
        const isLast = idx + 1 === list.length || false;
        // 순서도 구하기
        const orderNum = idx * 2;
        // 최소 위치값 정하기
        let minWidth = minWidthList[idx] || 10;

        const styles: CSSProperties = { order: orderNum };
        // 마지막 컴포넌트는 자동 조정
        styles.flexBasis = `calc(${minWidth}% + 0px)`;

        return (
          <Contents key={`${uid}-${idx}`} style={styles} isLast={isLast}>
            {node.children}
          </Contents>
        );
      })}
    </ListWrapper>
  );
};

export default memo(SplitContentsPage);

interface StyleTypes {
  isLast?: boolean;
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

  ${(props: StyleTypes) =>
    props.isLast && {
      flex: "1 1 auto",
    }}
`;
