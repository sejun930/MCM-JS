import styled from "@emotion/styled";
import { _Error } from "mcm-js-commons";
import { memo, useEffect, useState } from "react";

import { PopularPropsTypes } from "./popular.types";
import { popularClassList } from "./popular.class";
import { getAllComponentsClassName } from "mcm-js-commons/dist/hooks";

import { initPopularInfo } from "./popular.data";
import { v4 } from "uuid";

const _RenderPopular = (props: PopularPropsTypes) => {
  const uuid = v4(); // uuid 지정

  return (
    <_Error propsList={{ ...props }} requiredList={["children"]}>
      <_Popular {...props} uuid={uuid} />
    </_Error>
  );
};

const _Popular = (props: PopularPropsTypes & { uuid: string }) => {
  const { children, className, id, uuid } = props;

  const [info, setInfo] = useState(initPopularInfo);

  useEffect(() => {}, [children]);

  return (
    <Wrapper
      className={getAllComponentsClassName(popularClassList.wrapper, className)}
      id={id}
    >
      <ListWrapper>
        {/* {(list.length &&
          list.map((el, key) => <List key={`${uuid}-${key}`}>{el}</List>)) || (
          <></>
        )} */}
      </ListWrapper>
      <Opener>33</Opener>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

export const Items = styled.div`
  width: 100%;
`;

export const ListWrapper = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  transition: all 0.25s ease;
  transform: translateY(0px);
`;

export const List = styled.li`
  list-style: none;

  // 하위 모든 태그의 마진, 패딩값 제거
  * {
    margin: 0;
    padding: 0;
    white-space: pre;
  }
`;

export const Opener = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default memo(_RenderPopular);
